import { Link } from "react-router-dom";

const AllList = ({ data }) => {
    return (
        <ul className="default_list">
            {
                data.map(it => {
                    return (
                        <li>
                            <Link to={`/${it.TITLE}`}>
                                <img src={it.MAIN_IMG_NORMAL} alt="" />
                                {it.TITLE}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default AllList;