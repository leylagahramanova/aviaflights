import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddMaintenance from "../components/FormAddMaintenance";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
const AddMaintenance = () => {
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
            <FormAddMaintenance />
        </Layout>)
}
export default AddMaintenance;