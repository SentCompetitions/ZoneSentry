import { ReactNode } from "react";

export interface InfoProps {
    children: ReactNode
}

function Info(props: InfoProps) {
    return <p className="info">{props.children}</p>
}

export default Info;