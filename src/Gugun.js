import { Link, useParams } from "react-router-dom";

const Gugun = ({ data }) => {
    const { gugun } = useParams();
    const guData = data.filter(it => it.GUGUN_NM == gugun);
    console.log(guData);
    return (
        <>
            <h2>{gugun} 맛집</h2>
            <ul className="default_list">
                {
                    guData.map((it, idx) => {
                        return (
                            <li>
                                <Link to={`/${it.TITLE}`}>
                                    {idx + 1}
                                    <img src={it.MAIN_IMG_NORMAL} alt="" />
                                    {it.TITLE}
                                </Link>
                            </li>
                        )

                    })
                }
            </ul>
        </>
    )
}

export default Gugun;