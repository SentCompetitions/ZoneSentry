import {RealtyDetails, RealtyUserView, UserRealtiesOwnerService, UserRealtiesTenantService} from "../../api";
import {useEffect, useState} from "react";
import {realtyToAddressString} from "../../../utils/objectsToAddressString";
import {SVGUrl} from "../../components/SVGUrl";
import {motion} from "framer-motion";
import {upVariants} from "../../animations";
import {dist} from "../../components/users/Realty";
import PlanView from "../../components/PlanView";
import useMode from "../../hooks/useMode";
import {useParams} from "react-router-dom";
import "../../styles/realtyPage.scss"

export interface RealtyDetailsPageProps {
    
}

function RealtyDetailsPage(props: RealtyDetailsPageProps) {
    const {realtyId} = useParams()
    const [realtyDetails, setRealtyDetails] = useState<RealtyDetails>()
    const [mode, setMode] = useMode()
    
    const update = () => {
        setRealtyDetails(undefined)
        if (mode == "tenant" && realtyId) UserRealtiesTenantService.getApiUserrealtiestenantRealties1(parseInt(realtyId)).then(d => setRealtyDetails(d))
        if (mode == "owner" && realtyId) UserRealtiesOwnerService.getApiUserrealtiesownerRealties1(parseInt(realtyId)).then(d => setRealtyDetails(d))
    }
    
    useEffect(() => {
        update()
    }, [mode])

    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout listArea'}>
        <div className="mainInfoBlock">
            <img src="/defaultPictures/kompomvnutru.jpg"/>
            <div className="infoBlock">
                <h2>Адрес {realtyToAddressString(realtyDetails ?? {})}</h2>
                <p>Описание Торцевое коммерческое помещение свободного назначения на первом этаже жилого дома общей площадью 45 кв.м.</p>
                <button className="defaultBtn">Изменить</button>
                <h3 className="Price">Цена: 131.142.142$/м</h3>
            </div>
        </div>
        <div className="services">
            <h2>Услуги для помещения</h2>
            <a className="servicesItem">
                <h2>АХРАНА!!</h2>
                <text className="price redText">128.000р/мин</text>
                <text className="info">Доп инфа: Это наш лютый охранник ВАСЯН. Этот работяга работал на стройке, и конечно же 8 лет в пятёрочке!</text>
            </a>
            <a className="createServiceLink">
                Добавить услугу
            </a>
        </div>
        <div className="secondInfoBlock">
            <img src="/defaultPictures/plankompom.jpg"/>
            <div className="infoBlock">
                <h2>Подробное описание</h2>
                <p>В помещении сделан качественный ремонт. В помещении есть: интернет, кондиционер, фильтры для воды, пожарная сигнализация, охранная сигнализация, приборы учета воды, тепла
                    Отведенная электрическая мощность 10 кВт </p>
                <button className="defaultBtn">Изменить</button>
                <h3 className="Price">Цена: 131.142.142$/м</h3>
            </div>
        </div>
        <div className="realtyPhotosBlock">
            <h2>Фотографии</h2>
            <div className="realtyPhotos">
                <img src="/defaultPictures/kompomvnutru.jpg"/>
                <img src="/defaultPictures/kompomvnutru.jpg"/>
                <img src="/defaultPictures/kompomvnutru.jpg"/>
            </div>
        </div>
    </motion.div>
}

export default RealtyDetailsPage;