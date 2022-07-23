import {useEffect, useState} from "react";
import {ConstructionCompanyService, ResidentialComplexDTO} from "../../api";
import House from "./House";
import CreateHouse from "./create/CreateHouse";
import DeleteResidentialComplex from "./delete/DeleteResidentialComplex";

export interface ResidentialComplexProps {
    id: number
    onDelete: () => void
}

function ResidentialComplex(props: ResidentialComplexProps) {
    const [complex, setComplex] = useState<ResidentialComplexDTO>();
    const [showCreate, setShowCreate] = useState(false)

    const update = () => {
        ConstructionCompanyService.getApiConstructioncompanyComplexes(props.id).then(d => setComplex(d));
    }
    
    useEffect( () => {
        update()
    }, []);

    return <>
        <button onClick={() => setShowCreate(!showCreate)}> {showCreate ? "Отмена" : "Добавить дом"} </button>
        {showCreate && <CreateHouse complexId={props.id} onCreate={update}/>}
        Имя Комплекса: {complex?.name}<br/>
        Дома: {complex?.houses?.map(c => <div key={c}>id:{c}) <House id={c} onDelete={update}/></div>)}
        <DeleteResidentialComplex id={props.id} onDelete={props.onDelete}/>
    </>
}

export default ResidentialComplex;