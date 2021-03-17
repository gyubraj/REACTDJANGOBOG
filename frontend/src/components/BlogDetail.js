import { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogDetail.css';
import Comment from './Comment';
import LatestNews from './LatestNews';
import { Link, withRouter } from 'react-router-dom';
import PostComment from './PostComment';
import BlogDetailPostView from './BlogDetailPostView';

const BlogDetail = (props) => {
    const [blogData, setBlogData] = useState({});
    const [userData, setUserData] = useState({});
    const [latestBlog, setLatestBlog] = useState([]);
    const [blogComments, setBlogComments] = useState({})
    const slug = props.match.params.id;
    const [reloadFetchBlogDetail, setReloadFetchBlogData] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)
    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${slug}`);
                setBlogData(res.data);
                window.scrollTo(0, 0)

            } catch (err) {

            }
        }
        fetchBlogDetail();
    }, [slug]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/user/fewdata/1`)
            .then(res => {
                setUserData(res.data)
            })
            .catch(err => {

            });
    }, [])

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/blog/latest3blog/`, { slug })
            .then(res => {
                setLatestBlog(res.data)
            })
            .catch(err => {

            });
    }, [slug]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/blog/comments/${slug}`)
            .then(res => {
                setBlogComments(res.data)
                setDataLoaded(true)
            })
    }, [slug, reloadFetchBlogDetail])


    const uploadComment = (e, name, email, comment, blog, setFormData) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/api/blog/comment/`, { name, email, comment, blog })
            .then(res => {
                setFormData({
                    name: '',
                    email: '',
                    comment: ''
                })
                setReloadFetchBlogData(true)
            })
            .catch(err => {

            });

    }

    let latestBlogs = null;
    if (latestBlog.length > 0) {
        latestBlogs = latestBlog.map(blog => <LatestNews key={blog.slug} blog={blog} />)

    }

    let comments = (<h3>No Comment yet</h3>)
    if (dataLoaded) {
        if (blogComments.comments.length > 0) {
            comments = blogComments.comments.map(comment => <Comment key={comment.id} comment={comment} />)
        }
    }

    const blogPostView = <BlogDetailPostView blogData={blogData} />;
    return (
        <div className="container pb50">
            <div className="row">
                <div className="col-md-9 mb40">
                    <article>
                        <img src={blogData.thumbnail} alt="" className="img-fluid mb30" />
                        <div className="post-content">
                            {blogPostView}
                            <hr className="mb40" />
                            <h4 className="mb40 text-uppercase font500">About Author</h4>
                            <div className="media mb40">
                                {/* <i className="d-flex mr-3 fa fa-user-circle fa-5x text-primary"></i> */}
                                <img className="d-flex mr-3 img-fluid" width="100" src={userData.profile_pic} alt="Generic placeholder image" />
                                <div className="media-body">
                                    <Link to='/'><h5 className="mt-0 font700">{userData.user}</h5></Link>{userData.excerpt}
                                </div>
                            </div>
                            <hr className="mb40" />
                            <h4 className="mb40 text-uppercase font500">Comments</h4>
                            {comments}
                            <PostComment upload={uploadComment} blog={blogData.id} />

                        </div>
                    </article>
                    {/* <!-- post article--> */}

                </div>
                <div className="col-md-3 mb40">
                    <div className="mb40">

                    </div>
                    {/* <!--/col--> */}
                    <div className="mb40">
                        <h4 className="sidebar-title">Categories</h4>
                        <ul className="list-unstyled categories">
                            <li><Link className="p-2 text-muted" to='/category/world'>World</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/entertainment'>Entertainmnet.</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/technology'>Technology</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/design'>Design</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/culture'>Culture</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/business'>Business</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/politics'>Politics</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/opinion'>Opinion</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/science'>Science</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/health'>Health</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/style'>Style</Link></li>
                            <li><Link className="p-2 text-muted" to='/category/travel'>Travel</Link></li>
                            <li> <Link className="p-2 text-muted" to='/category/sport'>Sport</Link></li>
                        </ul>
                    </div>
                    {/* <!--/col--> */}
                    <div>
                        <h4 className="sidebar-title">Latest News</h4>
                        <ul className="list-unstyled">
                            {latestBlogs}
                        </ul>
                    </div>


                </div>
            </div>
        </div>
    );
}
export default withRouter(BlogDetail);

