import React from "react";
import authImg from "../../assets/authImage.png";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hook/useAuth";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { creatUser } = useAuth();

  const onSubmit = (data) => {
    creatUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-5 flex justify-around items-center">
      <div>
        <h2 className="text-5xl font-semibold mb-4">Create an Account</h2>
        <p className="mb-10">Register with profast</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              {...register("name", { required: true, minLength: 6 })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-600">name requird</p>
            )}
            {errors.name?.type === "minLength" && (
              <span className="text-red-500">
                Namw minmum 6 charactors or longer
              </span>
            )}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email")}
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password")}
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4 w-full">Register</button>
          </fieldset>
        </form>
        <p>
          Already have an account{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      <div>
        <img src={authImg} alt="" />
      </div>
    </div>
  );
};

export default Register;
