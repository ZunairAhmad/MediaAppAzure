import { useFormik } from "formik";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import apiClient from "../Api/api";
import { toast } from "react-toastify";

export function SignIn() {
  const navigate = useNavigate(); 
  const handleSubmit = async (values) => {
    try {
      console.log("Api data", values)
      const response = await apiClient.post("/api/auth/login", values);
      if(response?.data?.success){
        localStorage.setItem('token', response?.data?.token)
        localStorage.setItem("role", response?.data?.data?.role)
        localStorage.setItem("userId", response?.data?.data?._id)
        toast.success(response?.data?.message)
        setTimeout(() => {
          if(response?.data?.data?.role === "admin") navigate("/dashboard");
          else  navigate("/feed");
        }, 3000);
      }
      else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      // Show error message to user
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          {/* Added Sign Up link */}
          <div className="flex justify-between">
          <Typography variant="small" className="mt-4 text-center font-normal">
            Back to{" "}
            <Link to="/feed" className="font-medium text-gray-900">
              Feed
            </Link>
          </Typography>
          <Typography variant="small" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link to="/sign-up" className="font-medium text-gray-900">
              Sign up
            </Link>
          </Typography>
          </div>
        </form>
      </div>

      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Pattern"
        />
      </div>
    </section>
  );
}

export default SignIn;