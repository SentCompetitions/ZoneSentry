import {useEffect, useState} from "react";
import {ConstructionCompanyService, HouseDTO} from "../../api";
import Realties from "./Realties";
import CreateResidentialComplex from "./create/CreateResidentialComplex";
import CreateRealty from "./create/CreateRealty";
import DeleteHouse from "./delete/DeleteHouse";

export interface HouseProps {
    id: number
    onDelete: () => void
}

function House(props: HouseProps) {
    document.body.clientWidth
    const [home, setHome] = useState<HouseDTO>();
    const [showCreate, setShowCreate] = useState(false)
    let realtiesCount = home?.realties?.length ?? 0;
    const [showAmount, setShowAmount] = useState(countDefaultShowAmount(realtiesCount))

    const update = () =>{
        ConstructionCompanyService.getApiConstructioncompanyHouses(props.id).then(d => setHome(d));
    }

    useEffect( () => {
        update()
    }, []);

    return <>
        {home && <>
            <button onClick={() => setShowCreate(!showCreate)}> {showCreate ? "Отмена" : "Добавить помещение"} </button>
            {showCreate && <CreateRealty houseId={props.id} onCreate={update}/>}
            Улица: {home?.street}<br/>
            Помещение: {home?.realties?.slice(0, showAmount).map(r => <div key={r}>id:{r})<Realties id={r} onDelete={update}/></div>)}
            {showAmount < realtiesCount && <button onClick={() => setShowAmount(increaseShowAmount(showAmount, realtiesCount))}>Показать больше</button>}
            <DeleteHouse id={props.id} onDelete={props.onDelete}/>
        </>}
    </>
}

export default House;

function countDefaultShowAmount(realtiesCount: number) : number{
    let showAmountDefault = 2;
    if(document.body.clientWidth > 2000) showAmountDefault=3;
    else if(document.body.clientWidth > 3000) showAmountDefault=4;
    if(showAmountDefault > realtiesCount) showAmountDefault = realtiesCount;

    return showAmountDefault;
}

function increaseShowAmount(amount : number, realtiesCount: number) : number{
    amount += countDefaultShowAmount(realtiesCount);
    if(amount > realtiesCount) amount = realtiesCount;
    return amount;
}