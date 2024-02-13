import { useParams } from "react-router-dom";

const Itm = ({ data }) => {
    const { itm } = useParams();
    const dataItm = data.find(it => it.TITLE == itm);
    console.log(dataItm);
    return (
        <>
            {
                dataItm &&
                <>
                    <img src={dataItm.MAIN_IMG_NORMAL} alt="" />
                    {dataItm.TITLE} / {itm}
                </>
            }

        </>
    )
}

export default Itm;