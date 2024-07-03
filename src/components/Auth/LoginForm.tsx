import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../interfaces";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {authActions} from "../../store";
import css from './form.module.css'


const LoginForm = () => {
    const {register, handleSubmit} = useForm<IAuth>()

    const {loginError} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const [params] = useSearchParams();
    const {state} = useAppLocation<{ pathname: string }>()
    const SessionExpired = params.get('Session_Expired')



    const log: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        if (requestStatus === 'fulfilled') {
            nav(state?.pathname ||'/cars')
        }
    }

    return (
        SessionExpired ?
            (
                <div>
                    <h1 style={{textAlign:"center"}}>SessionExpired , login again</h1>
                    <form className={css.Form} onSubmit={handleSubmit(log)}>
                        <TextField label="Username" variant="filled" {...register('username')}/>
                        <TextField label="Password" variant="filled" {...register('password')}/>
                        <Button variant="contained" type="submit">Login</Button>
                        {loginError && <div>{loginError}</div>}
                    </form>
                </div>
            )
            :
            (
                <form className={css.Form} onSubmit={handleSubmit(log)}>
                    <TextField label="Username" variant="filled" {...register('username')}/>
                    <TextField label="Password" variant="filled" {...register('password')}/>
                    <Button variant="contained" type="submit">Login</Button>
                    {loginError && <div>{loginError}</div>}
                </form>
            )
)
    ;
}

export {LoginForm};