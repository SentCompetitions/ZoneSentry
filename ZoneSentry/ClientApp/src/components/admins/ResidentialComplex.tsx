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
    const [showHouses, setShowHouses] = useState(false)

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
                <img src="defaultPictures/Turgenev.jpg" alt="*фото комплекса*"/>
                <div className="listInfoBlockSB">
                    <Info>{complex?.name}</Info>
                    <button className="editBtn whiteBg">Изменить</button>
                    <div className="create createHouse">
                        <button className="createShow greenBtn whiteBg editBtn" onClick={() => setShowCreate(!showCreate)}>Добавить дом</button>
                        {showCreate && <CreateHouse complexId={props.id} onCreate={update} onCancel={cancelCreate}/>}
                    </div>
                    <DeleteResidentialComplex id={props.id} onDelete={props.onDelete}/>
                </div>
                <button className="hideListBtn" onClick={() => setShowHouses(!showHouses)}>
                    <img className={showHouses?'show':''} src="icons/hideBtn.svg" alt="скрыть"/>
                </button>
            </div>

            <div className={showHouses?"housesList":"hide housesList"}>
                {complex?.houses?.map(c => <div key={c}><House id={c} onDelete={update}/></div>)}
            </div>
        </div>
    </>
}

export default ResidentialComplex;