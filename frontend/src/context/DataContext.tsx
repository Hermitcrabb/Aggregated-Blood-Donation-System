import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { mockDonors, mockRequests, mockDrives, mockNotifications } from "@data/mock";
import {
  Donor,
  BloodRequest,
  BloodDrive,
  NotificationMessage,
  RequestStatus
} from "@types/index";

export interface DataContextValue {
  donors: Donor[];
  requests: BloodRequest[];
  drives: BloodDrive[];
  notifications: NotificationMessage[];
  prioritizedDonors: Donor[];
  donorsByBloodType: Record<string, Donor[]>;
  registerDonor: (donor: Omit<Donor, "id" | "points">) => void;
  updateDonor: (id: string, update: Partial<Donor>) => void;
  submitRequest: (request: Omit<BloodRequest, "id" | "status">) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  logDonation: (donorId: string) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const calculatePoints = (donationsCount: number, lastDonation: string) => {
  const base = donationsCount * 20;
  const daysSinceDonation = Math.max(
    0,
    Math.floor((Date.now() - new Date(lastDonation).getTime()) / (1000 * 60 * 60 * 24))
  );
  const freshnessBonus = daysSinceDonation < 90 ? 40 : 10;
  return base + freshnessBonus;
};

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [donors, setDonors] = useState<Donor[]>(
    mockDonors.map((donor) => ({
      ...donor,
      points: calculatePoints(donor.donationsCount, donor.lastDonation)
    }))
  );
  const [requests, setRequests] = useState<BloodRequest[]>(mockRequests);
  const [drives] = useState<BloodDrive[]>(mockDrives);
  const [notifications, setNotifications] = useState<NotificationMessage[]>(mockNotifications);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests((existing) =>
        existing.map((request) => {
          if (request.status === "Open" && Math.random() > 0.7) {
            return { ...request, status: "Matched" };
          }
          return request;
        })
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const registerDonor = useCallback((donor: Omit<Donor, "id" | "points">) => {
    setDonors((prev) => [
      ...prev,
      {
        ...donor,
        id: `d-${Date.now()}`,
        points: calculatePoints(donor.donationsCount, donor.lastDonation)
      }
    ]);
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: "New donor registered",
        description: `${donor.name} is ready to donate ${donor.bloodType} blood.`,
        timestamp: new Date().toISOString(),
        type: "system"
      },
      ...prev
    ]);
  }, []);

  const updateDonor = useCallback((id: string, update: Partial<Donor>) => {
    setDonors((prev) =>
      prev.map((donor) =>
        donor.id === id
          ? {
              ...donor,
              ...update,
              points: calculatePoints(
                update.donationsCount ?? donor.donationsCount,
                update.lastDonation ?? donor.lastDonation
              )
            }
          : donor
      )
    );
  }, []);

  const submitRequest = useCallback(
    (request: Omit<BloodRequest, "id" | "status">) => {
      const newRequest: BloodRequest = {
        ...request,
        id: `r-${Date.now()}`,
        status: "Open"
      };
      setRequests((prev) => [newRequest, ...prev]);
      setNotifications((prev) => [
        {
          id: `n-${Date.now()}`,
          title: `New ${request.bloodType} request`,
          description: `${request.hospital} requires ${request.unitsRequired} units in ${request.city}.`,
          timestamp: new Date().toISOString(),
          type: request.urgency === "Critical" ? "urgent" : "system"
        },
        ...prev
      ]);
    },
    []
  );

  const updateRequestStatus = useCallback((id: string, status: RequestStatus) => {
    setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status } : request)));
  }, []);

  const logDonation = useCallback((donorId: string) => {
    setDonors((prev) =>
      prev.map((donor) =>
        donor.id === donorId
          ? {
              ...donor,
              donationsCount: donor.donationsCount + 1,
              lastDonation: new Date().toISOString(),
              points: calculatePoints(donor.donationsCount + 1, new Date().toISOString())
            }
          : donor
      )
    );
  }, []);

  const prioritizedDonors = useMemo(() => [...donors].sort((a, b) => b.points - a.points), [donors]);

  const donorsByBloodType = useMemo(() => {
    return donors.reduce<Record<string, Donor[]>>((acc, donor) => {
      if (!acc[donor.bloodType]) {
        acc[donor.bloodType] = [];
      }
      acc[donor.bloodType].push(donor);
      return acc;
    }, {});
  }, [donors]);

  const value: DataContextValue = {
    donors,
    requests,
    drives,
    notifications,
    prioritizedDonors,
    donorsByBloodType,
    registerDonor,
    updateDonor,
    submitRequest,
    updateRequestStatus,
    logDonation
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return ctx;
};
