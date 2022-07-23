import {useEffect, useState} from "react";
import {ConstructionCompanyService, HouseDTO} from "../../api";
import Realties from "./Realties";
import CreateResidentialComplex from "./create/CreateResidentialComplex";
import CreateRealty from "./create/CreateRealty";
import DeleteHouse from "./delete/DeleteHouse";

export interface HouseProps {
    id: number
    onDelete: () => void
}

function House(props: HouseProps) {
    const [home, setHome] = useState<HouseDTO>();
    const [showCreate, setShowCreate] = useState(false)
    
    const update = () =>{
        ConstructionCompanyService.getApiConstructioncompanyHouses(props.id).then(d => setHome(d));
    }
    

    useEffect( () => {
        update()
    }, []);

    return <>
        <button onClick={() => setShowCreate(!showCreate)}> {showCreate ? "Отмена" : "Добавить помещение"} </button>
        {showCreate && <CreateRealty houseId={props.id} onCreate={update}/>}
        Улица: {home?.street}<br/>
        Помещение: {home?.realties?.map(r => <div key={r}>id:{r})<Realties id={r} onDelete={update}/></div>)}
        <DeleteHouse id={props.id} onDelete={props.onDelete}/>
    </>
}

export default House;