import {RealtyStatus, RealtyUserView, UserRealtiesOwnerService, UserRealtiesTenantService} from "../../api";
import {useState} from "react";
import {realtyToAddressString} from "../../../utils/objectsToAddressString";
import PlanView from "../PlanView";
import {Link} from "react-router-dom";

export interface RealtyProps {
    r: RealtyUserView,
    withAcceptButton?: boolean
}

export function dist(x1:number, x2:number, y1:number, y2: number){
    return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
}

function Realty(props: RealtyProps) {
    const [loading, setLoading] = useState(false)
    
    return <>
        <img src="/defaultPictures/kompom.jpg"/>
        <div>
            <h3>Адрес: {realtyToAddressString(props.r)}</h3>
            {props.r.planUrl && <PlanView planUrl={props.r.planUrl}/>}
            <Link className="btn" to={`realties/${props.r.id}`}>Детали</Link>
            {props.withAcceptButton && <button disabled={loading} onClick={() => {
                if (props.r.realtyStatus == RealtyStatus.FOR_SALE) UserRealtiesOwnerService.postApiUserrealtiesownerRequestpurchase({realtyId: props.r.id})
                if (props.r.realtyStatus == RealtyStatus.FOR_RENT) UserRealtiesTenantService.postApiUserrealtiestenantRequestrent({realtyId: props.r.id, durationInMonths: 6})
            }}>Запросить</button>}
        </div>
    </>
}

export default Realty;