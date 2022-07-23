import {useEffect, useState} from "react";
import {ConstructionCompanyDTO, ConstructionCompanyService} from "../../api";
import ResidentialComplex from "./ResidentialComplex";
import CreateResidentialComplex from "./create/CreateResidentialComplex";

export interface CompanyProps {}

function Company(props: CompanyProps) {
    const [company, setCompany] = useState<ConstructionCompanyDTO>();
    const [showCreate, setShowCreate] = useState(false)
    
    const update = () => {
        ConstructionCompanyService.getApiConstructioncompany().then(d => setCompany(d));
    }

    useEffect( () => {
        update()
    }, []);

    return<>
        <button onClick={() => setShowCreate(!showCreate)}> {showCreate ? "Отмена" : "Добавить ЖК"}</button>
        {showCreate && <CreateResidentialComplex onCreate={update}/>}
        Имя Компании: {company?.name}<br/>
        Комплексы: {company?.residentialComplexes?.map(c => <div key={c}>id:{c}) <ResidentialComplex id={c}/></div>)}
    </>
}

export default Company;