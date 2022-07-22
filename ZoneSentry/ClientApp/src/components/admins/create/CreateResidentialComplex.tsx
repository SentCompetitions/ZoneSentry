import { ResidentialComplexCreate } from "../../../api";
import {ObjectControl} from "react-object-control";
import { useState } from "react";

export interface CreateResidentialComplexProps {

}

function CreateResidentialComplex(props: CreateResidentialComplexProps) {
    const [create, setCreate] = useState<ResidentialComplexCreate>({
        city: "",
        name: ""
    })

    return <ObjectControl value={create} onChange={setCreate}/>
}

export default CreateResidentialComplex;