import React from "react";
import authImg from "../../assets/authImage.png";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
              {...register("password", { 'required': true, 'minLength': 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === 'minLength' && 
              <p className="text-red-600">password requird</p>
            }
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4 w-full">Login</button>
          </fieldset>
        </form>
        <p>
          Don't have an account{" "}
          <Link to="/register" className="text-blue-600">
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
