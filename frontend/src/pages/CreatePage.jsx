import React, { useState } from "react";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Both title and content are required!");
      return;
    }

    try {
      setLoading(true);

      await api.post("/notes", { title, content });

      setTitle("");
      setContent("");

      toast.success("Note created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-lg">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 text-sm text-primary mb-4 hover:underline"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6 text-base-content">
          Create a New Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Note Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter note title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Content</span>
            </label>
            <textarea
              placeholder="Write your note here..."
              className="textarea textarea-bordered w-full min-h-[150px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary px-8"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
