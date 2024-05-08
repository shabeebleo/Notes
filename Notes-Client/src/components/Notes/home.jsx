import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import UserNotes from "./userNotes";

const NoteInput = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromCookie = getCookie("token");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      getNotes(tokenFromCookie);
    } else {
      navigate("/login");
    }
  }, []);

  const getCookie = (name) => {
    const value = `; `;
    const documentCookie = document.cookie;
    const parts = documentCookie.split(value);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].split('=');
      if (part[0].trim() === name) {
        return part[1];
      }
    }
    return '';
  };

  const clearCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  const getNotes = async (token) => {

    try {
      const response = await axios.get(
        "http://localhost:3001/notes/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSave = async () => {
    // Check if both title and content are not empty
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3001/notes/",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getNotes(token);
      setTitle("");
      setContent("");
      if (typeof onSave === "function") {
        onSave({ title, content });
      }
      alert(response.statusText);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };
  
  const handleLogout = async () => {
    try {
      clearCookie("token")
      const response = await axios.post('http://localhost:3001/users/logout');
      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return ( 
    <div className="bg-teal-500 min-h-[100vh] p-4">
      <div>
        <div className="max-w-md mx-auto p-4 mb-4 bg-white rounded shadow">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-auto mb-2 px-4 py-2 border rounded"
          />
          <button
            onClick={handleSave}
            className="w-full bg-teal-500 text-white hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 absolute top-4 right-4"
          >
            Logout
          </button>
        </div>
      </div>
     
      <UserNotes notes={notes} onDelete={handleDeleteNote} />
    </div>
  );
};

export default NoteInput;

