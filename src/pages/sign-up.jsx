import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "../Api/api";
import { toast } from "react-toastify";

export function SignUp() {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  const navigate = useNavigate(); 

  const handleSubmit = async (values) => {
    try {
      console.log("Api data", values)
      const response = await apiClient.post("/api/auth/signup", values);
      if(response?.data?.success){
        toast.success(response?.data?.message)
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      }
      else {
        toast.error(response?.data?.success)
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      // Show error message to user
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Signup"
        />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your details to register.
          </Typography>
        </div>

        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
              <div className="mb-1 flex flex-col gap-6">

                {/* Name Field */}
                <div className="flex font-medium space-between gap-2">
                <div className="flex-1">
                  <Typography variant="small" color="blue-gray" className="mb-3 font-medium">
                    First Name
                  </Typography>
                  <Input
                    size="lg"
                    name="firstName"
                    placeholder="John"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{ className: "before:content-none after:content-none" }}
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="flex-1">
                  <Typography variant="small" color="blue-gray" className="flex mb-3 font-medium">
                    Last Name
                  </Typography>
                  <Input
                    size="lg"
                    name="lastName"
                    placeholder="Doe"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{ className: "before:content-none after:content-none" }}
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-3 font-medium">
                    Your Email
                  </Typography>
                  <Input
                    size="lg"
                    name="email"
                    placeholder="name@mail.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{ className: "before:content-none after:content-none" }}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Password Field */}
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-3 font-medium">
                    Your Password
                  </Typography>
                  <Input
                    size="lg"
                    name="password"
                    type="password"
                    placeholder="********"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{ className: "before:content-none after:content-none" }}
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

              </div>

              <Button type="submit" className="mt-6" fullWidth>
                Register Now
              </Button>

              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                Already have an account?
                <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default SignUp;
