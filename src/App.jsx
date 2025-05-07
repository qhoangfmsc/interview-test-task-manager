import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import TaskManagement from "./pages/TaskManagement";
import HumanResources from "./pages/HumanResources";
import Dashboard from "./pages/Dashboard";
import TeamTasks from "./pages/TeamTasks";
import PersonalTasks from "./pages/PersonalTasks";
import { ColorModeProvider } from "./contexts/ThemeContext";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./contexts/UserContext";

const AppContent = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="human-resources" element={<HumanResources />} />
      <Route index element={<TaskManagement />} />
      <Route path="team-tasks" element={<TeamTasks />} />
      <Route path="personal-tasks" element={<PersonalTasks />} />
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
          <UserProvider>
            <AppContent />
          </UserProvider>
        </SnackbarProvider>
      </ColorModeProvider>
    </BrowserRouter>
  );
}

export default App;
