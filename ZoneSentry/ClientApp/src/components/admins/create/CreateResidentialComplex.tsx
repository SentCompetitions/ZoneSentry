import {ConstructionCompanyService, ResidentialComplexCreate} from "../../../api";
import { useState } from "react";
import {ObjectControlForm} from "react-object-control";

export interface CreateResidentialComplexProps {
    onCreate: () => void
}

function CreateResidentialComplex(props: CreateResidentialComplexProps) {
    const [create, setCreate] = useState<ResidentialComplexCreate>({
        city: "",
        name: ""
    })
    const onSubmit = () => {
        ConstructionCompanyService.postApiConstructioncompanyComplexes(create).then(props.onCreate)
    }

    return <ObjectControlForm onSubmit={onSubmit} submitText="Подтвердить" value={create} onChange={setCreate} config={{city:{label:"город"}, name:{label:"имя"}}}/>
}

export default CreateResidentialComplex;