import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";

import {IAuth} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {userValidator} from "../../validators";
import {useAppDispatch,useAppSelector} from "../../hooks";
import {authActions} from "../../store";
import css from'./form.module.css'


const RegisterForm = () => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    const {registerError} = useAppSelector(state=> state.auth);
    const {register, formState: {errors, isValid}, handleSubmit} = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(userValidator)
    });


    const reg: SubmitHandler<IAuth> = async (user) => {
        const {meta:{requestStatus}} = await dispatch(authActions.register({user}));

        if (requestStatus === 'fulfilled'){
            nav('/login')
        }
    }
        return (
            <form className={css.Form} onSubmit={handleSubmit(reg)}>
                {registerError && <div>{registerError}</div>}
                <TextField label="Username" variant="filled" {...register('username')}/>
                <TextField label="Password" variant="filled" {...register('password')}/>
                <Button variant="contained" disabled={!isValid} type="submit">Register</Button>
                {errors.username && <div>{errors.username.message}</div>}
                {errors.password && <div>{errors.password.message}</div>}
            </form>
        );
}

export {RegisterForm};