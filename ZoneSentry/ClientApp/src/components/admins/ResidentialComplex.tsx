import {useEffect, useState} from "react";
import {ConstructionCompanyService, ResidentialComplexDTO} from "../../api";
import House from "./House";

export interface ResidentialComplexProps {
    id: number
}

function ResidentialComplex(props: ResidentialComplexProps) {
    const [complex, setComplex] = useState<ResidentialComplexDTO>();

    useEffect( () => {
        ConstructionCompanyService.getApiConstructioncompanyComplexes(props.id).then(d => setComplex(d));
    }, []);

    return <>
        Имя Комплекса: {complex?.name}<br/>
        Дома: {complex?.houses?.map(c => <div key={c}>id:{c}) <House id={c}/></div>)}<br/>
    </>
}

export default ResidentialComplex;