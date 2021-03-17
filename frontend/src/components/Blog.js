import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CategoryList from './CategoryList';
import SingleBlog from './SingleBlog';


const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`);
                setBlogs(res.data)
            } catch (err) {

            }
        }

        fetchBlog()
    }, []);

    useEffect(() => {

        const fetchFeaturedBlog = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/featured`);
                setFeaturedBlog(res.data[0])
            } catch (err) {

            }
        }
        fetchFeaturedBlog()
    }, []);

    let blog = null;

    if (blogs) {
        blog = blogs.map(blog => <SingleBlog key={blog.id} blog={blog} />);
    }

    return (
        <div className='container'>
            <CategoryList />
            <div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">{featuredBlog.title}</h1>
                    <p className="lead my-3">{featuredBlog.excerpt}</p>
                    <p className="lead mb-0"><Link to={`/blog/${featuredBlog.slug}`} className="text-white font-weight-bold">Continue reading...</Link></p>
                </div>
            </div>
            <div className="row mb-2">
                {blog}
            </div>

        </div>
    );
}
export default Blog;