import {useState} from "react";
import {ConstructionCompanyService, RealtyCreate} from "../../../api";
import {ObjectControlForm} from "react-object-control";
import Alert from "../../other/Alert";

export interface CreateRealtyProps {
    houseId: number
    onCreate: () => void
    onCancel: () => void
}

function CreateRealty(props: CreateRealtyProps) {
    const [create, setCreate] = useState<RealtyCreate>({
        number: 0
    })
    const onSumbit = () => {
        ConstructionCompanyService.postApiConstructioncompanyHousesRealties(props.houseId, create).then(props.onCreate).then(props.onCancel)
    }
    
    return <Alert>
        <h2 className="alertTitle">Новое помещение</h2>
        <ObjectControlForm onSubmit={onSumbit} onChange={setCreate} value={create} submitText="Подтвердить" config={{number: {label:"номер"}}}></ObjectControlForm>
        <button className="cancel" onClick={() => props.onCancel()}>Закрыть</button>
    </Alert>
}

export default CreateRealty;