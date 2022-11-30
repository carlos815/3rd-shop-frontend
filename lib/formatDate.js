export default function formatDate(dateString) {
  const dateObject = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('EN', options)
}
