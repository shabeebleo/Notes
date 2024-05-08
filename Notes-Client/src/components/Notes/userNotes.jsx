import React from "react";
const UserNotes = ({ notes, onDelete }) => {
  return (
    <div className="bg-teal-500">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-4 h-auto rounded shadow col-span-1">
            <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4 whitespace-pre-wrap">
              {note.content}
            </p>
            <p className="text-xs text-gray-400">{note.created_at}</p>
            <button
              onClick={() => onDelete(note.id)}
              className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotes;

