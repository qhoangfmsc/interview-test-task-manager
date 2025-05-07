export const taskConfig = {
  status: [
    {
      sid: 0,
      status: "All",
      value: "all",
      color: "inherit",
    },
    {
      sid: 1,
      status: "On Going",
      value: "ongoing",
      color: "primary.main",
    },
    {
      sid: 2,
      status: "In Progress",
      value: "inprogress",
      color: "warning.light",
    },
    {
      sid: 3,
      status: "Completed",
      value: "completed",
      color: "success.light",
    },
  ],
  priority: [
    { pid: 0, priority: "All", value: "all", color: "primary.main" },
    { pid: 1, priority: "Low", value: "low", color: "#919191" },
    { pid: 2, priority: "Medium", value: "medium", color: "warning.light" },
    { pid: 3, priority: "High", value: "high", color: "error.light" },
  ],
  tag: [
    { tid: 0, tag: "All", value: "all", color: "inherit" },
    { tid: 1, tag: "BackEnd", value: "backend", color: "primary.main" },
    { tid: 2, tag: "FrontEnd", value: "frontend", color: "primary.main" },
    { tid: 3, tag: "DevOps", value: "devops", color: "primary.main" },
    { tid: 4, tag: "Deploy", value: "devops", color: "primary.main" },
    { tid: 5, tag: "Research", value: "devops", color: "primary.main" },
    { tid: 6, tag: "Task", value: "devops", color: "primary.main" },
  ],
  project: [
    { pid: 0, project: "All", value: "all", color: "inherit" },
    { pid: 1, project: "Company", value: "company", color: "primary.main" },
    { pid: 2, project: "Outsource", value: "outsource", color: "primary.main" },
  ],
};
