import { Donor, BloodRequest, BloodDrive, NotificationMessage } from "@types/index";

export const mockDonors: Donor[] = [
  {
    id: "d1",
    name: "Ananya Sharma",
    bloodType: "O+",
    city: "Mumbai",
    distanceInKm: 3.2,
    lastDonation: "2024-01-20",
    donationsCount: 8,
    phone: "+91 99880 11223",
    email: "ananya.sharma@example.com",
    points: 0,
    availability: "Available"
  },
  {
    id: "d2",
    name: "Raghav Patel",
    bloodType: "A+",
    city: "Ahmedabad",
    distanceInKm: 12.5,
    lastDonation: "2024-03-15",
    donationsCount: 5,
    phone: "+91 93455 88990",
    email: "raghav.patel@example.com",
    points: 0,
    availability: "Available"
  },
  {
    id: "d3",
    name: "Sara Mathews",
    bloodType: "B-",
    city: "Bengaluru",
    distanceInKm: 7.3,
    lastDonation: "2023-12-02",
    donationsCount: 11,
    phone: "+91 91786 33445",
    email: "sara.mathews@example.com",
    points: 0,
    availability: "Away"
  },
  {
    id: "d4",
    name: "Harish Rao",
    bloodType: "AB+",
    city: "Hyderabad",
    distanceInKm: 5.9,
    lastDonation: "2024-02-10",
    donationsCount: 6,
    phone: "+91 90123 56789",
    email: "harish.rao@example.com",
    points: 0,
    availability: "Available"
  }
];

export const mockRequests: BloodRequest[] = [
  {
    id: "r1",
    hospital: "GlobalCare Hospital",
    city: "Mumbai",
    bloodType: "O+",
    unitsRequired: 12,
    urgency: "High",
    requestedOn: "2024-05-02T09:45:00Z",
    status: "Open"
  },
  {
    id: "r2",
    hospital: "Sunrise Clinics",
    city: "Pune",
    bloodType: "AB-",
    unitsRequired: 4,
    urgency: "Critical",
    requestedOn: "2024-05-03T11:20:00Z",
    status: "Escalated"
  },
  {
    id: "r3",
    hospital: "Healing Hands NGO",
    city: "Bengaluru",
    bloodType: "B+",
    unitsRequired: 8,
    urgency: "Medium",
    requestedOn: "2024-05-01T07:30:00Z",
    status: "Open"
  }
];

export const mockDrives: BloodDrive[] = [
  {
    id: "bd1",
    title: "Community Blood Drive",
    location: "Mumbai Central Park",
    date: "2024-05-06",
    organizer: "HealTogether Foundation"
  },
  {
    id: "bd2",
    title: "Corporate Donation Camp",
    location: "Bengaluru Tech Hub",
    date: "2024-05-11",
    organizer: "Tech4Life"
  }
];

export const mockNotifications: NotificationMessage[] = [
  {
    id: "n1",
    title: "Urgent O+ Request",
    description: "GlobalCare Hospital requires 3 donors in the next 6 hours.",
    timestamp: "2024-05-03T07:10:00Z",
    type: "urgent"
  },
  {
    id: "n2",
    title: "Nearby Blood Drive",
    description: "Community Blood Drive happening tomorrow at Central Park.",
    timestamp: "2024-05-03T05:00:00Z",
    type: "event"
  },
  {
    id: "n3",
    title: "Donation Milestone",
    description: "You have unlocked Platinum Donor status. Thank you!",
    timestamp: "2024-05-02T12:30:00Z",
    type: "celebration"
  }
];
