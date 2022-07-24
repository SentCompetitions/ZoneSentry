import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import {useAuth} from "../../components/AuthProvider";
import {upVariants} from "../../animations";
import {RealtyUserView, UserRealtiesOwnerService, UserRealtiesTenantService} from "../../api";
import {SVGUrl} from "../../components/SVGUrl";
import Realty from "../../components/users/Realty";
import useMode from "../../hooks/useMode";
import "../../styles/user.scss";

function UserIndexPage() {
    const auth = useAuth()
    const [realties, setRealties] = useState<RealtyUserView[]>()
    const [mode, setMode] = useMode()
    
    useEffect(() => {
        if (mode == "owner") UserRealtiesOwnerService.getApiUserrealtiesownerRealties().then(d => setRealties(d))
        if (mode == "tenant") UserRealtiesTenantService.getApiUserrealtiestenantRealties().then(d => setRealties(d))
    }, [mode])
    
    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout'}>
        <div>
            <p>Привет, {auth.user?.userName}! Сейчас вы {mode == "tenant" ? "Арендатор" : "Инвестор"}</p>
            <button className="changeUserTypeBtn" onClick={() => setMode(mode == "tenant" ? "owner" : "tenant")}>Переключиться на {mode == "tenant" ? "инвестора" : "арендатора"}</button>
        </div>

        <div className="realtiesListBlock">
            <h2>Ваши объекты</h2>
            <div className="realtiesList">
                {realties?.map(r => <Realty key={r.id} r={r}/>)}
            </div>
        </div>
    </motion.div>
}

export default UserIndexPage;