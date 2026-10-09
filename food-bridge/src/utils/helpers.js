
function foodTypeLabel(type) {
  switch (type) {
    case 'veg': return 'food_veg';
    case 'non-veg': return 'food_nonveg';
    case 'dry': return 'food_dry';
  }
}

export function foodTypeLabelT(type, t) {
  return t(foodTypeLabel(type));
}

export function foodTypeColor(type) {
  switch (type) {
    case 'veg': return 'bg-success-100 text-success-700 border border-success-200';
    case 'non-veg': return 'bg-error-100 text-error-700 border border-error-200';
    case 'dry': return 'bg-amber-100 text-amber-700 border border-amber-200';
  }
}

function statusLabelKey(status) {
  switch (status) {
    case 'forecast': return 'status_forecast';
    case 'ready': return 'status_ready';
    case 'claimed': return 'status_claimed';
    case 'completed': return 'status_completed';
    case 'expired': return 'status_expired';
    case 'no-show': return 'status_noshow';
  }
}

export function statusLabelT(status, t) {
  return t(statusLabelKey(status));
}

export function statusColor(status) {
  switch (status) {
    case 'forecast': return 'bg-amber-100 text-amber-800 border border-amber-200';
    case 'ready': return 'bg-success-100 text-success-700 border border-success-200';
    case 'claimed': return 'bg-teal-100 text-teal-800 border border-teal-200';
    case 'completed': return 'bg-cream-200 text-teal-700 border border-cream-300';
    case 'expired': return 'bg-gray-100 text-gray-500 border border-gray-200';
    case 'no-show': return 'bg-error-100 text-error-700 border border-error-200';
  }
}

export function generateHandoverCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function matchScore(listing, ngo) {
  let score = 0;

  // Food type match (most important)
  if (ngo.foodPreference.includes(listing.foodType)) {
    score += 40;
  } else {
    return -1; // Cannot use this food
  }

  // Quantity match
  if (listing.quantityPeople <= ngo.peopleCount) {
    score += 25;
  } else if (listing.quantityPeople <= ngo.peopleCount * 1.5) {
    score += 15;
  } else {
    score += 5;
  }

  // Area proximity (simplified — same area = best)
  if (ngo.area === listing.area) {
    score += 20;
  } else {
    score += 8;
  }

  // Reliability score
  score += Math.round(ngo.reliabilityScore * 0.15);

  return score;
}

export function getBestMatches(listing, ngos) {
  return ngos
    .filter((n) => n.verified)
    .map((n) => ({ ngo: n, score: matchScore(listing, n) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.ngo);
}
