import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";

const FormEditMaintenance = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState('');
  const [sim, setSIM] = useState('');
  const [found_problems, setFoundproblems] = useState('');
  const [how_to_fix, setHowtofix] = useState('');
  const [status, setStatus] = useState('');
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getMaintenanceById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/maintenances/${id}`);
        const maintenanceData = response.data;
      setName(maintenanceData.name);
        setDate(maintenanceData.date);
         setSIM(maintenanceData.sim);
       setFoundproblems(maintenanceData.found_problems);
      setHowtofix(maintenanceData.how_to_fix);
      setStatus(maintenanceData.status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg)
        }
      }
    };

    getMaintenanceById();
  }, [id]);

  const updateMaintenance = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/maintenances/${id}`, {
        name: name,  
      date: date,
        sim: sim,
        found_problems: found_problems,
        how_to_fix: how_to_fix,
        status: status
      });
      navigate("/maintenances");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="container" style={{ minHeight: "100vh",width:800 }}>
      <form onSubmit={updateMaintenance}>
        <p className="has-text-centered">{msg}</p>
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center' }}>Edit Maintenance</Typography>
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
          <label className="label">Date</label>
          <div className="control">
            <input
              type="date"
              className="input"
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">SIM</label>
          <div className="control">
            <select
              type="text"
              id="types"
              className="input"
              value={sim || ""}
              onChange={(e) => setSIM(e.target.value)}
              placeholder="SIM"
            >
              <option value="Choose option">Choose option</option>
              <option value="Airbus A-320">Airbus A-320</option>
              <option value="Boeing 767/57">Boeing 767/57</option>
              <option value="ATR-72">ATR-72</option>
              <option value="MI-8">MI-8</option>
              <option value="AN-2">AN-2</option>
              <option value="IL-76">IL-76</option>
              <option value="Embraer ERJ-190">Embraer ERJ-190</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Found problems</label>
          <div className="control">
            <textarea id="fixTextarea"
                    type="textarea"
                    className="textarea"
              value={found_problems || ""}
              onChange={(e) => setFoundproblems(e.target.value)}
              placeholder="Found problems"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">How to fix</label>
          <div className="control">
            <textarea id="fixTextarea"
                    type="textarea"
                    className="textarea"
              value={how_to_fix || ""}
              onChange={(e) => setHowtofix(e.target.value)}
              placeholder="How to fix"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Status</label>
          <div className="control">
            <select
              type="text"
              id="types"
              className="input"
              value={status || ""}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
            >
              <option value="Choose option">Choose option</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
              <option value="Underworker">Underworker</option>
            </select>
          </div>
        </div>
        <div className="field mt-5">
          <button className="button is-info is-fullwidth">Update</button>
        </div>
      </form>
    </section>
  );
};

export default FormEditMaintenance;