export const filterTasksByStatus = (tasks) => {
  return tasks.reduce((acc, task) => {
    const status = task.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {});
};

export const filterTasksByUid = (tasks, id) => {
  return tasks.filter((task) => task.assignees.includes(id));
};

export const formatDateMMMMDDYYYY = (inputDate) => {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const getRemainingDays = (targetDateStr) => {
  const today = new Date();
  const targetDate = new Date(targetDateStr);

  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Expired";
  if (diffDays === 0) return "Today";
  return `${diffDays} day(s) left`;
};

export const getConfigListWithoutZeroItem = (list) => {
  return list.filter((item) => item.id !== 0);
};

export const getPathSegment = (path) => {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 2) {
    const [resource, id] = segments;
    return { resource, id };
  }
  return null;
};
