import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import {useAuth} from "../../components/AuthProvider";
import {upVariants} from "../../animations";
import {RealtyUserView, UserRealtiesOwnerService} from "../../api";
import {SVGUrl} from "../../components/SVGUrl";
import Realty from "../../components/users/Realty";

function UserIndexPage() {
    const auth = useAuth()
    const [owned, setOwned] = useState<RealtyUserView[]>()
    
    useEffect(() => {
        UserRealtiesOwnerService.getApiUserrealtiesownerRealties().then(d => setOwned(d))
    }, [])
    
    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout'}>
        Hi {auth.user?.userName}
        {owned?.map(r => <Realty key={r.id} r={r}/>)}
    </motion.div>
}

export default UserIndexPage;