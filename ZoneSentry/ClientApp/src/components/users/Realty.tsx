import {SVGUrl} from "../SVGUrl";
import {RealtyUserView} from "../../api";
import {useState} from "react";
import { motion } from "framer-motion";
import {upVariants} from "../../animations";
import {realtyToAddressString} from "../../../utils/objectsToAddressString";
import PlanView from "../PlanView";
import {Link} from "react-router-dom";

export interface RealtyProps {
    r: RealtyUserView
}

export function dist(x1:number, x2:number, y1:number, y2: number){
    return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
}

function Realty(props: RealtyProps) {
    return <>
        <img src="/defaultPictures/kompom.jpg"/>
        <div>
            <h3>Адрес: {realtyToAddressString(props.r)}</h3>
            <Link className="btn" to={`realties/${props.r.id}`}>Детали</Link>
            {props.r.planUrl && <PlanView planUrl={props.r.planUrl}/>}
        </div>
    </>
}

export default Realty;