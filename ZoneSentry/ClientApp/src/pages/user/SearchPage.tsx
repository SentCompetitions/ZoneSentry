import {useAuth} from "../../components/AuthProvider";
import {useState} from "react";
import { motion } from "framer-motion";
import { upVariants } from "../../animations";
import {
    ConstructionCompanyService,
    HouseCreate,
    RealtyStatus,
    RealtyUserView,
    SearchFilters,
    UserSerarchService
} from "../../api";
import {ObjectControlForm, ObjectControlState} from "react-object-control";
import Realty from "../../components/users/Realty";

function SearchPage() {
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({
        realtyStatus: undefined,
        city: "",
        areaMin: 0,
        areaMax: 100000,
        priceMin: 0,
        priceMax: 100000000
    })

    const [showMap, setShowMap] = useState(false);
    const [searchResult, setSearchResult] = useState<RealtyUserView[]>()

    const onSumbit = () => {
        UserSerarchService.postApiUserserarch(searchFilters).then(d => setSearchResult(d))
    }

    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout'}>
        <div className="searchBox">
            <div className="filtersList">
                <ObjectControlForm onSubmit={onSumbit} submitText="Подтвердить" value={searchFilters} onChange={setSearchFilters}
                                   config={{
                                       realtyStatus: {label: "Статус", control: (value, key, onChange, state) => <select value={value as string} disabled={state != ObjectControlState.Active} className={"roc input"} onChange={e => onChange(e.target.value == "" ? undefined : e.target.value as any)}>
                                               <option value={RealtyStatus.FOR_RENT}>Для аренды</option>
                                               <option value={RealtyStatus.FOR_SALE}>Для продажи</option>
                                               <option value={""}>Любое</option>
                                           </select>},
                                       city: {label: "Город"},
                                       areaMin: {label: "Мин. плозадь"},
                                       areaMax: {label: "Макс. площадь"},
                                       priceMin: {label: "Мин. цена"},
                                       priceMax: {label: "Макс. цена"}
                                   }}></ObjectControlForm>
                <button onClick={()=> setShowMap(!showMap)}>Показать {showMap?"список":"на карте"}</button>
            </div>
            <div className="resultsBox">
                <div className={`resultsList result ${showMap && "hide"}`}>
                    {searchResult?.map(r => <div className="resultItem" key={r.id}><Realty r={r}/></div>)}
                </div>
                <div className={`resultsMap result ${!showMap && "hide"}`}>
                    <img src="/defaultPictures/map.jpg"/>
                </div>
            </div>
        </div>
    </motion.div>
}

export default SearchPage;