import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useVolunteer from "../../../Hooks/useVolunteer";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [isVolunteer] = useVolunteer()
  const { data: Blogs = [] ,refetch } = useQuery({
    queryKey: ["allBlog"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBlogs");
    //   console.log(res.data);
      return res.data;
    },
  });
  const handlePublish =async(id)=>{
    const res = await axiosSecure.patch(`/updateStatusPublish/${id}`,{status: 'Published'})
    // console.log(res.data);
    if(res.data.modifiedCount > 0 ){
        refetch()
        toast.success('Blog status update successfully')
    }
  }
  const handleDraft =async(id)=>{
    const res = await axiosSecure.patch(`/updateStatusDraft/${id}`,{status: 'Draft'})
    // console.log(res.data);
    if(res.data.modifiedCount > 0 ){
        refetch()
        toast.success('Blog status update successfully')
    }
  }
  const handleDelete =async(id)=>{
    const res = await axiosSecure.delete(`/deleteBlog/${id}`)
    // console.log(res.data);
    if(res.data.deletedCount > 0 ){
        refetch()
        toast.success('Blog delete successfully')
    }
  }
  const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
 
  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold">All Blogs Here</h1>
        <Link to={"/dashboard/content-management/add-blog"}>
          <button className="btn btn-outline text-white bg-[#e61710]">
            Add Blog
          </button>
        </Link>
      </div>
      <div className="mt-20">
        <div className="grid grid-cols-1 gap-5 mx-10">
          {Blogs.map((blog) => (
            <div
              key={blog._id}
              className="card lg:card-side bg-base-100 shadow-xl"
            >
              <figure>
                <img
                className="w-64 h-52 object-cover object-center"
                  src={blog?.image}
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title }</h2>
                <p>{removeHtmlTags(blog?.content)}</p>
                {isVolunteer ? '' : <div className="card-actions justify-end">
                  
                  {blog.status === "Draft" ? (
                    <button onClick={()=>handlePublish(blog._id)} className="btn btn-outline text-white bg-[#A8A196]">Publish</button>
                  ):
                  <button onClick={()=>handleDraft(blog._id)} className="btn btn-outline text-white bg-[#A8A196]">Unpublish </button>
                }
                  <button onClick={()=>handleDelete(blog._id)}  className="btn btn-outline text-white bg-[#e61710]">Delete</button>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
