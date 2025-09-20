import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../api/api";
import { ethers } from "ethers";

const CastVote = () => {
  const [electionId, setElectionId] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [voterIdentity, setVoterIdentity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!electionId) return;

    const fetchCandidates = async () => {
      try {
        const totalCandidates = 5;
        const res = await api.get(
          `/vote/candidates/${electionId}/${totalCandidates}`
        );
        setCandidates(res.data.candidates);
      } catch (err) {
        toast.error("Failed to fetch candidates");
      }
    };

    fetchCandidates();
  }, [electionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!electionId || !selectedCandidate || !voterIdentity) {
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
        candidateId: Number(selectedCandidate),
        nullifier,
        identityCommitment,
      });
      toast.success("Vote cast successfully!");
      setElectionId("");
      setSelectedCandidate("");
      setVoterIdentity("");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cast Vote</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Election ID"
          value={electionId}
          onChange={(e) => setElectionId(e.target.value)}
          className="border p-2 rounded"
          min={0}
        />
        <select
          value={selectedCandidate}
          onChange={(e) => setSelectedCandidate(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Candidate</option>
          {candidates.map((c) => (
            <option key={c.candidateId} value={c.candidateId}>
              {c.name} - {c.description}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Your Identity (voter code)"
          value={voterIdentity}
          onChange={(e) => setVoterIdentity(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Casting..." : "Cast Vote"}
        </button>
      </form>
    </div>
  );
};

export default CastVote;
