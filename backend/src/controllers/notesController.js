import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id); // store deleted doc

    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }

    res.status(200).json({ message: "note was deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message }); // 500 for server errors
  }
};
