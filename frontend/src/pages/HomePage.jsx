import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import NoteCard from "../components/NoteCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/notes");
        setNotes(response.data);
        setLoading(false);
        setIsRateLimited(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again.");
        }
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {loading && (
          <p className="text-center text-primary py-10">Loading...</p>
        )}

        {!loading && notes.length === 0 && !isRateLimited && (
          <p className="text-center text-primary py-10">No notes found.</p>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
