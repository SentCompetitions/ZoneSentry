import {useAuth} from "./AuthProvider";
import {ReactElement} from "react";
import {ApplicationUserType} from "../api";

export interface Props {
    user: ReactElement,
    constructionCompanyAdmin: ReactElement,
    serviceProvider: ReactElement,
    nonAuntificated: ReactElement
}

function TypeSwitch(props: Props) {
    const auth = useAuth()
    
    let element: ReactElement = <></>
    
    if (!auth.isAuthenticated) element = props.nonAuntificated
    else {
        switch (auth.user?.type) {
            case ApplicationUserType.USER:
                element = props.user
                break
            case ApplicationUserType.CONSTRUCTION_COMPANY_ADMIN:
                element = props.constructionCompanyAdmin
                break
            case ApplicationUserType.SERVICE_PROVIDER:
                element = props.serviceProvider
                break
            default:
                element = props.nonAuntificated
        }
    }
    
    return element
}

export default TypeSwitch;