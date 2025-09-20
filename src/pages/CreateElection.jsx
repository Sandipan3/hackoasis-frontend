import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";

const CreateElection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [totalCandidates, setTotalCandidates] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !totalCandidates) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/vote/create", {
        title,
        description,
        totalCandidates: Number(totalCandidates),
      });
      toast.success(`Election created! ID: ${res.data.electionId}`);
      setTitle("");
      setDescription("");
      setTotalCandidates("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-extrabold text-purple-700 text-center">
        Create Election
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Election Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-purple-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-purple-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition resize-none"
        />
        <input
          type="number"
          placeholder="Total Candidates"
          value={totalCandidates}
          onChange={(e) => setTotalCandidates(e.target.value)}
          className="border border-purple-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
          min={1}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition font-semibold"
        >
          {loading ? "Creating..." : "Create Election"}
        </button>
      </form>
    </div>
  );
};

export default CreateElection;
