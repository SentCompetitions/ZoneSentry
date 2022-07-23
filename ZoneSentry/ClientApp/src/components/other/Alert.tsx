import {ReactNode} from "react";

export interface AlertProps {
    children: ReactNode
}

function Alert(props: AlertProps) {
    return <div className="alert">
        <div className="alertBody">{props.children}</div>
    </div>
}

export default Alert;