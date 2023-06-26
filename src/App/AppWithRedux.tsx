import React, {useCallback, useEffect} from 'react';
import './App.css';

import {TodoLists} from "../pages/todoLists/TodoLists";
import {Login} from "../pages/login/Login";
import {logOutThunk, meThunk} from "../state/auth-reducer/auth-reducer";

import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Routes, Route, Navigate} from "react-router-dom";

const { v4: uuidv4 } = require('uuid');


function AppWithRedux() {

    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()


    const logOut = () => {
        dispatch(logOutThunk())
    }

    useEffect(() => {
        dispatch(meThunk())
    }, [])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TodoList
                    </Typography>
                    {isLoggedIn && <Button onClick={logOut} color="inherit">Log Out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodoLists/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to='/404'/> } />
                </Routes>

            </Container>
            <CustomizedSnackbars/>
        </div>
    );
}

export default AppWithRedux;