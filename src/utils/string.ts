// Format date range for display
export const formatDateRange = (startDate: Date, endDate: Date) => {
  const formatDate = (date: Date) => {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
};

export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;

  const visible = name.slice(0, 6);
  const masked = "*".repeat(Math.max(name.length - 6, 4)); // Minimum of 4 asterisks

  return `${visible}${masked}@${domain}`;
}

export function formatDateForLaravel(dateInput: Date | string): string {
  const jsDate = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  console.log("jsDate>>",jsDate);
  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, '0'); // months are zero-based
  const day = String(jsDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
