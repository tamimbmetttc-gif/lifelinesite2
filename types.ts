
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UserRole = 'donor' | 'patient' | 'volunteer' | 'admin';
export type Language = 'en' | 'bn';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  bloodGroup?: BloodGroup;
  location?: string;
  isAvailable?: boolean;
}

export interface EmergencyRequest {
  id: string;
  type: 'blood' | 'ambulance' | 'oxygen' | 'plasma';
  status: 'pending' | 'verified' | 'completed' | 'cancelled';
  requesterName: string;
  contact: string;
  location: string;
  details: string;
  timestamp: string;
}

export interface FirstAidStep {
  title: string;
  description: string;
  image?: string;
}

export interface FirstAidGuide {
  id: string;
  title: string;
  category: string;
  steps: FirstAidStep[];
}
