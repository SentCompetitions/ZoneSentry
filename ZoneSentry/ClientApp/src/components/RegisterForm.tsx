import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {AuthService, LoginModel, RegisterModel} from "../api";
import { ValidationProblemDetails } from "../models/ValidationProblemDetails";
import {useAuth} from "./AuthProvider";

export interface Props {

}

function LoginForm(props: Props) {
    const auth = useAuth()
    const navigate = useNavigate()
    const [registerModel, setRegisterModel] = useState<RegisterModel>({email: "", password: "", username: "", fio: "", rePassword: ""});
    const [errors, setErrors] = useState<ValidationProblemDetails>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth.isAuthenticated) navigate("/", {replace: true})
    }, [auth.isAuthenticated])

    const setName = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterModel({...registerModel, fio: event.target.value});
    }

    const setUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterModel({...registerModel, username: event.target.value});
    }

    const setEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterModel({...registerModel, email: event.target.value});
    }

    const setPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterModel({...registerModel, password: event.target.value});
    }

    const setRePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setRegisterModel({...registerModel, rePassword: event.target.value});
    }

    const register = (event: FormEvent) => {
        event.preventDefault()
        if (!loading) {
            setLoading(true)
            if (auth.token) auth.setToken(null)
            AuthService.postApiAuthRegister(registerModel).then(() => {
                AuthService.postApiAuthLogin(registerModel).then(response => {
                    auth.setToken(response.token);
                }).catch(error => {
                    setErrors(JSON.parse(error.body));
                    setLoading(false)
                });
            }).catch((error) => {
                setErrors(JSON.parse(error.body));
                setLoading(false)
            })
        }
    }

    return <form onSubmit={register}>
        {errors && <div>{Object.entries(errors.errors).map((([f, e]) => e.map(e => <p>{e}</p>)))}</div>}
            <input onChange={setName} value={registerModel.fio} placeholder={"ФИО"} name="name" required/>
            <input onChange={setUsername} value={registerModel.username} placeholder={"Логин"} name="username" required/>
            <input onChange={setEmail} value={registerModel.email} placeholder={"Почта"} type={"email"} required/>
            <input onChange={setPassword} value={registerModel.password} placeholder={"Пароль"} type={"password"} required autoComplete={"new-password"}/>
            <input onChange={setRePassword} value={registerModel.rePassword} placeholder={"Повторите пароль"} type={"password"} required autoComplete={"none"}/>
            <button disabled={loading} type={"submit"}>Зарегистрироваться</button>
    </form>
}

export default LoginForm;