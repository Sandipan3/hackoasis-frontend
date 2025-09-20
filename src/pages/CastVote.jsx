import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";
import { ethers } from "ethers";

const CastVote = () => {
  const [electionId, setElectionId] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [voterIdentity, setVoterIdentity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!electionId || !candidateId || !voterIdentity) {
      toast.error("All fields are required");
      return;
    }

    const identityCommitment = ethers.encodeBytes32String(voterIdentity);
    const nullifier = ethers.keccak256(
      ethers.toUtf8Bytes(`${voterIdentity}-${electionId}`)
    );

    setLoading(true);
    try {
      await api.post("/vote/vote", {
        electionId: Number(electionId),
        candidateId: Number(candidateId),
        nullifier,
        identityCommitment,
      });
      toast.success("Vote cast successfully!");
      setElectionId("");
      setCandidateId("");
      setVoterIdentity("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cast vote");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-blue-700 text-center">
        Cast Vote
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Election ID"
          value={electionId}
          onChange={(e) => setElectionId(e.target.value)}
          className="border border-blue-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          min={0}
        />
        <input
          type="number"
          placeholder="Candidate ID"
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
          className="border border-blue-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          min={0}
        />
        <input
          type="text"
          placeholder="Your Identity (voter name or code)"
          value={voterIdentity}
          onChange={(e) => setVoterIdentity(e.target.value)}
          className="border border-blue-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
        >
          {loading ? "Casting..." : "Cast Vote"}
        </button>
      </form>
    </div>
  );
};

export default CastVote;
