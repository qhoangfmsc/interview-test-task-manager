import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import TaskManagement from "./pages/task/TaskManagement";
import HumanResources from "./pages/admin/HumanResources";
import Dashboard from "./pages/admin/Dashboard";
import TeamTasks from "./pages/task/TeamTasks";
import PersonalTasks from "./pages/task/PersonalTasks";
import { ColorModeProvider } from "./contexts/ThemeContext";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./contexts/UserContext";
import { TaskListProvider } from "./contexts/TaskListContext";
import TaskDetails from "./pages/task/TaskDetails";
import { AccountListProvider } from "./contexts/AccountListContext";

const AppContent = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="human-resources" element={<HumanResources />} />
      <Route index element={<TaskManagement />} />
      <Route path="team-tasks" element={<TeamTasks />} />
      <Route path="personal-tasks" element={<PersonalTasks />} />
      <Route path="task/:id" element={<TaskDetails />} />
      <Route path="*" element={<NoPage />} />
    </Route>
  </Routes>
);

function App() {
  return (
    <BrowserRouter>
      <ColorModeProvider>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <AccountListProvider>
            <UserProvider>
              <TaskListProvider>
                <AppContent />
              </TaskListProvider>
            </UserProvider>
          </AccountListProvider>
        </SnackbarProvider>
      </ColorModeProvider>
    </BrowserRouter>
  );
}

export default App;
