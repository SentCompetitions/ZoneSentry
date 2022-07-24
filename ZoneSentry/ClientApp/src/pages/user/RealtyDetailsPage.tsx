import {
    RealtyDetails, RealtyServiceDTO,
    RealtyStatus,
    RealtyUpdate,
    UserRealtiesOwnerService, UserRealtiesServicesOwnerService, UserRealtiesServicesTenantService,
    UserRealtiesTenantService
} from "../../api";
import {useEffect, useState} from "react";
import {realtyToAddressString} from "../../../utils/objectsToAddressString";
import {AnimatePresence, motion} from "framer-motion";
import {upVariants} from "../../animations";
import useMode from "../../hooks/useMode";
import {useParams} from "react-router-dom";
import "../../styles/realtyPage.scss"
import {useAuth} from "../../components/AuthProvider";
import PlanView from "../../components/PlanView";
import Alert from "../../components/other/Alert";
import {ObjectControlForm, ObjectControlState} from "react-object-control";
import { Line } from "react-chartjs-2";
import Stats from "../../components/Stats";

export interface RealtyDetailsPageProps {
    
}

function RealtyDetailsPage(props: RealtyDetailsPageProps) {
    const {realtyId} = useParams()
    const [realtyDetails, setRealtyDetails] = useState<RealtyDetails>()
    const [realtyUpdate, setRealtyUpdate] = useState<RealtyUpdate>({})
    const [mode, setMode] = useMode()
    const auth = useAuth()
    const [editing, setEditing] = useState(false)
    const [avalibleservices, setAvalibleServices] = useState<RealtyServiceDTO[]>()
    const [requestingService, setRequestingService] = useState(false)
    
    const update = (noReset?: boolean) => {
        if (!noReset) setRealtyDetails(undefined)
        
        if (mode == "tenant" && realtyId) {
            UserRealtiesTenantService.getApiUserrealtiestenantRealties1(parseInt(realtyId)).then(d => setRealtyDetails(d))
            UserRealtiesServicesTenantService.getApiUserrealtiesservicestenantRealtiesAvailable(parseInt(realtyId)).then(d => setAvalibleServices(d))
        }
        if (mode == "owner" && realtyId) {
            UserRealtiesOwnerService.getApiUserrealtiesownerRealties1(parseInt(realtyId)).then(d => setRealtyDetails(d))
            UserRealtiesServicesOwnerService.getApiUserrealtiesservicesownerRealtiesAvailable(parseInt(realtyId)).then(d => setAvalibleServices(d))
        }
    }
    
    useEffect(() => {
        update()
    }, [mode])
    
    const startEditing = () => {
        if (realtyDetails) {
            setEditing(true)
            setRealtyUpdate({id: realtyDetails.id, realtyStatus: realtyDetails.realtyStatus, paymentPerMonth: realtyDetails.paymentPerMonth ?? 0, sellCost: realtyDetails.sellCost ?? 0})
        }
    }
    
    const endEditing = () => {
        if (realtyDetails && realtyUpdate)
            UserRealtiesOwnerService.putApiUserrealtiesownerRealties(realtyDetails.id!, realtyUpdate).then(() => {
                update(true)
                setEditing(false);
            })
    }

    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout listArea'}>
        <div className="mainInfoBlock">
            <img src="/defaultPictures/kompomvnutru.jpg"/>
            <div className="infoBlock">
                <h2>Адрес {realtyDetails && realtyToAddressString(realtyDetails)}</h2>
                <p>Описание Торцевое коммерческое помещение свободного назначения на первом этаже жилого дома общей площадью 45 кв.м.</p>
                {realtyDetails?.owner?.id == auth.user?.id && <button className="defaultBtn" onClick={startEditing}>Изменить</button>}
                {realtyDetails?.sellCost && realtyDetails?.realtyStatus == RealtyStatus.FOR_SALE && <h3 className="Price">Цена: {realtyDetails.sellCost}</h3>}
                {realtyDetails?.paymentPerMonth && realtyDetails?.realtyStatus == RealtyStatus.FOR_RENT && <h3 className="Price">Цена: {realtyDetails.paymentPerMonth}/месяц</h3>}
                {realtyDetails?.owner?.id == auth.user?.id && <h3 className="Price">Вы владелец</h3>}
                {realtyDetails?.currentRentAgreement?.tenant?.id == auth.user?.id && <h3 className="Price">Вы арендуете это помещение</h3>}
            </div>
        </div>
        
        <AnimatePresence>
            {editing && <Alert>
                <ObjectControlForm onSubmit={endEditing} value={realtyUpdate} onChange={setRealtyUpdate} submitText={"Сохранить"} config={{
                    id: {control: () => <></>},
                    paymentPerMonth: {label: "Платёж за месяц"},
                    sellCost: {label: "Стоимость продажи"},
                    realtyStatus: {label: "Статус", control: (value, key, onChange, state) => <select value={value as string} disabled={state != ObjectControlState.Active} className={"roc input"} onChange={e => onChange(e.target.value as any)}>
                            <option value={RealtyStatus.FOR_RENT}>Для аренды</option>
                            <option value={RealtyStatus.FOR_SALE}>Для продажи</option>
                            <option value={RealtyStatus.NOT_FOR_SALE}>Не для продажи</option>
                        </select>}
                }}/>
                <button className="defaultBtn" onClick={() => setEditing(false)}>Закрыть</button>
            </Alert>}
        </AnimatePresence>

        {realtyId &&
            <Stats realtyId={parseInt(realtyId)}/>
        }
        
        <div className="services">
            <h2>Услуги для помещения</h2>
            { realtyDetails?.services?.map(s => 
                <a className="servicesItem">
                    <h2>{s.realtyService?.name}</h2>
                    <text className="price redText">{s.cost}/месяц</text>
                    {/*<text className="info">Доп инфа: Это наш лютый охранник ВАСЯН. Этот работяга работал на стройке, и конечно же 8 лет в пятёрочке!</text>*/}
                </a>
            )}
            <a onClick={() => setRequestingService(true)} className="createServiceLink">
                Добавить услугу
            </a>
        </div>

        <AnimatePresence>
            {requestingService && <Alert>
                <h1>Доступные услуги</h1>
                {avalibleservices?.map(s => <div>
                    <p>{s.name}</p>
                    <p>{s.cost}/месяц</p>
                </div>)}
                <button className="defaultBtn" onClick={() => setRequestingService(false)}>Закрыть</button>
            </Alert>}
        </AnimatePresence>
        
        {realtyDetails?.planUrl &&
            <div className="secondInfoBlock">
                <PlanView planUrl={realtyDetails.planUrl}/>
                <div className="infoBlock">
                    <h2>Планировка</h2>
                    <p>В помещении сделан качественный ремонт. В помещении есть: интернет, кондиционер, фильтры для
                        воды, пожарная сигнализация, охранная сигнализация, приборы учета воды, тепла
                        Отведенная электрическая мощность 10 кВт </p>
                    <a href={`/Media/Plans/${realtyDetails.planUrl}`}>Скачать</a>
                </div>
            </div>
        }
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