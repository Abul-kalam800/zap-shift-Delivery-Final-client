import React from "react";
import authImg from "../../assets/authImage.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
const Login = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigation = useNavigate();
  const form = location.state?.form || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigation(form)
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your login successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.meassage);
      });
  };

  return (
    <div className="p-5 flex justify-around items-center">
      <div>
        <h2 className="text-5xl font-semibold mb-4">Welcome Back</h2>
        <p className="mb-10">Login with profast</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">password requird</p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4 w-full">Login</button>
          </fieldset>
        </form>
        <p>
          Don't have an account{" "}
          <Link to="/register" state={form} className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
      <div>
        <img src={authImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
