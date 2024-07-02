import css from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {authService} from "../../services/authService";
import {authActions} from "../../store";

const Header = () => {
    const {currentUser} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const access = authService.getAccess()
    useEffect(() => {
        if (access && !currentUser) {
            dispatch(authActions.me())
        }
    }, [access, currentUser, dispatch]);
   console.log(currentUser)
    return (
        <div className={css.Header}>
            <div>Cars</div>
            {
                currentUser ?
                    (
                        <div className={css.Links}>
                            <h4>{currentUser.username}</h4>
                            <h5>{currentUser.last_login}</h5>
                        </div>
                    )
                    :
                    (
                        <div className={css.Links}>
                            <NavLink to={'login'}>Login</NavLink>
                            <NavLink to={'register'}>Register</NavLink>
                        </div>
                    )
            }

        </div>
    );
};

export {Header};