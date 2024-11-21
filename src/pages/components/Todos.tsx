import React, { useState } from "react";

// Define types for props
interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "Completed";
}

interface TodosProps {
  data: TodoItem[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number) => void;
  onUpdate: (id: number, updatedData: Partial<TodoItem>) => void;
}

const Todos: React.FC<TodosProps> = ({ data=[], onDelete, onStatusChange, onUpdate }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const startEditing = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditFormData({ title: todo.title, description: todo.description });
  };

  const saveEdit = () => {
    if (editingId) {
      onUpdate(editingId, editFormData);
      setEditingId(null); // Exit editing mode
    }
  };

  return (
    <div className="mt-6 mx-auto max-w-7xl p-2 bg-slate-200 rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-xl text-left border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length<0 &&
            <tbody>
            <tr>No Todos Available!</tr></tbody>}
            
            {data.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === row.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 px-2 py-1 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    row.title
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === row.id ? (
                    <input
                      type="text"
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 px-2 py-1 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    row.description
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      row.status === "Pending" ? "bg-red-400 text-white" : "bg-green-500 text-white"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 space-y-2 text-center sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => onStatusChange(row.id)}
                    className={`${
                      row.status === "Pending" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                    } text-white rounded-md px-3 py-1 transition`}
                  >
                    {row.status === "Pending" ? "Mark As Completed" : "Mark As Pending"}
                  </button>

                  {editingId === row.id ? (
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-1 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(row)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-3 py-1 transition"
                    >
                      Update
                    </button>
                  )}

                  <button
                    onClick={() => onDelete(row.id)}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-md px-3 py-1 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todos;
