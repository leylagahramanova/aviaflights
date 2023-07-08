import React, { useEffect } from "react";
import Layout from "./Layout";
import Maintenancelist from "../components/Maintenancelist";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
const Maintenances = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);
    useEffect(() => {
        if (isError) { navigate("/") }
    }, [isError, navigate]);
    return (
        <Layout>
            <Maintenancelist /> 
        </Layout>)
}
export default Maintenances;