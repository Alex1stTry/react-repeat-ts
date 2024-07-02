import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth, IUser} from "../../interfaces";
import {joiResolver} from "@hookform/resolvers/joi";
import {userValidator} from "../../validators";
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {authActions} from "../../store";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const {register, handleSubmit} = useForm<IAuth>()

    const {loginError} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const {state} = useAppLocation<{ pathname: string }>();

    const log: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        if (requestStatus === 'fulfilled') {
            nav(state?.pathname && '/cars')
        }
    }

    return (
        <form onSubmit={handleSubmit(log)}>
            {loginError && <div>{loginError}</div>}
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Login</button>
        </form>
    );
}

export {LoginForm};