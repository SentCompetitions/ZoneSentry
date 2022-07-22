import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import {useAuth} from "../../components/AuthProvider";
import {upVariants} from "../../animations";

function AdminIndexPage() {
    const auth = useAuth()
    
    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout'}>
        Hi {auth.user?.userName} admin
    </motion.div>
}

export default AdminIndexPage;