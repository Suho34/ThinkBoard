import React, { useState } from "react";
import { PenSquare, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NoteCard({ note, setNotes }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const res = await axios.delete(`http://localhost:5001/api/notes/${id}`);

      // If successful
      toast.success(res.data.message || "Note deleted successfully!");
      setShowModal(false);
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Dark Card with Golden Border */}
      <div className="bg-base-200 border border-yellow-500 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg overflow-hidden relative">
        <div
          className="block cursor-pointer p-5 pb-14" // extra bottom padding for buttons
        >
          {/* Title */}
          <h2 className="text-lg font-bold text-base-content mb-2">
            {note.title}
          </h2>
          {/* Content preview */}
          <p className="text-sm text-base-content/80 line-clamp-3 mb-3">
            {note.content}
          </p>
          {/* Dates */}
          <div className="text-xs text-base-content/60 space-y-1">
            <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(note.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Actions - Bottom Right */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={() => navigate(`/notes/edit/${note._id}`)}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-primary border border-primary rounded hover:bg-primary hover:text-primary-content transition-colors"
          >
            <PenSquare size={16} />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-error border border-error rounded hover:bg-error hover:text-error-content transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="font-bold text-lg text-error mb-4">
                Confirm Delete
              </h3>
              <p className="text-base-content mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{note.title}</span>? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 text-sm font-medium border border-base-300 rounded hover:bg-base-200 transition-colors"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-error rounded hover:bg-error/90 transition-colors disabled:opacity-50"
                  onClick={(e) => handleDelete(e, note._id)}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteCard;
