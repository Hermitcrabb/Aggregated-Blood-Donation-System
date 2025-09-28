export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export const formatTime = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  });
};

export const formatRelativeTime = (isoDate: string) => {
  const deltaMs = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(deltaMs / (1000 * 60));
  if (minutes < 60) {
    return `${minutes} min ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hr ago`;
  }
  const days = Math.floor(hours / 24);
  return `${days} d ago`;
};

export const bloodTypeColor = (bloodType: string) => {
  const palette: Record<string, string> = {
    "O+": "#B71C1C",
    "O-": "#880E4F",
    "A+": "#C62828",
    "A-": "#AD1457",
    "B+": "#D32F2F",
    "B-": "#8E24AA",
    "AB+": "#C2185B",
    "AB-": "#6A1B9A"
  };
  return palette[bloodType] ?? "#8A0303";
};
