import {useEffect, useState} from "react";
import {ConstructionCompanyService, ResidentialComplexDTO} from "../../api";
import House from "./House";
import CreateHouse from "./create/CreateHouse";
import DeleteResidentialComplex from "./delete/DeleteResidentialComplex";
import Info from "../other/Info";

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
        <div className="adminResidentialComplex listBox">
            <Info>Имя Комплекса: {complex?.name}</Info>
            <div className="housesList">
                {complex?.houses?.map(c => <div key={c}><House id={c} onDelete={update}/></div>)}
            </div>
            <div className="create createHouse">
                {!showCreate && <button className="createShow" onClick={() => setShowCreate(!showCreate)}>Добавить дом</button>}
                {showCreate && <div className="creating">
                    <CreateHouse complexId={props.id} onCreate={update}/>
                    <button className="createCancel" onClick={() => setShowCreate(!showCreate)}>Отмена</button>
                </div>}
            </div>
            <DeleteResidentialComplex id={props.id} onDelete={props.onDelete}/>
        </div>
    </>
}

export default ResidentialComplex;