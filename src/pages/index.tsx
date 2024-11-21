import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todos from "@/pages/components/Todos";
// Define the type for form data
interface FormData {
  title: string;
  description: string;
}

// Define the type for a todo item
interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "Completed";
}

const MyTodo: React.FC = () => {
  // Typing the state
  const [formData, setFormData] = useState<FormData>({ title: "", description: "" });
  const [tableData, setTableData] = useState<TodoItem[]>([]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      setTableData([
        ...tableData,
        { ...formData, id: Date.now(), status: "Pending" },
      ]);
      setFormData({ title: "", description: "" });
    }
  };

  // Handle deletion of a todo
  const handleDelete = (id: number) => {
    const userResponse = confirm("Are You Sure to delete Todo? ");

    if (userResponse) {
      const updatedTableData = tableData.filter((row) => row.id !== id);
      setTableData(updatedTableData);
      toast.success("Deleted Success!");
    }
  };

  // Handle status change (Pending/Completed)
  const handleStatusChange = (id: number) => {
    const updatedTableData: TodoItem[] = tableData.map((row) =>
      row.id === id
    ? { ...row, status: row.status === "Pending" ? "Completed" : "Pending" }
        : row
    );
    setTableData(updatedTableData);
  };

  // Handle updating a todo
  const handleUpdate = (id: number, updatedData: Partial<TodoItem>) => {
    const updatedTableData = tableData.map((row) =>
      row.id === id ? { ...row, ...updatedData } : row
    );
    setTableData(updatedTableData);
    toast.success("Todo Updated Successfully!");
  };

  return (
    <div
      className="h-screen bg-opacity-15 bg-cover bg-center"
      style={{ backgroundImage: "url(/bg.jpg)" }}
    >
      <ToastContainer />
      <div className="text-4xl sm:text-5xl mt-2 font-medium text-white">
        <h1 className="text-center bg-black bg-opacity-30 py-2 px-4 rounded-lg">
          My Todo App
        </h1>
      </div>

      <div className="mt-4 sm:mt-8 flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-md bg-pink-400 bg-opacity-70 p-4 rounded-lg shadow-lg">
            <h1 className="font-bold text-2xl sm:text-3xl text-white text-center mb-4">
              New Todo
            </h1>

            <label className="block text-white mb-2 text-sm sm:text-base">Title</label>
            <input
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-pink-500 focus:outline-none"
              name="title"
              type="text"
              onChange={handleChange}
              value={formData.title}
              placeholder="Enter Title"
            />

            <label className="block text-white mb-2 text-sm sm:text-base">Description</label>
            <textarea
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-pink-500 focus:outline-none"
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Describe the task"
            />

            <button
              type="submit"
              className="w-full justify-center py-2 text-lg sm:text-xl text-white rounded-md flex bg-red-500 hover:bg-red-600 transition-all"
            >
              Click to Add!
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 px-4">
        <Todos
          data={tableData}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export default MyTodo;
