import {useState} from "react";
import {ConstructionCompanyService, HouseCreate} from "../../../api";
import {ObjectControlForm} from "react-object-control";
import Alert from "../../other/Alert";

export interface CreateHouseProps {
    complexId: number
    onCreate: () => void
    onCancel: () => void
}

function CreateHouse(props: CreateHouseProps) {
    const [create, setCreate] = useState<HouseCreate>({
        street: "",
        houseNumber: 0,
        building: 0,
        district: "",
        housing: 0
    })
    const onSumbit = () => {
        ConstructionCompanyService.postApiConstructioncompanyComplexesHouses(props.complexId, create).then(props.onCreate).then(props.onCancel)
    }
    
    return <Alert>
        <ObjectControlForm onSubmit={onSumbit} submitText="Подтвердить" value={create} onChange={setCreate}
            config={{
                street: {label: "улица"},
                houseNumber: {label: "номер дома"},
                building: {label: "здание"},
                district: {label: "район"},
                housing: {label: "корпус"}
            }}></ObjectControlForm>
        <button onClick={() => props.onCancel()}>Закрыть</button>
    </Alert>
}

export default CreateHouse;