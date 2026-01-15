export const formatDateTime = (date: string) => {
  if (!date) return "";

  const fecha = new Date(date);

  const day = fecha.getDate().toString().padStart(2, "0");
  const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const year = fecha.getFullYear().toString().slice(-2);
  const hours = fecha.getHours().toString().padStart(2, "0");
  const minutes = fecha.getMinutes().toString().padStart(2, "0");
  const seconds = fecha.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

/*
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit", // '2-digit' para AA o 'numeric' para AAAA
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Formato 24 horas. Pon true si prefieres AM/PM
  }).format(fecha);
*/
