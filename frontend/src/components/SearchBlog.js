import axios from 'axios';
import { useState } from 'react';
import SingleBlog from './SingleBlog';

const SearchBlog = (props) => {
    const [searchData, setSearchData] = useState([]);
    const search = props.match.params.id.replace('_', ' ');
    console.log(search)

    const getSearchdata = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/search/`, { search })
            setSearchData(res.data)

        } catch (err) {

        }
    }
    getSearchdata()

    let searchDatats = null;
    if (searchData.length > 0) {
        searchDatats = searchData.map(blog => (<SingleBlog key={blog.slug} blog={blog} />
        ))
    }

    return (
        <div className='container'>
            <h3 className="mb-4 mt-4">Searched Result</h3>
            <div className="row mb-2">
                {searchDatats}
            </div>
        </div>
    );
}

export default SearchBlog;