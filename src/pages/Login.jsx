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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      window.location.href =
        "https://metamask.app.link/dapp/hackoasis-frontend.netlify.app";
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      const nonceRes = await api.post("auth/nonce", { publicAddress: account });
      const nonce = nonceRes.data.nonce;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(`Sign this nonce: ${nonce}`);

      await dispatch(login({ publicAddress: account, signature })).unwrap();

      setPublicAddress(account);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      if (err.code === 4001) {
        toast.error("MetaMask login cancelled.");
        return;
      }
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          College Anonymous Voting Platform
        </h1>
        <p className="text-gray-600 mb-8">
          Secure, anonymous, and blockchain-powered voting for your college
          elections.
        </p>
        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-all"
        >
          {loading ? "Logging in..." : "Login with MetaMask"}
        </button>
        <p className="text-gray-500 mt-6 text-sm">
          Use your MetaMask wallet to securely login.
        </p>
      </div>
    </div>
  );
};

export default Login;
