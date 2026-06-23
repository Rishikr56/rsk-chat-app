import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function getMe(params) {
      const res = await axiosInstance.get("/auth/me");
      setData(res.data);
    }

    getMe();
  }, []);

  if (data?.success) {
    return children;
  } else {
    navigate("/");
  }
};

export default ProtectedRoute;
