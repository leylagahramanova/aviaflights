import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
import { Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import { BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from "recharts";
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const options = [
  { value: 'Open', text: 'Open' },
  { value: 'Close', text: 'Close' },
  { value: 'Underworker', text: 'Underworker' }
];

const MainStat = () => {
  const { user } = useSelector((state) => state.auth);
  const [dates, setDates] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    dispatch(getMe());
    getMaintenances();
    getMainStats();
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const [mainstats, setMainStats] = useState([]);
  const getMainStats = async () => {
    const response = await axios.get('http://localhost:5000/maintenance-statistics');
    setMainStats(response.data)
}
  const getMaintenances = async () => {
    const response = await axios.get('http://localhost:5000/maintenances');
    setMaintenances(response.data);
  };

  let data = [
    { name: 'Airbus A-320', count: 0 },
    { name: 'Boeing 767/57', count: 0 },
    { name: "ATR-72", count: 0 },
    { name: "MI-8", count: 0 },
    { name: "AN-2", count: 0 },
    { name: "IL-76", count: 0 },
    { name: "Embraer ERJ-190", count: 0 }
  ];

  let statistics = {
    'Airbus A-320': 0,
    'Boeing 767/57': 0,
    'ATR-72': 0,
    'MI-8': 0,
    'AN-2': 0,
    'IL-76': 0,
    'Embraer ERJ-190': 0
  };

  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (value) => {
    setSelected(value);
  };

  maintenances.forEach((maintenance) => {
    const maintenanceDate = moment(maintenance.date).format('YYYY-DD-MM');
    const isInRange = dates.every((selectedDate) =>
      moment(selectedDate).isSame(maintenanceDate)
    );

    if (isInRange) {
      if (
        (selected === 'Open' && maintenance.status === 'Open') ||
        (selected === 'Close' && maintenance.status === 'Close') ||
        (selected === 'Underworker' && maintenance.status === 'Underworker')
      ) {
        if (maintenance.sim in statistics) {
          statistics[maintenance.sim]++;
        }
      }
    }
  });

  data = data.map((item) => ({
    ...item,
    count: statistics[item.name]
  }));

  return (
    <div className="container" style={{ minHeight: "100vh"}}>
      <div className="App">
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center' }} style={{ color: 'white' }}>
          Statistics of aviaflights with a problem by {user && user.name}
        </Typography>
        <div className="row" style={{ flexDirection: 'row' }}>
          <div style={{ margin: 20 }}>
            <RangePicker
              onChange={(values) => {
                setDates(values.map(item => moment(item).format('YYYY-DD-MM')));
              }}
            />
          </div>
          <div className="r" >
            <div className="sidebar">
              <select
                value={selected}
                onChange={(event) => handleChange(event.target.value)}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value} >
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <BarChart
          width={1250}
          height={340}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
      </div>
  );
};

export default MainStat;
