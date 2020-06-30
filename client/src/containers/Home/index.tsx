import React, { useEffect } from "react"
import {
    useSelector, useDispatch
} from 'react-redux'
import { get_users, get_userList } from '../../store/actions'

const Home = () => {
    const dispatch = useDispatch();

    const users = useSelector(state => state['user'].users);
    const userList = useSelector(state => state['user'].userList);

    useEffect(() => {
        dispatch(get_userList());
    })

    return (
        <>
            Home
        </>
    );
};

export default Home;