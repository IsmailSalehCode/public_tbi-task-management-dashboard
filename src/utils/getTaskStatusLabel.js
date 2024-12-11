export const statuses = [
  {
    id: 1,
    title: "To Do",
  },
  {
    id: 2,
    title: "In Progress",
  },
  {
    id: 3,
    title: "Done",
  },
];

export function getStatusLabel(status) {
  const statusObj = statuses.find((item) => item.id === status);
  return statusObj ? statusObj.title : "Unknown";
}
