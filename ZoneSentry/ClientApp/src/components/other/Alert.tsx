import { motion } from "framer-motion";
import {ReactNode} from "react";
import {opacityVariants, upVariants} from "../../animations";

export interface AlertProps {
    children: ReactNode
}

function Alert(props: AlertProps) {
    return <motion.div variants={opacityVariants} initial={'init'} animate={'show'} exit={'hide'} className="alert">
        <motion.div variants={upVariants}className="alertBody">{props.children}</motion.div>
    </motion.div>
}

export default Alert;