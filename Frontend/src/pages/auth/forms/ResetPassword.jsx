import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import API_BASE_URL from "../../../constant.js";


const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    try {
        let res = await axios.get(
          `${API_BASE_URL}/api/v1/users/list-all-users`
          
        );
       
      if (res.data && res.data.users) {
        console.log(res.data);
        console.log("data", res.data);
        const reqUser = res.data.users.find((user) => user.email === email);
        if (reqUser) {
          const tokenCheck = reqUser.randomString === token;
          if (!tokenCheck) {
            navigate("/error");
            message.error("token not matched");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const initialValues = { password: "", confirmPassword: "" };

  const validationSchema = Yup.object({
    password: Yup.string().min(8).required("Password is required"),
    confirmPassword: Yup.string().min(8).required("Password is required"),
  });

  const onSubmit = async (values) => {
    try {
      let res = await axios.put(
        `${API_BASE_URL}/api/v1/users/resetPassword`,
        // "http://localhost:5000/api/v1/users/resetPassword",
        {
          ...values,
          email,
        }
      );
      if (res.status === 200) {
        message.success(res.data.message);
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-12 col-md-8 col-sm-10">
          <div
            style={{
              maxWidth: "700px",
              backgroundColor: "#FFFFFF",
              margin: "auto",
            }}
            className="p-5 rounded-3 reset-bg"
          >
            <h1 className="text-center mb-4 text-dark">Reset Password</h1>
            <form className="p-4" onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <small>Enter New Password</small>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter New password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <span className="text-danger">{formik.errors.password}</span>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  <small>Confirm Password</small>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
                <span className="text-danger">
                  {formik.errors.confirmPassword}
                </span>
              </div>
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-warning">
                  <small>Set Password</small>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
