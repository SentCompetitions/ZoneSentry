import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import OAuth from "../components/OAuth";
import {upVariants} from "../animations";
import { motion } from "framer-motion";

export interface Props {

}

enum State {
    Login,
    Register
}

function LoginPage(props: Props) {
    const [state, setState] = useState(State.Login);
    const changeState = () => {
        if (state === State.Login) {
            setState(State.Register);
        } else {
            setState(State.Login);
        }
    };
    
    return <motion.div variants={upVariants} initial={'init'} animate={'show'} exit={'hide'} className={'layout'}>
        <div className="logreg">
            <div className="logregBlock">
                <h2>{state == State.Login ? "Вход" : "Регистрация"}</h2>
                {state == State.Login && <LoginForm/>}
                {state == State.Register && <RegisterForm/>}
                <button type={"button"} onClick={changeState}>{state == State.Login ? "Регистрация" : "Вход"}</button>
            </div>
        </div>
    </motion.div>
}

export default LoginPage;