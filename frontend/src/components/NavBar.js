import { Link, NavLink, Redirect } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {

    const [formData, setFormData] = useState({
        search: ''
    });
    const [searchData, setSearchData] = useState('');
    const { search } = formData
    const [boolSearch, setBoolSearch] = useState(false)

    const onChange = e => {
        setBoolSearch(false);
        setFormData({ [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (search.trim() !== '') {
            setSearchData(search.trim().replace(' ', '_'))
            setFormData({
                search: ''
            })
            setBoolSearch(true)
        } else {
            setBoolSearch(false)
        }

    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to='/'>Yubraj Blog</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" exact to='/'>Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" exact to='/blog'>Blog</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={onSubmit}>
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" name='search' aria-label="Search" value={search} onChange={onChange} />
                        <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
                    </form>
                </div>
            </nav>
            {boolSearch ? <Redirect to={`/search/search_title=${searchData}`} /> : null}
        </>
    );
}
export default Navbar;