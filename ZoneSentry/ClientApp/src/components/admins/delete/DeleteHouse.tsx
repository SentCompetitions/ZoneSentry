import {ConstructionCompanyService} from "../../../api";

export interface DeleteHouseProps {
    id: number
    onDelete: () => void
}

function DeleteHouse(props: DeleteHouseProps) {
    const deleteThis = () => {
        ConstructionCompanyService.deleteApiConstructioncompanyHouses(props.id).then(props.onDelete)
    }

    return <button onClick={deleteThis}>Удалить дом</button>
}

export default DeleteHouse;