
import { Link } from 'react-router-dom';
import { dateTimeConvert } from '../utility/DateTimeConvert';
const singleBlog = (props) => {

    const captilizeFirstLettr = (word) => word[0].toUpperCase() + word.slice(1);

    return (
        <div className="col-md-6">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary">{captilizeFirstLettr(props.blog.category)}</strong>
                    <h3 className="mb-0">{props.blog.title}</h3>
                    <div className="mb-1 text-muted">{dateTimeConvert(props.blog.date_created, 'date')}</div>
                    <p className="card-text mb-auto">{props.blog.excerpt}</p>
                    <Link to={{
                        pathname: `/blog/${props.blog.slug}`,
                        state: {
                            name: "Hello"
                        }
                    }} className="stretched-link">Continue reading</Link>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <img width='200' height='250' src={props.blog.thumbnail} alt='thumbnail' />
                </div>
            </div>
        </div>
    )
}
export default singleBlog;