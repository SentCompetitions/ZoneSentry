import { ReactNode } from "react";

export interface InfoProps {
    children: ReactNode
}

function Info(props: InfoProps) {
    return <h2 className="info">{props.children}</h2>
}

export default Info;