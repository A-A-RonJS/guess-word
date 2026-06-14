export function formattedDate(inputDate: Date): string {
  return inputDate.toISOString().split("T")[0];
}
