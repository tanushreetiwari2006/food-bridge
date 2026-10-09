const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(cors());
app.use(express.json());


// =========================
// HOME
// =========================
app.get("/", (req, res) => {
  res.json({
    message: "Food Bridge Backend is running!"
  });
});


// =========================
// TEST SUPABASE
// =========================
app.get("/api/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Supabase connection reached, but users table is not ready.",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Supabase connected successfully!",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===============================
// FOOD LISTING API
// ===============================

app.post('/api/food-listings', async (req, res) => {
  try {
    const {
      donor_id,
      food_type,
      food_description,
      quantity_people,
      status,
      safe_till,
      safe_hours,
      area,
      pickup_window,
      disclaimer_accepted,
      freshness_confirmed,
      storage_confirmed,
    } = req.body;

    if (
      !donor_id ||
      !food_description ||
      !quantity_people ||
      !area ||
      !pickup_window
    ) {
      return res.status(400).json({
        error: 'Required food listing fields are missing',
      });
    }

    const { data, error } = await supabase
      .from('food_listings')
      .insert([
        {
          donor_id,
          food_name: food_type,
          description: food_description,
          quantity: Number(quantity_people),
          unit: 'people',
          pickup_address: pickup_window,
          area,
          expiry_time: safe_till,
          status,
          disclaimer_accepted,
          freshness_confirmed,
          storage_confirmed,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Food listing save error:', error);

      return res.status(500).json({
        error: error.message,
      });
    }

    res.status(201).json({
      message: 'Food listing created successfully',
      listing: {
        ...data,
        food_type: food_type,
        food_description: data.description,
        quantity_people: data.quantity,
        safe_till: data.expiry_time,
        safe_hours: Number(safe_hours) || 3,
        pickup_method: 'ngo_pickup',
        pickup_window: data.pickup_address,
      },
    });
  } catch (error) {
    console.error('Food listing API error:', error);

    res.status(500).json({
      error: 'Server error',
    });
  }
});

// GET FOOD LISTINGS
app.get("/api/food-listings", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("food_listings")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Food listings fetch error:", error);

      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      listings: data,
    });
  } catch (error) {
    console.error("Food listings API error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
// =========================
// CREATE / REGISTER USER
// =========================
app.post("/api/users", async (req, res) => {
  try {
    const {
      name,
      phone,
      role,
      area,
      organization_name
    } = req.body;

    if (!name || !phone || !role || !area) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, role and area are required."
      });
    }

    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (findError) {
      return res.status(500).json({
        success: false,
        message: "Could not check existing user.",
        error: findError.message
      });
    }

    if (existingUser) {
      return res.json({
        success: true,
        message: "User already exists.",
        user: existingUser
      });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          phone,
          role,
          area,
          organization_name: organization_name || null
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "User could not be created.",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });
  }
});
// CLAIM FOOD API
app.post("/api/claims", async (req, res) => {
  try {
    const { food_id, ngo_id } = req.body;

    if (!food_id || !ngo_id) {
      return res.status(400).json({
        success: false,
        message: "Food ID and NGO ID are required.",
      });
    }

    // Create claim
    const { data: claim, error: claimError } = await supabase
      .from("claims")
      .insert([
        {
          food_id,
          ngo_id,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (claimError) {
      console.error("Claim creation error:", claimError);

      return res.status(500).json({
        success: false,
        error: claimError.message,
      });
    }

    // Update food status
    const { error: foodError } = await supabase
      .from("food_listings")
      .update({ status: "claimed" })
      .eq("id", food_id);

    if (foodError) {
      console.error("Food status update error:", foodError);

      return res.status(500).json({
        success: false,
        error: foodError.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Food claimed successfully!",
      claim,
    });

  } catch (error) {
    console.error("Claim API error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// =========================
// GET USER BY PHONE
// =========================
app.get("/api/users/:phone", async (req, res) => {
  try {
    const { phone } = req.params;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.json({
      success: true,
      user: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// =========================
// START SERVER
// =========================
const server = app.listen(PORT, () => {
  console.log(
    `Food Bridge Backend running on http://localhost:${PORT}`
  );
});

server.on("error", (error) => {
  console.error("SERVER ERROR:", error);
});