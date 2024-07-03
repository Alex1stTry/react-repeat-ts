import css from './Header.module.css'
import { AppBar, Box, Button, ButtonGroup, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { authService } from "../../services/authService";
import { authActions } from "../../store";

const Header = () => {
    const nav = useNavigate();
    const { currentUser } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const access = authService.getAccess();

    useEffect(() => {
        if (access && !currentUser) {
            dispatch(authActions.me());
        }
    }, [access, currentUser, dispatch]);

    const formatDate = (date:string) => {
        return new Date(date).toLocaleDateString(undefined);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative">
                <Toolbar sx={{ height: '140px' }}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Cars
                    </Typography>
                    {currentUser ? (
                        <div className={css.Links}>
                            <Typography variant="h5">Username: {currentUser.username}</Typography>
                            <Typography variant="subtitle1">Last Login: {formatDate(currentUser.last_login)}</Typography>
                        </div>
                    ) : (
                        <ButtonGroup className={css.Buttons} orientation="vertical">
                            <Button onClick={() => nav('/login')} variant="contained">Login</Button>
                            <Button onClick={() => nav('/register')} variant="contained">Register</Button>
                        </ButtonGroup>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export { Header };
