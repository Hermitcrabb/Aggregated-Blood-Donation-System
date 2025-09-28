import { useEffect } from "react";
import { useDataContext } from "@context/DataContext";

export const useRealTimeUpdates = () => {
  const { requests } = useDataContext();

  useEffect(() => {
    const unseenCritical = requests.some((request) => request.urgency === "Critical" && request.status === "Open");
    if (unseenCritical) {
      console.log("Critical blood request detected. Alert UI components if necessary.");
    }
  }, [requests]);
};
