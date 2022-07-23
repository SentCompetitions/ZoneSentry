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

    useEffect( () => {
        update()
    }, []);

    return<>
        <div className="adminCompany listBox">
            <Info>Имя Компании: {company?.name}</Info>
            <div className="complexesList">
                {company?.residentialComplexes?.map(c => <div key={c}><ResidentialComplex id={c} onDelete={update}/></div>)}
            </div>
            <div className="create createComplex">
                {!showCreate && <button className="createShow" onClick={() => setShowCreate(!showCreate)}>Добавить ЖК</button>}
                {showCreate && <div className="creating">
                    <CreateResidentialComplex onCreate={update}/>
                    <button className="createCancel" onClick={() => setShowCreate(!showCreate)}>Отмена</button>
                    </div>}
            </div>
        </div>
    </>
}

export default Company;