import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";
import { ethers } from "ethers";

const RegisterVoters = () => {
  const [electionId, setElectionId] = useState("");
  const [identityCommitments, setIdentityCommitments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!electionId || !identityCommitments) {
      toast.error("All fields are required");
      return;
    }

    const commitmentsArray = identityCommitments
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => ethers.encodeBytes32String(c));

    setLoading(true);
    try {
      await api.post("/vote/register", {
        electionId: Number(electionId),
        identityCommitments: commitmentsArray,
      });
      toast.success("Voters registered successfully");
      setElectionId("");
      setIdentityCommitments("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register voters");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-extrabold text-green-700 text-center">
        Register Voters
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Election ID"
          value={electionId}
          onChange={(e) => setElectionId(e.target.value)}
          className="border border-green-300 p-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          min={0}
        />
        <textarea
          placeholder="Voter names (comma-separated)"
          value={identityCommitments}
          onChange={(e) => setIdentityCommitments(e.target.value)}
          className="border border-green-300 p-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none transition resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold"
        >
          {loading ? "Registering..." : "Register Voters"}
        </button>
      </form>
    </div>
  );
};

export default RegisterVoters;
