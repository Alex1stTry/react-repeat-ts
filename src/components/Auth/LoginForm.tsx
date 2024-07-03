import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../interfaces";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../store";
import {useNavigate, useSearchParams} from "react-router-dom";

const LoginForm = () => {
    const {register, handleSubmit} = useForm<IAuth>()

    const {loginError} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const [params] = useSearchParams();
    const SessionExpired = params.get('SessionExpired')
    console.log(SessionExpired)


    const log: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        if (requestStatus === 'fulfilled') {
            nav('/cars')
        }
    }

    return (
        SessionExpired ?
            (
                <div>
                    <h1>SessionExpired , login again</h1>
                    <form onSubmit={handleSubmit(log)}>
                        {loginError && <div>{loginError}</div>
                        }
                        <input type="text" placeholder={'username'} {...register('username')}/>
                        <input type="text" placeholder={'password'} {...register('password')}/>
                        <button>Login</button>
                    </form>
                </div>
            )
            :
            (
                <form onSubmit={handleSubmit(log)}>
                    {loginError && <div>{loginError}</div>
                    }
                    <input type="text" placeholder={'username'} {...register('username')}/>
                    <input type="text" placeholder={'password'} {...register('password')}/>
                    <button>Login</button>
                </form>
            )
)
    ;
}

export {LoginForm};