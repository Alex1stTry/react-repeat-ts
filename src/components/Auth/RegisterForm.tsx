import {SubmitHandler, useForm} from "react-hook-form";

import {IAuth} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {userValidator} from "../../validators";
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {authActions} from "../../store";
import {useNavigate} from "react-router-dom";

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
            <form onSubmit={handleSubmit(reg)}>
                {registerError && <div>{registerError}</div>}
                <input type="text" placeholder={'username'} {...register('username')}/>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <button disabled={!isValid}>Register</button>
                {errors.username && <div>{errors.username.message}</div>}
                {errors.password && <div>{errors.password.message}</div>}
            </form>
        );
}

export {RegisterForm};