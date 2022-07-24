import {useEffect, useState} from "react";
import {ConstructionCompanyDTO, ConstructionCompanyService} from "../../api";
import ResidentialComplex from "./ResidentialComplex";
import CreateResidentialComplex from "./create/CreateResidentialComplex";
import Info from "../other/Info";

export interface CompanyProps {}

function Company(props: CompanyProps) {
    const [company, setCompany] = useState<ConstructionCompanyDTO>()
    const [showCreate, setShowCreate] = useState(false)
    
    const update = () => {
        ConstructionCompanyService.getApiConstructioncompany().then(d => setCompany(d));
    }
    const cancelCreate = () => {
        setShowCreate(!showCreate)
    }

    useEffect( () => {
        update()
    }, []);

    return<>
        <div className="adminCompany listBox">
            <Info>Имя Компании: {company?.name}</Info>
            <div className="create createComplex adminResidentialComplex">
                <button className="createShow" onClick={() => setShowCreate(!showCreate)}>Добавить ЖК</button>
                {showCreate && <CreateResidentialComplex onCreate={update} onCancel={cancelCreate}/>}
            </div>
            <div className="complexesList">
                {company?.residentialComplexes?.map(c => <div key={c}><ResidentialComplex id={c} onDelete={update}/></div>)}
            </div>
        </div>
    </>
}

export default Company;