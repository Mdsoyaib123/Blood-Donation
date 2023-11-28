import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateBlog = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    placeholder: "Start typings...",
  };

  const onSubmit = async (data) => {
    // image upload an imgbb and get an url
    // console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      // now send the menu item in server with the img url
      const blogData = {
        title: data.title,
        image: res.data.data.display_url,
        content: content,
        status: "Draft",
      };
      console.log(blogData);
      const postRes = await axiosPublic.post("/blogPost", blogData);
      console.log(postRes.data);
      if (postRes.data.insertedId) {
        toast.success("You create a blog successfully");
      }
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Create Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className=" text-lg mt-10">
        <label className="label">
          <span className=" font-bold">Title :</span>
        </label>
        <input
          {...register("title", { required: true })}
          className="w-full border px-5 py-2 rounded-md"
          type="text"
          required
          placeholder="Enter blog title "
        />
        <label className="label">
          <span className=" font-bold"> Content :</span>
        </label>
        <JoditEditor
          config={config}
          ref={editor}
          value={content}
          onBlur={(newContent) => setContent(newContent)}
          //   onChange={(newContent) => setContent(newContent)}
        />
        <input
          {...register("image", { required: true })}
          type="file"
          required
          className="file-input my-4 w-full max-w-xs"
        />
        <br></br>
        <input
          type="submit"
          value={"Add Blog"}
          className="btn px-6 bg-orange-600 text-white "
        />
      </form>
    </div>
  );
};

export default CreateBlog;
