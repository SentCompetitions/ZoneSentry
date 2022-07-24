import { motion } from "framer-motion";
import {useAuth} from "../../components/AuthProvider";
import {upVariants} from "../../animations";
import Company from "../../components/admins/Company";
import './../../styles/ListBox.scss'


function AdminIndexPage() {
    const auth = useAuth()
    
    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout listArea'}>
        <Company/>
    </motion.div>
}

export default AdminIndexPage;