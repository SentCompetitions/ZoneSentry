import {useEffect, useState} from "react";
import {ConstructionCompanyService, RealtyDTO} from "../../api";
import DeleteRealty from "./delete/DeleteRealty";

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
        Номер: {realty?.number}<br/>
        <DeleteRealty id={props.id} onDelete={props.onDelete}/>
    </>
}

export default Realties;