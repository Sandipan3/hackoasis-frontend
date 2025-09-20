import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { login, selectAuthLoading, selectAuthError } from "../slices/authSlice";
import api from "../api/api";

const Login = () => {
  const [publicAddress, setPublicAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      if (!window.ethereum) {
        window.location.href =
          "https://metamask.app.link/dapp/hackoasis-frontend.netlify.app";
        return;
      }

      return;
    }

    try {
      // Connect MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0]; //contains wallet address

      // Get nonce from backend
      const nonceRes = await api.post("auth/nonce", { publicAddress: account });
      const nonce = nonceRes.data.nonce;

      // Sign the nonce
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      //sign message should be same for frontend and backend
      const signature = await signer.signMessage(`Sign this nonce: ${nonce}`);
      //users signs with their private key in frontend

      // Login
      await dispatch(login({ publicAddress: account, signature })).unwrap();

      setPublicAddress(account);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      if (err.code === 4001) {
        toast.error("MetaMask login cancelled.");
        return;
      }
      toast.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        disabled={loading}
        onClick={handleLogin}
        className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        {loading ? "Logging in..." : "Login with MetaMask"}
      </button>
    </div>
  );
};

export default Login;
