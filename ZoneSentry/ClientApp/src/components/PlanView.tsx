import {SVGUrl} from "./SVGUrl";
import {motion} from "framer-motion";
import {upVariants} from "../animations";
import {dist} from "./users/Realty";
import {useState} from "react";

export interface PlanViewProps {
    planUrl: string | null | undefined
}

function PlanView(props: PlanViewProps) {
    const [hoveredItem, setHoveredItem] = useState<SVGLineElement>()

    const onMouseOver = (e: React.MouseEvent<SVGSVGElement>) => {
        if (e.target instanceof SVGLineElement) {
            setHoveredItem(e.target as SVGLineElement)
        }
    }
    
    return <>
        <svg width="200" height="200" viewBox={"0 0 100 100"} onMouseOver={onMouseOver}>
            <SVGUrl url={`/Media/Plans/${props.planUrl}`}/>
        </svg>
        {hoveredItem && <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} layout style={{position: "absolute", top: hoveredItem.getBoundingClientRect().top, left: hoveredItem.getBoundingClientRect().left}}>
            Длина: {Math.round(dist(hoveredItem.x1.baseVal.value, hoveredItem.x2.baseVal.value, hoveredItem.y1.baseVal.value, hoveredItem.y2.baseVal.value))}
        </motion.div>}
    </>
}

export default PlanView;