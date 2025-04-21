export default function formatDate(date: Date) {
  const dateF = new Date(date);

  const day =
    dateF.getDate().toString().length === 1
      ? "0" + dateF.getDate().toString()
      : dateF.getDate().toString();
  const month =
    (dateF.getMonth() + 1).toString().length === 1
      ? "0" + (dateF.getMonth() + 1).toString()
      : (dateF.getMonth() + 1).toString();

  const dateString = day + "." + month + "." + dateF.getFullYear();
  return dateString;
}
