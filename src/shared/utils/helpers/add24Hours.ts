export function add24Hours(date: Date): Date {
  const newEndTime = new Date(date);
  newEndTime.setHours(newEndTime.getHours() + 24);
  return newEndTime;
}
