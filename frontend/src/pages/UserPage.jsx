import React, { useEffect, useState,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getMe } from "../features/authSlice";
import axios from 'axios';
import { Tooltip, Typography } from '@mui/material';
import { BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from "recharts";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import Layout from './Layout';

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

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);
  const [maintenances, setMaintenances] = useState([]);
  const [selectedAviaflight, setSelectedAviaflight] = useState('');


  const getUser = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    if (isError) {
      // Handle error, e.g., navigate to a login page
    }
  }, [isError]);

  const getMaintenances = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/maintenances?user=${id}`);
      setMaintenances(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    dispatch(getMe());
    getUser();
    getMaintenances();
  }, [dispatch, getUser, getMaintenances]);
  const handleChangeAviaflight = (value) => {
    setSelectedAviaflight(value);
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

      isInRange
    );
  });

  const generateChartData = () => {
    if (!user || !maintenances) return [];

    const userMaintenances = filteredMaintenances.filter(
      (maintenance) => maintenance.name === user.name
    );
    const counts = {};

    userMaintenances.forEach((maintenance) => {
      if (counts[maintenance.status] === undefined) {
        counts[maintenance.status] = 0;
      }
      counts[maintenance.status]++;
    });

    const data = Object.keys(counts).map((status) => ({
      status,
      problems: counts[status],
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

  return (
<Layout>
  {user && (
    <div className="container" style={{ minHeight: "100vh"}}>
      <div className="App">
        <Typography variant="h3" component="h3">
          User Statistics: {user.name}
        </Typography>
        <div className="cow" style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="r" style={{ marginRight: "auto" }}>
            <div className="sidebar">
              <select
                value={selectedAviaflight}
                onChange={(event) => handleChangeAviaflight(event.target.value)}
              >
                <option value="">All Aviaflights</option>
                {aviaflights.map((aviaflight) => (
                  <option key={aviaflight} value={aviaflight}>
                    {aviaflight}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ margin: 20 }}></div>
            <div className="filter-date">
              <select value={selectedOption} onChange={(e) => handleDateRangeChange(e.target.value)}>
                <option value="">Select Date Range</option>
                <option value="1 year">1 Year</option>
                <option value="1 week">1 Week</option>
                <option value="2 weeks">2 Weeks</option>
                <option value="1 month">1 Month</option>
                <option value="3 months">3 Months</option>
              </select>
            </div>
            <div style={{ margin: 5 }}></div>
            <DateRangePicker value={selectedRange} onSelect={handleDateRangeChange} />
          </div>
          <div className="chart-container" style={{ marginRight: "auto" }}>
            <BarChart
              width={800}
              height={400}
              data={data}
              margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
              barSize={70}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis tickFormatter={(value) => (Number.isInteger(value) ? value : "")} />
              <Tooltip />
              <Legend />
              <Bar dataKey="problems" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  )}
</Layout>

  );
};

export default UserPage;