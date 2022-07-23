import {SVGUrl} from "../SVGUrl";
import {RealtyUserView} from "../../api";
import {useState} from "react";

export interface RealtyProps {
    r: RealtyUserView
}

function dist(x1:number, x2:number, y1:number, y2: number){
    return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
}

function Realty(props: RealtyProps) {
    const [hoveredItem, setHoveredItem] = useState<SVGLineElement>()
    
    const onMouseOver = (e: React.MouseEvent<SVGSVGElement>) => {
      if (e.target instanceof SVGLineElement) {
          setHoveredItem(e.target as SVGLineElement)
      }
    }

    return <div>
        Номер дома: {props.r.number}
        <svg width="300" height="300" viewBox={"0 0 100 100"} onMouseOver={onMouseOver}>
            <SVGUrl url={`/Media/Plans/${props.r.planUrl}`}/>
        </svg>
        {hoveredItem && <div style={{position: "absolute", top: hoveredItem.getBoundingClientRect().top, left: hoveredItem.getBoundingClientRect().left}}>
            Длина: {Math.round(dist(hoveredItem.x1.baseVal.value, hoveredItem.x2.baseVal.value, hoveredItem.y1.baseVal.value, hoveredItem.y2.baseVal.value))}
        </div>}
    </div>
}

export default Realty;