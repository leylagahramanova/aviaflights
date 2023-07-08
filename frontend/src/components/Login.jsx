import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Form } from 'react-bootstrap';
import { GiAirplaneDeparture } from "react-icons/gi";
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth);
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  }

  return (
    <section className="hero is-fullheight is-fullwidth" style={{backgroundColor:"#b2c8dc"}}>
      <div className="hero-body">
        <div className="container">
          <div className="row w-0 mx-0">
            <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <form onSubmit={Auth} className="box" style={{pading:'0px', margin:'0px'}}>
                <div className="logo">
                <Typography variant="h5" noWrap component="div" style={{color:'#9db3c7', paddingBottom:"10px"}}><IconButton><GiAirplaneDeparture/></IconButton>
              Avia Flights
            </Typography>
                </div>
                <h2 >Hello! let's get started</h2>
                <h3 className="hero font-weight-light">Log in to continue.</h3>
                {isError && <p className="has-text-centered">{message}</p>}
                <div className="field mt-5">
                  <div className="controls">
                    <input type="email" className="input" placeholder="Email" value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <div className="controls">
                    <input type="password" className="input" placeholder="Password" value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <button type="submit" className="button is-link is-fullwidth">
                    {isLoading ? "Loading..." : "Login"}</button>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    //   <div>
    //         <section className="hero is-info is-fullheight is-fullwidth">
    //   <div className="d-flex align-items-center auth px-0">
    //     <div className="row w-100 mx-0">
    //       <div className="col-lg-4 mx-auto">
    //         <div className="auth-form-light text-left py-5 px-4 px-sm-5">
    //           <div className="brand-logo">

    //           </div>
    //           <h4>Hello! let's get started</h4>
    //           <h6 className="font-weight-light">Sign in to continue.</h6>
    //           <Form onSubmit={Auth} className="pt-3">
    //           {isError && <p className="has-text-centered">{message}</p>}
    //             <Form.Group className="d-flex search-field">
    //               <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} size="lg" className="h-auto" />
    //             </Form.Group>
    //             <Form.Group className="d-flex search-field">
    //               <Form.Control type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} size="lg" className="h-auto" />
    //             </Form.Group>
    //             <div className="mt-3">
    //               <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">{isLoading? "Loading...":"Login"}</Link>
    //             </div>
    //           </Form>
    //         </div>
    //       </div>
    //     </div>
    //   </div> 
    //   </section> 
    // </div>

  )
}

export default Login