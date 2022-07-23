import {ConstructionCompanyService, ResidentialComplexCreate} from "../../../api";
import { useState } from "react";
import {ObjectControlForm} from "react-object-control";
import Alert from "../../other/Alert";

export interface CreateResidentialComplexProps {
    onCreate: () => void
    onCancel: () => void
}

function CreateResidentialComplex(props: CreateResidentialComplexProps) {
    const [create, setCreate] = useState<ResidentialComplexCreate>({
        city: "",
        name: ""
    })
    const onSubmit = () => {
        ConstructionCompanyService.postApiConstructioncompanyComplexes(create).then(props.onCreate).then(props.onCancel)
    }

    return <Alert>
        <ObjectControlForm onSubmit={onSubmit} submitText="Подтвердить" value={create} onChange={setCreate} config={{city:{label:"город"}, name:{label:"имя"}}}/>
        <button onClick={() => props.onCancel()}>Закрыть</button>
    </Alert>
}

export default CreateResidentialComplex;