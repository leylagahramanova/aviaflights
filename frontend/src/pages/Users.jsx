import React, { useEffect, useMemo, useState, useCallback } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
import { Box, Tooltip, Typography, IconButton } from '@mui/material';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    };
  
    const deleteUser = useCallback(async (userId) => {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      getUsers();
    }, []);
  
    const [pageSize, setPageSize] = useState(5);
  
    const rows = useMemo(() => {
      return users.map((user, index) => ({
        id: index + 1,
        uuid: user.uuid,
        name: user.name,
        post: user.post,
        phone: user.phone,
        email: user.email,
      }));
    }, [users]);
  
    const columns = useMemo(
      () => [
        { field: "id", headerName: "ID", width: 30 },
        {
          field: "name",
          headerName: "Name",
          width: 150,
          renderCell: (params) => {
            const user = params.row;
            return (
              <Link to={`/user/${user.uuid}`}>
                {params.value}
              </Link>
            );
          },
        },
        { field: "post", headerName: "Post", width: 130 },
        { field: "phone", headerName: "Phone", width: 150 },
        { field: "email", headerName: "Email", width: 250 },
        {
          field: "actions",
          headerName: "Actions",
          width: 120,
          renderCell: (params) => {
            const user = params.row;
            if (!user) return null;
            return (
              <>
                <Tooltip title="Edit this user">
                  <IconButton onClick={() => { }}>
                    <Link to={`/users/edit/${user.uuid}`}><Edit /></Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete this user">
                  <IconButton onClick={() => deleteUser(user.uuid)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </>
            );
          },
        },
      ],
      [deleteUser]
    );
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      if (isError) { navigate("/") }
      if (user && user.post !== "admin") { navigate("/dashboard"); }
    }, [isError, user, navigate]);
    return (
        <Layout>
           <div className="container" style={{ minHeight: "100vh" }}>
            <Typography variant="h3" component="h3" sx={{ textAlign: 'center', }}>
                Users
            </Typography>
            <Box sx={{ height: 400, width: '100%', fontweight: 'bold', color: "grey", fontSize: "120px", }}>
                <DataGrid
                    sx={{border: '1px solid',m: 2,boxShadow: 5,backgroundColor: "white"}}
                    columns={columns}
                    rows={rows}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                />
            </Box>
            <br></br>
            <Link to="/users/add" className="button is-info is-rounded mb-2 " >Add New</Link>
        </div>
        </Layout>)
}
export default Users;

