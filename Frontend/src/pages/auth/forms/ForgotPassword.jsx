import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner.jsx";
import API_BASE_URL from "../../../constant.js";
import { Form, Input, Button, message, Spin } from "antd";


const ForgotPassword = () => {
  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email()
      .matches(/^(?!.*@[^,]*,)/)
      .required("Email is required"),
  });

  const onSubmit = async (values) => {
    const btn = document.getElementById("sendEmailBtn");
    try {
      let res = await axios.post(
        `${API_BASE_URL}/api/v1/users/forgotPassword`,
        values
      );
      if (res.status === 201) {
        message.success("Password reset link has been sent to your mail");
        btn.disabled = true;
      }
    } catch (error) {
      message.error("Error Occurred please try after some time");
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-12 col-md-8 col-sm-10">
          <div class="bg-white rounded-3 p-4">
            <h1 class="text-center mb-4 text-dark">Forgot Password</h1>
            <form onSubmit={formik.handleSubmit}>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <span class="text-danger">{formik.errors.email}</span>
              </div>
              <div class="d-grid mt-4">
                <button id="sendEmailBtn" type="submit" class="btn btn-warning">
                  <small>Send Email</small>
                </button>
              </div>
            </form>
            <div class="mt-3">
              <span>
                <small>You don't have an account?</small>
              </span>
              <Link
                class="link-primary text-decoration-underline"
                to="/auth/register"
              >
                <small>Register</small>
              </Link>
            </div>
            <div class="mt-3">
              <span class="text-muted">
                <small>Already have an account?</small>
                <Link
                  to="/auth/login"
                  class="link link-primary text-decoration-underline"
                >
                  <small>Login</small>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
