import {FC, PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {authService} from "../services/authService";
import {useAppLocation} from "../hooks";

interface IProps extends PropsWithChildren {

}

const AuthRequired: FC<IProps> = ({children}) => {

    const nav = useNavigate();

    const access = authService.getAccess();
    
    const {pathname} = useAppLocation();


    useEffect(() => {
        if (!access) {
            nav('/login',{state:{pathname}})
        }
    }, [access]);

    return (
        <div>
            {children}
        </div>
    );
};

export {AuthRequired};