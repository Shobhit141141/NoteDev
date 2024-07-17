import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import toast, { Toaster } from "react-hot-toast";
import { createDSATopic } from "@/apis/dsaApi";
import { useAuth } from "@/context/GoogleAuthContext";

const DsaForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [submitting, setsubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; image?: string }>({});
  const { user, uid } = useAuth();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errors: { title?: string; image?: string } = {};
    if (!title) errors.title = "Title is required";
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    if (!user) {
      toast.error("You must be logged in to submit the form");
      return;
    }
    if (!uid) {
      return;
    }
    setsubmitting(true);
    try {
      await createDSATopic(title, image, uid);
      toast.success("Form submitted successfully");
      navigate("/");
      setsubmitting(false);
    } catch (error) {
      setsubmitting(false);
      toast.error("Failed to submit form");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 rounded-[20px] shadow-lg bg-[#00000090]">
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.image ? "border-red-500" : "border-gray-300"
            } cursor-pointer focus:outline-none`}
          />
          {errors.image && (
            <p className="mt-2 text-sm text-red-600">{errors.image}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {submitting ? (
            <span className="loading loading-dots loading-md flex mx-auto"></span>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};
export default DsaForm;
