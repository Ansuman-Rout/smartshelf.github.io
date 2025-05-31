import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import Signup from "./auth/Signup";
// import Login from "./auth/Login";
import Home from "./pages/Home";
import FoodCollectionForm from "./pages/FoodCollectionForm";
import FoodInventory from "./pages/FoodInventory";
import RequestForm from "./pages/RequestForm";
import UsersList from "./pages/UsersList";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./auth/AuthPage";
import DistributionMap from "./pages/DistributionMap";
import InviteFriend from "./pages/InviteFriend";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "./theme";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Protected layout wrapper */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* All routes inside Layout must go here */}
            <Route index element={<Home />} />
            <Route path="form" element={<FoodCollectionForm />} />
            <Route path="users" element={<UsersList />} />
            <Route path="inventory" element={<FoodInventory />} />
            <Route path="reqform" element={<RequestForm />} />
            <Route path="dash" element={<Dashboard/>} />
            <Route path="geomap" element={<DistributionMap/>} />
            <Route path="invitefriend" element={<InviteFriend/>} />



          </Route>

          {/* Public routes */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
           <Route path="/authpage" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
