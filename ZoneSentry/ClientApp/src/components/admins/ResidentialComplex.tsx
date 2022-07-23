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

    const cancelCreate = () => {
        setShowCreate(!showCreate)
    }
    
    useEffect( () => {
        update()
    }, []);

    return <>
        <div className="adminResidentialComplex listBox">
            <div className="listInfoBlock">
                <Info>Имя Комплекса: {complex?.name}</Info>
                <img src="defaultPictures/Turgenev.jpg" alt="*фото комплекса*"/>
            </div>

            <div className="housesList">
                {complex?.houses?.map(c => <div key={c}><House id={c} onDelete={update}/></div>)}
            </div>
            <div className="create createHouse">
                <button className="createShow" onClick={() => setShowCreate(!showCreate)}>Добавить дом</button>
                {showCreate && <CreateHouse complexId={props.id} onCreate={update} onCancel={cancelCreate}/>}
            </div>
            <DeleteResidentialComplex id={props.id} onDelete={props.onDelete}/>
        </div>
    </>
}

export default ResidentialComplex;