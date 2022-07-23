import {useEffect, useState} from "react";
import {ConstructionCompanyService, RealtyDTO} from "../../api";
import DeleteRealty from "./delete/DeleteRealty";
import Info from "../other/Info";

export interface RealtiesProps {
    id: number
    onDelete: () => void
}

function Realties(props: RealtiesProps) {
    const [realty, setRealty] = useState<RealtyDTO>();

    useEffect( () => {
        ConstructionCompanyService.getApiConstructioncompanyRealties(props.id).then(d => setRealty(d));
    }, []);

    return <>
        <div className="adminRealties listBox">
            <Info>Номер: {realty?.number}</Info>
            <DeleteRealty id={props.id} onDelete={props.onDelete}/>
        </div>
    </>
}

export default Realties;