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

    return <div>
        {realtyDetails && <>
            Адрес: {realtyToAddressString(realtyDetails)} <br/>
            <PlanView planUrl={realtyDetails.planUrl}/>
        </>}
        {!realtyDetails && "Загрузка..."}
    </div>
}

export default RealtyDetailsPage;