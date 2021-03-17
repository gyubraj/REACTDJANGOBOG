import { useState, useEffect } from 'react';
import axios from 'axios';
import SingleBlog from './SingleBlog';
import CategoryList from './CategoryList';
import AlertShow from './Alert';


const Category = (props) => {

    const category = props.match.params.id;
    const [categoryData, setCategoryData] = useState([]);
    const [error, setError] = useState(false)


    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/category`, { category });
                setCategoryData(res.data);
            } catch (err) {
                setError(true)
            }
        }
        if (error) {
            setError(false)
        }
        fetchCategoryData();
    }, [category]);


    let categoryDatas = null;
    if (categoryData.length > 0) {
        categoryDatas = categoryData.map(blog => <SingleBlog key={blog.id} blog={blog} />)
    } else {
        categoryDatas = <AlertShow
            variant='primary'
            heading={`No Blog of category ${category}`}
            message="This category blog is empty .Please look for other category blog from above links.I hope you have a great day"
        />
    }

    let errormesage = null;
    if (error) {
        errormesage = <AlertShow variant='danger' heading="Error while loading data" message="Error might be caused because of internet connection or bad requst.Thank You" />
    }


    return (
        <div className='container'>
            <CategoryList />
            <div className="row mb-2">
                {error ? errormesage : categoryDatas}
            </div>
        </div>
    );
}

export default Category;
