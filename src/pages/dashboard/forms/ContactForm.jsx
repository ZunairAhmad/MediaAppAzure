import { useFormik } from "formik";

export function ContactForm() {
  const formik = useFormik({
    initialValues: {
      contactEmail: "",
      contactPhone: "",
    },
    onSubmit: (values) => {
      console.log("Contact Form Values:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="contactEmail"
          value={formik.values.contactEmail}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="text"
          name="contactPhone"
          value={formik.values.contactPhone}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}

export default ContactForm;
