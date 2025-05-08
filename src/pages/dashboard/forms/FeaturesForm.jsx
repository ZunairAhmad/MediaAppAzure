import { useFormik } from "formik";

export function FeaturesForm() {
  const formik = useFormik({
    initialValues: {
      featureTitle: "",
      featureDescription: "",
    },
    onSubmit: (values) => {
      console.log("Features Form Values:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Feature Title</label>
        <input
          type="text"
          name="featureTitle"
          value={formik.values.featureTitle}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Feature Description</label>
        <input
          type="text"
          name="featureDescription"
          value={formik.values.featureDescription}
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

export default FeaturesForm;
