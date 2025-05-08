export const taskConfig = {
  status: [
    {
      id: 0,
      status: "All",
      value: "all",
      color: "inherit",
    },
    {
      id: 1,
      status: "On Going",
      value: "ongoing",
      color: "primary.main",
    },
    {
      id: 2,
      status: "In Progress",
      value: "inprogress",
      color: "warning.light",
    },
    {
      id: 3,
      status: "Completed",
      value: "completed",
      color: "success.light",
    },
  ],
  priority: [
    { id: 0, priority: "All", value: "all", color: "primary.main" },
    { id: 1, priority: "Low", value: "low", color: "#919191" },
    { id: 2, priority: "Medium", value: "medium", color: "warning.light" },
    { id: 3, priority: "High", value: "high", color: "error.light" },
  ],
  tag: [
    { id: 0, tag: "All", value: "all", color: "inherit" },
    { id: 1, tag: "BackEnd", value: "backend", color: "primary.main" },
    { id: 2, tag: "FrontEnd", value: "frontend", color: "primary.main" },
    { id: 3, tag: "DevOps", value: "devops", color: "primary.main" },
    { id: 4, tag: "Deploy", value: "devops", color: "primary.main" },
    { id: 5, tag: "Research", value: "devops", color: "primary.main" },
    { id: 6, tag: "Task", value: "devops", color: "primary.main" },
  ],
  project: [
    { id: 0, project: "All", value: "all", color: "inherit" },
    { id: 1, project: "Company", value: "company", color: "primary.main" },
    { id: 2, project: "Outsource", value: "outsource", color: "primary.main" },
  ],
};
