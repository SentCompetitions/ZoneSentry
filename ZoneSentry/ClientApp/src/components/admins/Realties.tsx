import {useEffect, useState} from "react";
import {ConstructionCompanyService, RealtyDTO} from "../../api";

export interface RealtiesProps {
    id: number
}

function Realties(props: RealtiesProps) {
    const [realty, setRealty] = useState<RealtyDTO>();

    useEffect( () => {
        ConstructionCompanyService.getApiConstructioncompanyRealties(props.id).then(d => setRealty(d));
    }, []);

    return <>
        Номер: {realty?.number}<br/>
    </>
}

export default Realties;