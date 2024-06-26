export function convertToUTCPlus7(date: Date): Date {
  const adjustedDate = new Date(date);
  adjustedDate.setHours(adjustedDate.getHours() + 7);
  return adjustedDate;
}
