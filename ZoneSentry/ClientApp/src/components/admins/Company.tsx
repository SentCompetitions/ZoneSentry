import {useEffect, useState} from "react";
import {ConstructionCompanyDTO, ConstructionCompanyService} from "../../api";
import ResidentialComplex from "./ResidentialComplex";

export interface CompanyProps {}

function Company(props: CompanyProps) {
    const [company, setCompany] = useState<ConstructionCompanyDTO>();

    useEffect( () => {
        ConstructionCompanyService.getApiConstructioncompany().then(d => setCompany(d));
    }, []);

    return<>
        Имя Компании: {company?.name}<br/>
        Комплексы: {company?.residentialComplexes?.map(c => <div key={c}>id:{c}) <ResidentialComplex id={c}/></div>)}<br/>
    </>
}

export default Company;