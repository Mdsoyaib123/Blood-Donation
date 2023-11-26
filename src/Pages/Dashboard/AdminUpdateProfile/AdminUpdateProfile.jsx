import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";

const AdminUpdateProfile = () => {
    const [district, setDistrict] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const {id}  =useParams()


   
    useEffect(() => {
        fetch("/districts.json")
          .then((res) => res.json())
          .then((data) => {
            setDistrict(data[2].data);
          });
          
        axios.get("/upazilas.json").then((res) => {
          setUpazilas(res.data[2].data);
        });

        axios.get(`/adminUpdateProfile/${id}`)
        .then(res=>{
            console.log(res.data );
        })
      }, [id]);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div>
            <h1>admin update</h1>
            <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body bg-white px-10   "
        >
          {/* <h1 className="text-4xl font-bold mb-10 text-center">
            Register As a Donor
          </h1> */}
          <div className="form-control">
            <div className="lg:flex w-full justify-between gap-5">
              <div className="form-control w-2/3">
                <label className="label">
                  <span className="label-text font-bold">Full Name</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input border-gray-400  py-4 rounded-lg"
                  required
                />
                
              </div>
              <div className="form-control w-1/3">
              <label className="label">
                <span className="label-text font-bold">Blood Group</span>
              </label>
              <select
                {...register("blood")}
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
             
            </div>
              
            </div>
            <div className="lg:flex justify-between gap-5 ">
              <div className="w-1/2">
                <label className="label">
                  <span className="label-text font-bold">District</span>
                </label>
                <select
                  {...register("district")}
                  name="district"
                  required
                  className="border rounded-lg border-gray-400 px-2 py-3 w-full"
                >
                  <option value={" please select"} disabled selected>
                    please select
                  </option>
                  {district?.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
               
              </div>
              <div className="w-1/2">
                <label className="label">
                  <span className="label-text font-bold">Upazila</span>
                </label>
                <select
                  {...register("upazila")}
                  className="border rounded-lg border-gray-400 px-2  py-3 w-full"
                  name="upazila"
                  id="1"
                >
                
                  <option value={"please select"} disabled selected>
                    please select
                  </option>
                  {upazilas?.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="lg:flex w-full justify-between gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Photo Url</span>
              </label>
              <input
                {...register("photoUrl")}
                type="url"
                name="photoUrl"
                placeholder="photo url"
                className="input border-gray-400  py-4 rounded-lg"
                required
              />
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
          
        </form>
        </div>
    );
};

export default AdminUpdateProfile;