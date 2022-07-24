import {useEffect, useState} from "react";
import {ConstructionCompanyService, RealtyDTO} from "../../api";
import DeleteRealty from "./delete/DeleteRealty";
import Info from "../other/Info";

export interface RealtiesProps {
    id: number
    onDelete: () => void
}

function Realty(props: RealtiesProps) {
    const [realty, setRealty] = useState<RealtyDTO>();

    useEffect( () => {
        ConstructionCompanyService.getApiConstructioncompanyRealties(props.id).then(d => setRealty(d));
    }, []);

    return <>
        <div className="adminRealties listBox">
            <div className="listInfoBlock">
                <img src="defaultPictures/kompom.jpg" alt="*фото помещения*"/>
                <div className="listInfoBlockSB">
                    <Info>Номер: {realty?.number}</Info>
                    <button className="editBtn">Изменить</button>
                    <DeleteRealty id={props.id} onDelete={props.onDelete}/>
                </div>
            </div>
        </div>
    </>
}

export default Realty;