import axios from "axios";
import { useEffect, useState } from "react";
import Gugun from "./Gugun";
import { Link, Route, Routes } from "react-router-dom";
import Itm from "./Itm";
import AllList from "./AllList";

import './reset.scss';
import './common.scss';

const App = () => {
    const [data, setData] = useState([]);
    const [gugunName, setGugunName] = useState([]);

    const getData = async () => {
        const r = await axios.get('https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=nmPIjJ%2Bj0FufPiP6k4BLPlq3n%2B46QZN%2B6hgSINrrxqk3nNwnoHX2ynqX6Dlgr3xFeivGPus2vgmh6Ifx1vdu1g%3D%3D&pageNo=1&numOfRows=260&resultType=JSON');
        //console.log(r.data.getFoodKr.item[0].GUGUN_NM);
        setData(r.data.getFoodKr.item);
        const GG = r.data.getFoodKr.item.map(it => it.GUGUN_NM);
        const GG_LIST = [...new Set(GG)];
        console.log(GG_LIST);
        setGugunName(GG_LIST);
    }



    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
            <h1><Link to={`/`}>부산맛집</Link></h1>
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
                <Route path="/gu/:gugun" element={<Gugun data={data} />} />
                <Route path="/:itm" element={<Itm data={data} />} />
            </Routes>
        </div>
    )
}

export default App;