import React, { useEffect, useState } from "react";
import Layout from './Layout';
import Welcome from "../components/Welcome";
import AppWidgetSummary from '../components/AppWidgetSummary';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import axios from 'axios';
import { Grid, Typography, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  useEffect(() => {
    dispatch(getMe());
    getUsers();
    getMaintenances();
  }, [dispatch]);

  useEffect(() => {
    if (isError) { navigate("/") }
  }, [isError, navigate]);

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  }

  const getMaintenances = async () => {
    const response = await axios.get('http://localhost:5000/maintenances');
    setMaintenances(response.data)
  }

  const userCount = users.length;
  const openCount = maintenances.filter((maintenance) => maintenance.status === 'Open').length;
  const closeCount = maintenances.filter((maintenance) => maintenance.status === 'Close').length;
  const underworkerCount = maintenances.filter((maintenance) => maintenance.status === 'Underworker').length;
  const openProblems = maintenances.filter((maintenance) => maintenance.status === 'Open' && maintenance.found_problems);

  return (
    <Layout>
      <section className="container" style={{ minHeight: "100vh" }} >
        <Typography variant="h5" >
          <Welcome />
        </Typography>
        <div className="row">
          <Grid container spacing={3} style={{display: "flex",alignItems: "space-between",justifyContent: "center"}}>
            <Grid item xs={6} md={3} >
              <div className='i'>
                <AppWidgetSummary title="Users" count={userCount} 
                style={{ boxShadow:'1px 1px', backgroundColor:"hsl(204, 50%, 90%)"}} 
                color="info" icon={'ion:people'} />
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <AppWidgetSummary title="Open" count={openCount} 
              style={{ boxShadow:'1px 1px', backgroundColor:"hsl(48, 50%, 90%)"}} 
              color="warning" icon={'ion:lock-open'} />
            </Grid>
            <Grid item xs={6} md={3}>
              <AppWidgetSummary title="Close" count={closeCount} 
              style={{ boxShadow:'1px 1px', backgroundColor:"hsl(141, 50%, 90%)"}} 
              color="success" icon={'ion:lock-closed'} />
            </Grid>
            <Grid item xs={6} md={3}>
              <AppWidgetSummary title="Underworker" count={underworkerCount} 
              style={{boxShadow:'1px 1px', backgroundColor:"hsl(348, 50%, 90%)"}} 
              color="error" icon={'ion:code-working'} />
            </Grid>
            <Grid item xs={6} md={12} style={{
              display: "flex",
              alignItems: "space-around",
              justifyContent: "center",
            }}>
              <Card style={{ padding: "10px" }}>
                <CardContent>
                  <Typography variant="h6" 
                  sx={{display: "flex",alignItems: "center",justifyContent: "center"}}>
                    Open Problems:
                  </Typography>
                  {openProblems.map((maintenance) => (
                    <Typography variant="p" color="text.secondary" >
                      <ul style={{ listStyleType: 'none' }}> 
                      <li >{maintenance.sim} has problems: {maintenance.found_problems}</li> </ul>
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;