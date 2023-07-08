import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {Typography} from '@mui/material';
const FormEditUser = () => {
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setPost(userData.post);
        setPhone(userData.phone);
        setConfPassword(userData.confPassword);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: name,
        post: post,
        phone: phone,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <section className="container" style={{ minHeight: "100vh",width:800 }}>
            <form onSubmit={updateUser}>
              <p className="has-text-centered">{msg}</p>
              <Typography variant="h3" component="h3" sx={{ textAlign: 'center',   }}>Update User</Typography>
              <div className="field">
                <label className="label"> Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name ||""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label"> Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email ||""}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Post</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={post ||""}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="Post"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={phone ||""}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label"> Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password ||""}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label"> Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confPassword ||""}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div className="field mt-5">
                <button className="button is-info is-fullwidth">
                  Update
                </button>
              </div>
            </form>

    </section>
  );
};

export default FormEditUser;