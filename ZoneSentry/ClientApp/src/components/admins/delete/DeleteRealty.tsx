import {ConstructionCompanyService} from "../../../api";

export interface DeleteRealtyProps {
    id: number
    onDelete: () => void
}

function DeleteRealty(props: DeleteRealtyProps) {
    const deleteThis = () => {
        ConstructionCompanyService.deleteApiConstructioncompanyRealties(props.id).then(props.onDelete)
    }

    return <button className="deleteBtn editBtn" onClick={deleteThis}>Удалить помещение</button>
}

export default DeleteRealty;