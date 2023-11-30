import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../Provider/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";

const Register = () => {
  const [district, setDistrict] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistrict(data[2].data);
      });
    axios.get("upazilas.json").then((res) => {
      setUpazilas(res.data[2].data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = React.useRef({});
  password.current = watch("password", "");

  const districtValue = watch("district");
  const upazilasValue = watch("upazila");
  const bloodValue = watch("blood");

  const onSubmit = (data) => {
    // console.log(data);

    createUser(data.email, data.password)
      .then((res) => {
        updateUserProfile(data.name, data.photoUrl).then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            bloodGroup: data.blood,
            District:data.district,
            upazila:data.upazila,
            Avatar: data.photoUrl,
            role: 'Donor',
            status: 'Active'
          };
          // console.log(userInfo);
          axiosPublic.post("/users", userInfo).then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              reset();
              toast.success('successfully created account')
              navigate("/");
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full flex justify-center  bg-red-100 px-10 py-10  bg-gradient-to-r from-red-500 to-amber-600">
      <div className="w-10/12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body bg-white px-10   "
        >
          <h1 className="text-4xl font-bold mb-7 text-center">
            Register As a Donor
          </h1>
          <div className="form-control">
            <div className="lg:flex w-full justify-between gap-5">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text font-bold">Full Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input border-gray-400  py-4 rounded-lg"
                  required
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input border-gray-400 py-4 rounded-lg"
                  required
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="lg:flex justify-between gap-5 ">
              <div className="w-1/2">
                <label className="label">
                  <span className="label-text font-bold">District</span>
                </label>
                <select
                  {...register("district", { required: true })}
                  name="district"
                  required
                  className="border rounded-lg border-gray-400 px-2 py-3 w-full"
                >
                  <option value={" please select"} disabled selected>
                    please select
                  </option>
                  {district.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="w-1/2">
                <label className="label">
                  <span className="label-text font-bold">Upazila</span>
                </label>
                <select
                  {...register("upazila", { required: true })}
                  className="border rounded-lg border-gray-400 px-2  py-3 w-full"
                  name="upazila"
                  id="1"
                >
                  {errors.upazila && (
                    <span className="text-red-500">This field is required</span>
                  )}
                  <option value={"please select"} disabled selected>
                    please select
                  </option>
                  {upazilas.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="lg:flex w-full justify-between gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                type="password"
                name="password"
                placeholder="Enter password"
                className="input border-gray-400  py-4 rounded-lg"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 ">password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 ">password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-500 ">
                  password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 ">
                  password must be have one uppercase and one lowercase and one
                  spacial character and one number{" "}
                </p>
              )}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Confirm Password</span>
              </label>
              <input
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
                type="password"
                name="confirmPassword"
                placeholder="Enter Confirm password"
                className="input border-gray-400 py-4 rounded-lg"
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <div className="lg:flex w-full justify-between gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Photo Url</span>
              </label>
              <input
                {...register("photoUrl", { required: true })}
                type="url"
                name="photoUrl"
                placeholder="photo url"
                className="input border-gray-400  py-4 rounded-lg"
                required
              />
              {errors.photoUrl && (
                <span className="text-red-500">PhotoUrl is required</span>
              )}
            </div>
            <div className="form-control w-1/4">
              <label className="label">
                <span className="label-text font-bold">Blood Group</span>
              </label>
              <select
                {...register("blood", { required: "please select an option" })}
                className="border rounded-lg border-gray-400 px-1 py-3 w-full"
                name="blood"
                id="blood"
                required
              >
                <option value={"  please select"} disabled selected>
                  please select
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.blood && <p>{errors.blood.message}</p>}
            </div>
          </div>
          <div className="form-control mt-6">
            <p className="text-red-500 py-2"></p>
            <input
              className="btn bg-red-500 text-white rounded-lg"
              type="submit"
              value="Register"
            />
          </div>
          <p className="text-md text-center mt-2 font-bold text-black">
            Already have an account you can{" "}
            <Link to={"/login"} className="text-red-600 text-xl underline">
              &nbsp;Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
