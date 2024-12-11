export function useTimestamp(dt) {
  const requiredLocale = import.meta.env.VITE_LOCALE || "bg";

  return new Date(dt).toLocaleString(requiredLocale, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
