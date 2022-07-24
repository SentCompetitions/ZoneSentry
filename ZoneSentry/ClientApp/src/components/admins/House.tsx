import {useEffect, useState} from "react";
import {ConstructionCompanyService, HouseDTO} from "../../api";
import Realty from "./Realty";
import CreateResidentialComplex from "./create/CreateResidentialComplex";
import CreateRealty from "./create/CreateRealty";
import DeleteHouse from "./delete/DeleteHouse";
import Info from "../other/Info";

export interface HouseProps {
    id: number
    onDelete: () => void
}

function House(props: HouseProps) {
    document.body.clientWidth
    const [home, setHome] = useState<HouseDTO>();
    const [showCreate, setShowCreate] = useState(false)
    let realtiesCount = home?.realties?.length ?? 0;
    const [showAmount, setShowAmount] = useState(0)

    const update = () =>{
        ConstructionCompanyService.getApiConstructioncompanyHouses(props.id).then(d => setHome(d));
    }
    const cancelCreate = () => {
        setShowCreate(!showCreate)
    }

    useEffect( () => {
        update()
    }, []);

    useEffect(() => {
        if (home) setShowAmount(countDefaultShowAmount(realtiesCount))
    }, [home])

    return <>
        {home && <div className="adminHouse listBox">
            <div className="listInfoBlock">
                <img src="defaultPictures/Turgenev.jpg" alt="*фото дома*"/>
                <div className="listInfoBlockSB">
                    <Info>Улица: {home?.street}</Info>
                    <button className="editBtn">Изменить</button>
                    <div className="create createHouse">
                        <button className="createShow editBtn" onClick={() => setShowCreate(!showCreate)}>Добавить помещение</button>
                        {showCreate && <CreateRealty houseId={props.id} onCreate={update} onCancel={cancelCreate}/>}
                    </div>
                    <DeleteHouse id={props.id} onDelete={props.onDelete}/>
                </div>
            </div>
            <div className="realtiesList">
                {home?.realties?.slice(0, showAmount).map(r => <div key={r}><Realty id={r} onDelete={update}/></div>)}
                {showAmount < realtiesCount && <button onClick={() => setShowAmount(increaseShowAmount(showAmount, realtiesCount))}>Показать больше</button>}
            </div>
        </div>}
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