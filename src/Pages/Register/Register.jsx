import React, { useState } from "react";
import authImg from "../../assets/authImage.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import useAxiouSecure from "../../hook/useAxiouSecure";
import Swal from "sweetalert2";
import useAxioes from "../../hook/useAxioes";
const Register = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const form = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { creatUser, userProfielInfo } = useAuth();
  const [profielpic, setProfielpic] = useState();

  const axiosInstance = useAxioes();

  const onSubmit = (data) => {
    creatUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        console.log(data.name);
        const userInfo = {
          email: data.email,
          role: "user",
          created_At: new Date().toISOString(),
          lastLog_At: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log("userData is save", userRes.data);

        // update profile 
        const updateProfiel = {
          displayName: data.name,
          photoURL: profielpic,
        };
        console.log(updateProfiel);

        userProfielInfo(updateProfiel)
          .then(() => {
            console.log("profiel update");
          })
          .catch((error) => {
            console.log(error.message);
          });

        navigation(form);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImgupload = async (e) => {
    const imge = e.target.files[0];
    console.log(imge);

    const formData = new FormData();
    // ✅ Correct key name for imgbb is 'image' (not 'imge')
    formData.append("image", imge);

    const imguploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgeUpload_Key
    }`;

    try {
      const res = await axios.post(imguploadUrl, formData);
      console.log(res.data);

      if (res.data.success) {
        const imageUrl = res.data.data.url;
        setProfielpic(imageUrl);
        // ✅ Now you can send this imageUrl to your backend or show preview
      }
    } catch (error) {
      console.error("Image Upload Failed:", error.message);
    }
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
              {...register("name")}
            />

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email")}
            />
            <label className="label">Profiel Picture</label>
            <input
              type="file"
              className="input"
              placeholder="upload your photo"
              onChange={handleImgupload}
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
            <button className="btn btn-neutral mt-4 w-full " type="submit">
              Register
            </button>
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
