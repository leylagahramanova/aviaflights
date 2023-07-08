import React from "react";
import{ useSelector} from "react-redux";
import {Typography} from '@mui/material';
const Welcome=() =>{
const {user} = useSelector ((state) => state.auth) ;
return (
<div style={{
                      padding:"1vh" }}>

      <Typography variant="h3" sx={{ mb: 5 }}>
     <strong>Welcome back, {user && user.name}</strong>
      </Typography>
</div>)}
export default Welcome ;


      