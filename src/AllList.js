import { useEffect } from "react";
import { Link } from "react-router-dom";

const AllList = ({ data }) => {
    const { kakao } = window;

    const getMap = () => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
            mapOption = {
                center: new kakao.maps.LatLng(data[4]?.LAT, data[4]?.LNG), // 지도의 중심좌표
                level: 7 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 마커를 표시할 위치와 title 객체 배열입니다 
        // var positions = [
        //     {
        //         title: '카카오',
        //         latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        //     },
        //     {
        //         title: '생태연못',
        //         latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        //     },
        //     {
        //         title: '텃밭',
        //         latlng: new kakao.maps.LatLng(33.450879, 126.569940)
        //     },
        //     {
        //         title: '근린공원',
        //         latlng: new kakao.maps.LatLng(33.451393, 126.570738)
        //     }
        // ];

        var positions = data.map(it => {
            return {
                title: it.MAIN_TITLE,
                latlng: new kakao.maps.LatLng(it.LAT, it.LNG)
            }
        });

        console.log("새배열" + positions);

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });
        }
    }

    useEffect(() => {
        getMap();
    }, [data])


    return (
        <>
            <div id="map" className="kakaoMap"></div>
            <ul className="default_list">
                {
                    data.map(it => {
                        return (
                            <li>
                                <Link to={`/${it.MAIN_TITLE}`}>
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

export default AllList;