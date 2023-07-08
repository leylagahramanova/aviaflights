import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from './Layout';
import { getMe } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
import { Tooltip, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from "recharts";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import './date.css';

const moment = extendMoment(originalMoment);

const aviaflights = [
  'Airbus A-320',
  'Boeing 767/57',
  'ATR-72',
  'MI-8',
  'AN-2',
  'IL-76',
  'Embraer ERJ-190'
];

const statuses = [
  { value: 'Open', text: 'Open' },
  { value: 'Close', text: 'Close' },
  { value: 'Underworker', text: 'Underworker' }
];

const UserStats = () => {
  const [users, setUsers] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [maintenances, setMaintenances] = useState([]);
  const [selectedAviaflight, setSelectedAviaflight] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [activeUser, setActiveUser] = useState(null);
  const [passiveUser, setPassiveUser] = useState(null);
  useEffect(() => {
    dispatch(getMe());
    getMaintenances();
    getUsers();
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaintenances = async () => {
    try {
      const response = await axios.get('http://localhost:5000/maintenances');
      setMaintenances(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAviaflight = (value) => {
    setSelectedAviaflight(value);
  };

  const handleChangeUser = (value) => {
    setSelectedUser(value);
  };

  const filteredMaintenances = maintenances.filter((maintenance) => {
    const maintenanceDate = moment(maintenance.date).format('YYYY-MM-DD');
    const isInRange =
      selectedRange === null ||
      (moment(maintenanceDate).isSameOrAfter(selectedRange.start, 'day') &&
        moment(maintenanceDate).isSameOrBefore(selectedRange.end, 'day'));

    return (
      statuses.map((status) => status.value).includes(maintenance.status) &&
      (selectedAviaflight === '' || maintenance.sim === selectedAviaflight) &&
      (selectedUser === '' || maintenance.user.name === selectedUser) &&
      isInRange
    );
  });

  const generateChartData = () => {
    const counts = {};

    filteredMaintenances.forEach((maintenance) => {
      if (counts[maintenance.status] === undefined) {
        counts[maintenance.status] = 0;
      }
      counts[maintenance.status]++;
    });

    const data = Object.keys(counts).map((status) => ({
      status,
      problems: counts[status]
    }));

    return data;
  };
  const [selectedOption, setSelectedOption] = useState("");
  const handleDateRangeChange = (value) => {
    if (value === "1 year") {
      setSelectedRange(moment.range(moment().clone().subtract(1, "year"), moment().clone()));
    } else if (value === "1 week") {
      setSelectedRange(moment.range(moment().clone().subtract(1, "week"), moment().clone()));
    } else if (value === "2 weeks") {
      setSelectedRange(moment.range(moment().clone().subtract(2, "weeks"), moment().clone()));
    } else if (value === "1 month") {
      setSelectedRange(moment.range(moment().clone().subtract(1, "month"), moment().clone()));
    } else if (value === "3 months") {
      setSelectedRange(moment.range(moment().clone().subtract(3, "months"), moment().clone()));
    } else {
      setSelectedRange(value);
    }
    setSelectedOption(value);
  };

  const data = generateChartData();
  const findActiveUser = useCallback(() => {
    const activeUserStats = {};
    filteredMaintenances.forEach((maintenance) => {
      if (maintenance.status === 'Close') {
        if (activeUserStats[maintenance.user.name] === undefined) {
          activeUserStats[maintenance.user.name] = 0;
        }
        activeUserStats[maintenance.user.name]++;
      }
    });

    let maxCount = 0;
    let activeUser = null;

    for (const user in activeUserStats) {
      if (activeUserStats[user] > maxCount) {
        maxCount = activeUserStats[user];
        activeUser = user;
      }
    }

    setActiveUser(activeUser);
  }, [filteredMaintenances]);

  const findPassiveUser = useCallback(() => {
    const passiveUserStats = {};
    filteredMaintenances.forEach((maintenance) => {
      if (maintenance.status === 'Open') {
        if (passiveUserStats[maintenance.user.name] === undefined) {
          passiveUserStats[maintenance.user.name] = { open: 0, close: 0 };
        }
        passiveUserStats[maintenance.user.name].open++;
      } else if (maintenance.status === 'Close') {
        if (passiveUserStats[maintenance.user.name] === undefined) {
          passiveUserStats[maintenance.user.name] = { open: 0, close: 0 };
        }
        passiveUserStats[maintenance.user.name].close++;
      }
    });

    let maxOpenCount = 0;
    let maxCloseCount = 0;
    let passiveUser = null;

    for (const user in passiveUserStats) {
      const { open, close } = passiveUserStats[user];
      if (
        (open > maxOpenCount || (open === maxOpenCount && close > maxCloseCount)) &&
        user !== activeUser
      ) {
        maxOpenCount = open;
        maxCloseCount = close;
        passiveUser = user;
      }
    }

    setPassiveUser(passiveUser);
  }, [filteredMaintenances, activeUser]);

  useEffect(() => {
    findActiveUser();
    findPassiveUser();
  }, [filteredMaintenances, findActiveUser, findPassiveUser]);

  return (
    <Layout>
      <div className="container" style={{ minHeight: "100vh" }}>
      <div className="App">
        <Typography variant="h3" component="h3">
          User Statistics
        </Typography>
        <div className="cow" style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="r" style={{ marginRight: "auto" }}>
            <div className="sir">
              <select value={selectedAviaflight}
                onChange={(event) => handleChangeAviaflight(event.target.value)}
              > <option value="">All Aviaflights</option>
                {aviaflights.map((aviaflight) => (
                  <option key={aviaflight} value={aviaflight}>
                    {aviaflight} </option>  ))}
              </select>
              </div>
              <div style={{margin: 20}}></div>
              <div className="mir"> <select  value={selectedUser}
                onChange={(event) => handleChangeUser(event.target.value)}
              > <option value="">All Users</option>
                {users.map((user, index) => (
                  <option key={index} value={user.name}>
                    {user.name} </option>  ))}
              </select>
            </div>
            <div style={{margin: 20}}></div>
            <div className="filter-date">
              <select value={selectedOption} onChange={(e) => handleDateRangeChange(e.target.value)}>
                <option value="">Select Date </option>
                <option value="1 year">1 Year</option>
                <option value="1 week">1 Week</option>
                <option value="2 weeks">2 Weeks</option>
                <option value="1 month">1 Month</option>
                <option value="3 months">3 Months</option>
              </select>
            </div>
            <div style={{margin: 5}}></div>
            <DateRangePicker value={selectedRange} onSelect={handleDateRangeChange} /></div>
        <div className="chart-container" style={{ marginRight: "auto" }}>
          <BarChart width={800} height={400} data={data} margin={{
            top: 5, right: 30, left: 30,  bottom: 5,
          }} barSize={70}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis tickFormatter={(value) => Number.isInteger(value) ? value : ''} />
            <Tooltip />  <Legend /> <Bar dataKey="problems" fill="#8884d8" />
          </BarChart>
          </div>
        </div>
        <div style={{ margin: 20, display: "flex", alignItems: "center", justifyContent: "center",}}>
  {activeUser && ( <Card style={{ margin: "0 10px" }}>
      <CardContent>
        <Typography variant="h6">Active User with the Most Close Status:</Typography>
        <Typography variant="p" color="text.secondary">{activeUser}</Typography>
      </CardContent>
    </Card>
  )}
  {passiveUser && (
    <Card style={{ margin: "0 10px" }}>
      <CardContent>
        <Typography variant="h6">Passive User with the Most Open Status:</Typography>
        <Typography variant="p" color="text.secondary">{passiveUser}</Typography>
      </CardContent>
    </Card>
  )}
</div>
      </div>
    </div>
    </Layout >
  );
};

export default UserStats;