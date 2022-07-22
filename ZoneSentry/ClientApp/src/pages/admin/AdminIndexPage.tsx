import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import {useAuth} from "../../components/AuthProvider";
import {upVariants} from "../../animations";
import {ConstructionCompanyDTO, ConstructionCompanyService} from "../../api";
import ResidentialComplex from "../../components/admins/ResidentialComplex";
import Company from "../../components/admins/Company";
import CreateResidentialComplex from "../../components/admins/create/CreateResidentialComplex";

function AdminIndexPage() {
    const auth = useAuth()
    const [company, setCompany] = useState<ConstructionCompanyDTO>();

    useEffect( () => {
        ConstructionCompanyService.getApiConstructioncompany().then(d => setCompany(d));
    }, []);
    
    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout'}>
        <Company/>
        <CreateResidentialComplex/>
    </motion.div>
}

export default AdminIndexPage;