
import React from 'react';
import { 
  Heart, 
  Truck, 
  Wind, 
  Droplet, 
  ShieldAlert, 
  Search, 
  Settings, 
  Users, 
  BarChart2, 
  MessageSquare,
  Activity
} from 'lucide-react';

export const TRANSLATIONS = {
  en: {
    title: 'Blood & Emergency Help',
    tagline: 'Connect. Donate. Save Lives.',
    sos: 'SOS - HELP ME',
    blood_donor: 'Find Blood Donor',
    ambulance: 'Ambulance',
    oxygen: 'Oxygen Supply',
    plasma: 'Plasma Search',
    first_aid: 'First Aid Guide',
    search: 'Search',
    login: 'Login',
    register: 'Register',
    nearby_hospitals: 'Nearby Hospitals',
    emergency_zones: 'Emergency Zones',
    dashboard: 'Dashboard',
    requests: 'Requests',
    users: 'Users',
    analytics: 'Analytics',
    logout: 'Logout',
    admin_panel: 'Admin Control',
    blood_group: 'Blood Group',
    location: 'Location',
    search_donors: 'Search Donors',
    women_safety: 'Women\'s SOS',
    donation_history: 'Donation History',
    eligibility: 'Eligibility Status',
    volunteer: 'Become a Volunteer',
    impact_stats: 'Our Impact',
    verified_donors: 'Verified Donors',
    lives_saved: 'Lives Saved',
    emergency_calls: 'Emergency Calls',
  },
  bn: {
    title: 'রক্ত ও জরুরি সাহায্য',
    tagline: 'যোগাযোগ করুন। রক্ত দিন। জীবন বাঁচান।',
    sos: 'এসওএস - আমাকে সাহায্য করুন',
    blood_donor: 'রক্তদাতা খুঁজুন',
    ambulance: 'অ্যাম্বুলেন্স',
    oxygen: 'অক্সিজেন সরবরাহ',
    plasma: 'প্লাজমা সার্চ',
    first_aid: 'ফার্স্ট এইড গাইড',
    search: 'খুঁজুন',
    login: 'লগইন',
    register: 'রেজিস্ট্রেশন',
    nearby_hospitals: 'নিকটবর্তী হাসপাতাল',
    emergency_zones: 'জরুরি অঞ্চল',
    dashboard: 'ড্যাশবোর্ড',
    requests: 'অনুরোধসমূহ',
    users: 'ব্যবহারকারী',
    analytics: 'বিশ্লেষণ',
    logout: 'লগআউট',
    admin_panel: 'অ্যাডমিন প্যানেল',
    blood_group: 'রক্তের গ্রুপ',
    location: 'অবস্থান',
    search_donors: 'রক্তদাতা খুঁজুন',
    women_safety: 'নারীদের এসওএস',
    donation_history: 'দানের ইতিহাস',
    eligibility: 'যোগ্যতা যাচাই',
    volunteer: 'স্বেচ্ছাসেবক হন',
    impact_stats: 'আমাদের প্রভাব',
    verified_donors: 'যাচাইকৃত দাতা',
    lives_saved: 'জীবন রক্ষা',
    emergency_calls: 'জরুরি কল',
  }
};

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const SERVICES = [
  { id: 'blood', name: 'blood_donor', icon: <Droplet className="w-8 h-8 text-red-600" />, path: '/donors' },
  { id: 'ambulance', name: 'ambulance', icon: <Truck className="w-8 h-8 text-blue-600" />, path: '/services/ambulance' },
  { id: 'oxygen', name: 'oxygen', icon: <Wind className="w-8 h-8 text-cyan-500" />, path: '/services/oxygen' },
  { id: 'firstaid', name: 'first_aid', icon: <Activity className="w-8 h-8 text-green-600" />, path: '/first-aid' },
];

export const MOCK_DONORS = [
  { id: '1', name: 'Rahim Ahmed', bloodGroup: 'A+', location: 'Dhaka', phone: '01700000001', isAvailable: true },
  { id: '2', name: 'Karim Ullah', bloodGroup: 'O-', location: 'Chittagong', phone: '01800000002', isAvailable: false },
  { id: '3', name: 'Sumaiya Akter', bloodGroup: 'B+', location: 'Sylhet', phone: '01900000003', isAvailable: true },
  { id: '4', name: 'Tanvir Islam', bloodGroup: 'AB+', location: 'Dhaka', phone: '01600000004', isAvailable: true },
];

export const FIRST_AID_GUIDES = [
  {
    id: 'burns',
    title: 'Burns Treatment',
    category: 'Accident',
    steps: [
      { title: 'Cool the burn', description: 'Hold the burned area under cool running water for 10-20 minutes.' },
      { title: 'Protect the area', description: 'Cover the burn loosely with a sterile bandage or clean cloth.' },
      { title: 'Avoid Ice', description: 'Do not use ice, as it can further damage the skin tissue.' }
    ]
  },
  {
    id: 'cpr',
    title: 'How to perform CPR',
    category: 'Critical',
    steps: [
      { title: 'Check Responsiveness', description: 'Tap the person and shout to see if they respond.' },
      { title: 'Call Emergency Services', description: 'Dial your local emergency number immediately.' },
      { title: 'Compressions', description: 'Push hard and fast in the center of the chest (100-120 per min).' }
    ]
  }
];
