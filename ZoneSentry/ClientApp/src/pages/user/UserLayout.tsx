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

export interface Props {

}

function UserLayout(props: Props) {
    const location = useLocation()
    const Outlet = useOutlet()

    return <>
        <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} style={{
            width: '100%',
            minHeight: '100vh'
        }}>
            <AnimatePresence exitBeforeEnter>
                {Outlet && React.cloneElement(Outlet, {key: location.pathname})}
            </AnimatePresence>
        </motion.div>
    </>
}

export default UserLayout;