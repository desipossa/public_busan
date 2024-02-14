import axios from "axios";
import { useEffect, useState } from "react";
import Gugun from "./Gugun";
import { Link, Route, Routes } from "react-router-dom";
import Itm from "./Itm";
import AllList from "./AllList";

import './reset.scss';
import './common.scss';
import './style.scss';
import Search from "./Search";
import SearchResurt from "./SearchResurt";

const App = () => {
    const [data, setData] = useState([]);
    const [gugunName, setGugunName] = useState([]);

    const key = `nmPIjJ%2Bj0FufPiP6k4BLPlq3n%2B46QZN%2B6hgSINrrxqk3nNwnoHX2ynqX6Dlgr3xFeivGPus2vgmh6Ifx1vdu1g%3D%3D`

    const getData = async () => {
        const r = await axios.get(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${key}&pageNo=1&numOfRows=260&resultType=JSON`);
        const d = await r.data.getFoodKr.item;
        setData(d);
        const gg = d.map(it => it.GUGUN_NM);
        const gg_list = [...new Set(gg)];
        setGugunName(gg_list);
        //console.log(d);
    }



    useEffect(() => {
        getData();
    }, []);




    return (
        <div>
            <h1>
                <Link to={`/`}>
                    부산맛집
                    <img src={`${process.env.PUBLIC_URL}/images/logo.jpg`} alt="" />
                </Link>
            </h1>
            <Search />
            {/* <div className="bg"></div> */}
            <nav className="gnb">
                <ul>
                    {
                        gugunName.map(it => {
                            return (
                                <li><Link to={`/gu/${it}`}>{it}</Link></li>
                            )
                        })
                    }
                </ul>
            </nav>



            <Routes>
                <Route path="/" element={<AllList data={data} />} />
                <Route path="/search" element={<SearchResurt data={data} />} />
                <Route path="/gu/:gugun" element={<Gugun data={data} />} />
                <Route path="/:itm" element={<Itm data={data} />} />
            </Routes>
        </div>
    )
}

export default App;