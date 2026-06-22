import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyOtp from "./pages/VerifyOtp";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/verify-otp"
        element={
          <ProtectedRoute>
            <VerifyOtp />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default App;
