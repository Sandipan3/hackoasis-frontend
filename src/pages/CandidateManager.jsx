import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";

const CandidateManager = () => {
  const [electionId, setElectionId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateDescription, setCandidateDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!electionId || !candidateName || !candidateDescription) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/vote/candidate/register", {
        electionId: Number(electionId),
        name: candidateName,
        description: candidateDescription,
      });
      toast.success("Candidate registered successfully");
      setCandidateName("");
      setCandidateDescription("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to register candidate"
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-extrabold text-purple-700 text-center">
        Register Candidate
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <input
          type="number"
          placeholder="Election ID"
          value={electionId}
          onChange={(e) => setElectionId(e.target.value)}
          className="border border-purple-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
          min={0}
        />
        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          className="border border-purple-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        <textarea
          placeholder="Candidate Description"
          value={candidateDescription}
          onChange={(e) => setCandidateDescription(e.target.value)}
          className="border border-purple-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition font-semibold"
        >
          {loading ? "Registering..." : "Register Candidate"}
        </button>
      </form>
    </div>
  );
};

export default CandidateManager;
