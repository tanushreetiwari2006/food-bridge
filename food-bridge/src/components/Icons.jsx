import React from 'react';

const paths = {
  ArrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  ArrowLeft: <path d="M19 12H5m6 6-6-6 6-6" />,
  Phone: <path d="M6.6 3.5 9 3l2 5-2.2 1.4a13 13 0 0 0 5.3 5.3l1.4-2.2 5 2-.5 2.4c-.3 1.3-1.5 2.1-2.8 1.9A17 17 0 0 1 3.2 6.3C3 5 3.8 3.8 5.1 3.5Z" />,
  KeyRound: <><circle cx="8" cy="15" r="3"/><path d="m10.2 12.8 8.3-8.3m-2.1 2.1 2 2m-4.1-4 2 2"/></>,
  ShieldCheck: <><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
  Building2: <><path d="M4 21V5l8-3 8 3v16M2 21h20M8 8h2m4 0h2M8 12h2m4 0h2M8 16h2m4 0h2"/></>,
  Users: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M14 15c3 0 5 1.5 5 4"/></>,
  Truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  CheckCircle2: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
  Loader2: <path d="M12 3a9 9 0 1 0 9 9" />,
  Clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  MapPin: <><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2"/></>,
  AlertTriangle: <><path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 3h.01"/></>,
  Package: <><path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10"/></>,
  Navigation: <path d="m4 4 16 7-7 2-2 7L4 4Z" />,
  Crosshair: <><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></>,
  ExternalLink: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6H5V6h6"/></>,
  Milestone: <><path d="M4 19h16M7 16V8m5 8V5m5 11v-6"/><circle cx="7" cy="7" r="1.5"/><circle cx="12" cy="4" r="1.5"/><circle cx="17" cy="9" r="1.5"/></>,
  UtensilsCrossed: <><path d="m3 3 18 18M13 7l4-4M8 3v7a4 4 0 0 0 4 4M8 3v4M4 3v4M6 14v7"/></>,
  Search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  Filter: <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />,
  Sparkles: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>,
  Mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3m-3 0h6"/></>,
  Send: <path d="m3 3 18 9-18 9 4-9-4-9Zm4 9h14" />,
  TrendingUp: <path d="m3 17 6-6 4 4 8-9M15 6h6v6" />,
  UserPlus: <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M19 8v6m-3-3h6"/></>,
  Trash2: <><path d="M4 7h16M9 7V4h6v3m-9 0 1 14h10l1-14M10 11v6m4-6v6"/></>,
  Sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></>,
  Moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
  Menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  X: <path d="m6 6 12 12M18 6 6 18" />,
  LogIn: <><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/></>,
  LogOut: <><path d="M14 17l5-5-5-5M19 12H7M3 5v14"/></>,
  User: <><circle cx="12" cy="8" r="3"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6"/></>,
  ShieldAlert: <><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"/><path d="M12 8v5m0 3h.01"/></>,
  XCircle: <><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/></>,
  RefreshCw: <path d="M20 11a8 8 0 0 0-14-4L3 10m0-5v5h5M4 13a8 8 0 0 0 14 4l3-3m0 5v-5h-5"/>,
  Heart: <path d="M20 8.5C20 15 12 20 12 20S4 15 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z"/>,
  LogInIcon: <><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/></>,
  Mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
};

function makeIcon(name) {
  return function Icon({ className = '', size, ...props }) {
    const dim = size || 24;
    return <svg viewBox="0 0 24 24" width={dim} height={dim} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>{paths[name] || <circle cx="12" cy="12" r="8" />}</svg>;
  };
}

export const ArrowRight = makeIcon('ArrowRight');
export const ArrowLeft = makeIcon('ArrowLeft');
export const Phone = makeIcon('Phone');
export const KeyRound = makeIcon('KeyRound');
export const ShieldCheck = makeIcon('ShieldCheck');
export const Building2 = makeIcon('Building2');
export const Users = makeIcon('Users');
export const Truck = makeIcon('Truck');
export const CheckCircle2 = makeIcon('CheckCircle2');
export const CheckCircle = CheckCircle2;
export const Loader2 = makeIcon('Loader2');
export const Clock = makeIcon('Clock');
export const MapPin = makeIcon('MapPin');
export const AlertTriangle = makeIcon('AlertTriangle');
export const Package = makeIcon('Package');
export const Navigation = makeIcon('Navigation');
export const Crosshair = makeIcon('Crosshair');
export const ExternalLink = makeIcon('ExternalLink');
export const Milestone = makeIcon('Milestone');
export const UtensilsCrossed = makeIcon('UtensilsCrossed');
export const Search = makeIcon('Search');
export const Filter = makeIcon('Filter');
export const Sparkles = makeIcon('Sparkles');
export const Mic = makeIcon('Mic');
export const Send = makeIcon('Send');
export const TrendingUp = makeIcon('TrendingUp');
export const UserPlus = makeIcon('UserPlus');
export const Trash2 = makeIcon('Trash2');
export const Sun = makeIcon('Sun');
export const Moon = makeIcon('Moon');
export const Menu = makeIcon('Menu');
export const X = makeIcon('X');
export const LogIn = makeIcon('LogIn');
export const LogOut = makeIcon('LogOut');
export const User = makeIcon('User');
export const ShieldAlert = makeIcon('ShieldAlert');
export const XCircle = makeIcon('XCircle');
export const RefreshCw = makeIcon('RefreshCw');
export const Heart = makeIcon('Heart');
export const Mail = makeIcon('Mail');
