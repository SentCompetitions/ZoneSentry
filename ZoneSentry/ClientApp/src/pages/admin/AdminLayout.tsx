import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Link, useOutlet, useLocation} from "react-router-dom";
import mainIcon from '../images/mainIcon.svg';
import mainActiveIcon from '../images/mainActiveIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import searchActiveIcon from '../images/searchActiveIcon.svg';
import chatIcon from '../images/chatIcon.svg';
import chatActiveIcon from '../images/chatActiveIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import profileActiveIcon from '../images/profileActiveIcon.svg';
import {upVariants} from "../../animations";
import Navbar from "../../components/Navbar";

export interface Props {

}

function AdminLayout(props: Props) {
    const location = useLocation()
    const Outlet = useOutlet()
   
    return <>
        <Navbar/>
        <motion.div className="main" variants={upVariants} initial={'init'} animate={'show'} exit={'hide'}>
            <AnimatePresence exitBeforeEnter>
                {Outlet && React.cloneElement(Outlet, {key: location.pathname})}
            </AnimatePresence>
        </motion.div>
    </>
}

export default AdminLayout;