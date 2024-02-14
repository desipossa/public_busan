import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const SearchResurt = ({ data }) => {
    const [query, setQuery] = useSearchParams();
    const [link, setLink] = useState(null);
    const r = query.get('q');

    const searchResurt = data.filter(it => it.MAIN_TITLE.includes(r) || it.ITEMCNTNTS.includes(r));
    console.log(searchResurt);

    const { kakao } = window;
    const navigate = useNavigate();


    const getMap = () => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
            mapOption = {
                center: new kakao.maps.LatLng(searchResurt[1]?.LAT, searchResurt[1]?.LNG), // 지도의 중심좌표
                level: 7
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다



        var positions = searchResurt.map(it => {
            return {
                title: it.MAIN_TITLE,
                latlng: new kakao.maps.LatLng(it.LAT, it.LNG),
                //desc : it.MAIN_TITLE
            }
        });




        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i++) {




            // var content = `<div class ="label"><span class="left"></span><span class="center">${}</span><span class="right"></span></div>`;

            // 마커를 생성합니다
            // 커스텀 오버레이를 생성합니다
            var customOverlay = new kakao.maps.CustomOverlay({
                position: positions[i].latlng, // 마커를 표시할 위치
                content: `<div class="link" data-name="${positions[i].title}"><span>${positions[i].title}</span></div>`
            });

            // 커스텀 오버레이를 지도에 표시합니다
            customOverlay.setMap(map);

        }

    }

    useEffect(() => {
        getMap();
    }, [searchResurt])

    useEffect(() => {
        //console.log(document.querySelectorAll('.link'));
        const linkItm = document.querySelectorAll('.link');
        linkItm.forEach(it => {
            it.addEventListener('click', (e) => {
                console.log(e.currentTarget.dataset.name);
                navigate(`/${e.currentTarget.dataset.name}`)
            })
        })
    })


    return (
        <>
            <div className="num">
                {searchResurt.length}개의 결과값이 있음요.
            </div>
            <div id="map" className="kakaoMap"></div>
            <ul className="default_list">
                {
                    searchResurt.map((it, idx) => {
                        return (
                            <li>
                                <Link to={`/${it.MAIN_TITLE}`}>
                                    {idx + 1}
                                    <img src={it.MAIN_IMG_NORMAL} alt="" />
                                    {it.MAIN_TITLE}
                                </Link>
                            </li>
                        )

                    })
                }
            </ul>
        </>
    )
}

export default SearchResurt;