import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useAuth} from "../../components/AuthProvider";
import {upVariants} from "../../animations";
import {
    PaymentState, PurchaseRequest,
    RealtyServicePayment,
    RealtyUserView,
    RentPaymentUserView, RentRequestDTO,
    UserRealtiesOwnerService,
    UserRealtiesTenantService,
    UserServicesPaymentService
} from "../../api";
import Realty from "../../components/users/Realty";
import useMode from "../../hooks/useMode";
import "../../styles/user.scss";
import Stats from "../../components/Stats";
import stringToDate from "../../stringToDate";
import {realtyToAddressString} from "../../../utils/objectsToAddressString";

function UserIndexPage() {
    const auth = useAuth()
    const [realties, setRealties] = useState<RealtyUserView[]>()
    const [rentPayments, setRentPayments] = useState<RentPaymentUserView[]>([])
    const [servicePayments, setServicePayments] = useState<RealtyServicePayment[]>([])
    const [rentRequests, setRentRequests] = useState<RentRequestDTO[]>([])
    const [purchaseRequest, setPurchaseRequest] = useState<PurchaseRequest[]>([])
    const [mode, setMode] = useMode()
    
    const update = () => {
        UserServicesPaymentService.getApiUserservicespaymentPayments().then(d => setServicePayments(d))
        if (mode == "owner") {
            setRentPayments([])
            UserRealtiesOwnerService.getApiUserrealtiesownerRentrequests().then(d => setRentRequests(d))
            UserRealtiesOwnerService.getApiUserrealtiesownerRentpurchase().then(d => setPurchaseRequest(d))
            UserRealtiesOwnerService.getApiUserrealtiesownerRealties().then(d => setRealties(d))
        }
        if (mode == "tenant") {
            setRentRequests([])
            setPurchaseRequest([])
            UserRealtiesTenantService.getApiUserrealtiestenantRentpayments().then(d => setRentPayments(d))
            UserRealtiesTenantService.getApiUserrealtiestenantRealties().then(d => setRealties(d))
        }
    }
    
    useEffect(() => {
        update()
    }, [mode])
    
    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout'}>
        <div>
            <p>Привет, {auth.user?.firstName} {auth.user?.lastName}! Сейчас вы {mode == "tenant" ? "Арендатор" : "Инвестор"}</p>
            <button className="changeUserTypeBtn" onClick={() => setMode(mode == "tenant" ? "owner" : "tenant")}>Переключиться на {mode == "tenant" ? "инвестора" : "арендатора"}</button>
        </div>
        
        <Stats/>

        <div className="realtiesListBlock">
            <h2>Ваши объекты</h2>
            <div className="realtiesList">
                {realties?.map(r => <Realty key={r.id} r={r}/>)}
            </div>
        </div>
        <div>
            <h2>Чеки на оплату</h2>
            {servicePayments.map(p => <div>
                <p>Оплата услуги {p.payment}</p>
                <p>{p.paymentState == PaymentState.PAID ? "Оплаченно" : "Не оплаченно"}</p>
                <p>{stringToDate(p.periodStart)} - {stringToDate(p.periodEnd)} (Дата просрочки: {stringToDate(p.dueDate)})</p>
                {p.paymentState != PaymentState.PAID && <button onClick={() => {
                    UserServicesPaymentService.postApiUserservicespaymentPaymentsPay(p.id!).then(update)
                }} className={""}>Оплатить</button>}
            </div>)}
            {rentPayments.map(p => <div>
                <p>Оплата аренды {p.payment}</p>
                <p>{p.paymentState == PaymentState.PAID ? "Оплаченно" : "Не оплаченно"}</p>
                <p>{stringToDate(p.periodStart)} - {stringToDate(p.periodEnd)} (Дата просрочки: {stringToDate(p.dueDate)})</p>
                {p.paymentState != PaymentState.PAID && <button onClick={() => {
                    UserRealtiesTenantService.postApiUserrealtiestenantRentpaymentsPay(p.id!).then(update)
                }}>Оплатить</button>}
            </div>)}
        </div>
        {mode == "owner" &&
            <div>
                <h2>Запросы</h2>
                {rentRequests.map(r => <div>
                    <p>Запрос на аренду {realtyToAddressString(r.realty ?? {})}</p>
                    <p>Запросил {r.tenant?.firstName} {r.tenant?.lastName} ({r.tenant?.email}) на {r.durationInMonths} месяцев</p>
                    <button onClick={() => {
                        UserRealtiesOwnerService.postApiUserrealtiesownerRentrequestsAccept(r.id!).then(update)
                    }}>Принять</button>
                </div>)}
                
                {purchaseRequest.map(r => <div>
                    <p>Запрос на покупку {realtyToAddressString(r.realty ?? {})}</p>
                    <p>Запросил {r.newOwner?.firstName} {r.newOwner?.lastName} ({r.newOwner?.email})</p>
                    <button onClick={() => {
                        UserRealtiesOwnerService.postApiUserrealtiesownerRentpurchaseAccept(r.id!).then(update)
                    }}>Принять</button>
                </div>)}
            </div>
        }
    </motion.div>
}

export default UserIndexPage;