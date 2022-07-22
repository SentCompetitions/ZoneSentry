import {useEffect, useState} from "react";
import {ConstructionCompanyService, HouseDTO} from "../../api";
import Realties from "./Realties";

export interface HouseProps {
    id: number
}

function House(props: HouseProps) {
    const [home, setHome] = useState<HouseDTO>();

    useEffect( () => {
        ConstructionCompanyService.getApiConstructioncompanyHouses(props.id).then(d => setHome(d));
    }, []);

    return <>
        Улица: {home?.street}<br/>
        Помещение: {home?.realties?.map(r => <div key={r}>id:{r})<Realties id={r}/></div>)}
    </>
}

export default House;