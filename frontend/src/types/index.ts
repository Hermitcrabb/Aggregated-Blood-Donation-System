export type AvailabilityStatus = "Available" | "Away" | "Unavailable";
export type UrgencyLevel = "Low" | "Medium" | "High" | "Critical";
export type RequestStatus = "Open" | "Matched" | "Fulfilled" | "Escalated";
export type NotificationType = "urgent" | "event" | "celebration" | "system";

export interface Donor {
  id: string;
  name: string;
  bloodType: string;
  city: string;
  distanceInKm: number;
  lastDonation: string;
  donationsCount: number;
  points: number;
  availability: AvailabilityStatus;
  phone: string;
  email: string;
}

export interface BloodRequest {
  id: string;
  hospital: string;
  city: string;
  bloodType: string;
  unitsRequired: number;
  urgency: UrgencyLevel | "High" | "Critical";
  requestedOn: string;
  status: RequestStatus;
}

export interface BloodDrive {
  id: string;
  title: string;
  location: string;
  date: string;
  organizer: string;
}

export interface NotificationMessage {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: NotificationType;
}
