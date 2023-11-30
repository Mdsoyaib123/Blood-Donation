import { useLoaderData } from "react-router-dom";
import Container from "../../Conponent/Container/Container";

const Blog = () => {
    const loader  = useLoaderData()
    const publishedBlog = loader.filter(blog=>blog.status === 'Published')
    console.log(publishedBlog);
    const removeHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
      };
    return (
       <Container>
         <div className="my-10">
            <div className="grid gap-10 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
                {
                    publishedBlog.map(blog=><div key={blog._id} className="card card-compact w-96 bg-base-100 shadow-xl overflow-hidden">
                    <figure><img className="object-cover object-center h-64 w-full" src={blog.image} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">{blog.title}</h2>
                      <p>{removeHtmlTags(blog.content)}</p>
                     
                    </div>
                  </div>)
                }
            </div>
        </div>
       </Container>
    );
};

export default Blog;