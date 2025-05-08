import { useFormik } from "formik";

export function TeamForm() {
  const formik = useFormik({
    initialValues: {
      teamName: "",
      teamRole: "",
    },
    onSubmit: (values) => {
      console.log("Team Form Values:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Team Member Name</label>
        <input
          type="text"
          name="teamName"
          value={formik.values.teamName}
          onChange={formik.handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Role</label>
        <input
          type="text"
          name="teamRole"
          value={formik.values.teamRole}
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

export default TeamForm;
