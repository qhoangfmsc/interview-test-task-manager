import DashboardIcon from "@mui/icons-material/Dashboard";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import QueueIcon from "@mui/icons-material/Queue";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";

export const asideMenu = {
  admin: [
    {
      type: "title",
      name: "Admin",
    },
    {
      type: "component",
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      type: "component",
      name: "Human Resources",
      path: "/human-resources",
      icon: <RecentActorsIcon fontSize="small" />,
    },
  ],
  user: [
    {
      type: "title",
      name: "User",
    },
    {
      type: "component",
      name: "Task Management",
      path: "/",
      icon: <QueueIcon fontSize="small" />,
    },
    {
      type: "component",
      name: "Team Tasks",
      path: "/team-tasks",
      icon: <GroupsIcon fontSize="small" />,
    },
    {
      type: "component",
      name: "Personal Tasks",
      path: "/personal-tasks",
      icon: <PersonIcon fontSize="small" />,
    },
  ],
};
