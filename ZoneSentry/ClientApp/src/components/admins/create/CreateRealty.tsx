import {useState} from "react";
import {ConstructionCompanyService, RealtyCreate} from "../../../api";
import {ObjectControlForm} from "react-object-control";

export interface CreateRealtyProps {
    houseId: number
    onCreate: () => void
}

function CreateRealty(props: CreateRealtyProps) {
    const [create, setCreate] = useState<RealtyCreate>({
        number: 0
    })
    const onSumbit = () => {
        ConstructionCompanyService.postApiConstructioncompanyHousesRealties(props.houseId, create).then(props.onCreate)
    }
    
    return <ObjectControlForm onSubmit={onSumbit} onChange={setCreate} value={create} submitText="Подтвердить" config={{number: {label:"номер"}}}></ObjectControlForm>
}

export default CreateRealty;