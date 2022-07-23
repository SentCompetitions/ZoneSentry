import {ConstructionCompanyService} from "../../../api";

export interface DeleteResidentialComplexProps {
    id: number
    onDelete: () => void
}

function DeleteResidentialComplex(props: DeleteResidentialComplexProps) {
    const deleteThis = () => {
        ConstructionCompanyService.deleteApiConstructioncompanyComplexes(props.id).then(props.onDelete)
    }

    return <button onClick={deleteThis}>Удалить комплекс</button>
}

export default DeleteResidentialComplex;