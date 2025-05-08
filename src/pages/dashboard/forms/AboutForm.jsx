import { useFormik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify"; // Import eye icons

export default function AboutForm() {
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
   // State for password visibility

  const formik = useFormik({
    initialValues: {
      firstName: "Zunair",
      lastName: "Ahmad",
      email: "zunair@creator.com",
      password: "",
      address: "Birmingham, UK",
      profileImage: null,
    },
    onSubmit: (values) => {
      toast.success("Profile updated successfully!");
    },
  });

  const handleImageChange = (e) => { // Fixed: Added 'e' parameter
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("profileImage", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Avatar + Upload */}
        <div className="flex items-center justify-center">
          <label className="relative cursor-pointer">
            <div className="w-24 h-24 rounded-full border overflow-hidden bg-gray-100 shadow">
              <img
                src={preview || "https://avatar.iran.liara.run/public/7"}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Password with Toggle */}
        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}