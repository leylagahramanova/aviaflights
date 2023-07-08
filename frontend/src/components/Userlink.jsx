// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import {  Tooltip } from '@mui/material';
// import { BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, } from "recharts";
// import { DatePicker } from 'antd';
// import moment from 'moment';
// const { RangePicker } = DatePicker
// const options = [
//   { value: 'Open', text: 'Open' },
//   { value: 'Close', text: 'Close' },
//   { value: 'Underworker', text: 'Underworker' }
// ];
// const Userlink = () => {
//     const { userId } = useParams();
//     const [users, setUsers] = useState([]);
//     const [maintenances, setMaintenances] = useState([]);
//     const [dates, setDates] = useState([]);
//     const getUsers = async () => {
//         const response = await axios.get(`http://localhost:5000/users/${userId}`);
//         setUsers(response.data)
//     }
    
//     const getMaintenances = async () => {
//         const response = await axios.get('http://localhost:5000/maintenances');
//         setMaintenances(response.data)
//       }
//       let data = [
//         { name: 'Airbus A-320', count: 0 },
//         { name: 'Boeing 767/57', count: 0 },
//         { name: "ATR-72", count: 0 },
//         { name: "MI-8", count: 0 },
//         { name: "AN-2", count: 0 },
//         { name: "IL-76", count: 0 },
//         { name: "Embraer ERJ-190", count: 0 }
//       ];
    
//       let AirbusA320_Count = 0; let Boeing767_57_Count = 0;
//       let ATR72_Count = 0; let MI8_Count = 0;
//       let AN2_Count = 0; let IL76_Count = 0;
//       let EmbraerERJ190_Count = 0;
//       const [selected, setSelected] = useState(options[0].value);
    
//       const handleChange = (event) => {
//         console.log(event.target.value);
//         setSelected(event.target.value);
//       };
//       maintenances.forEach((maintenance) => {
//         const maintenanceDate = moment(maintenance.date).format('YYYY-DD-MM');
//         const isInRange = dates.every((selectedDate) =>
//           moment(selectedDate).isSame(maintenanceDate)
//         );
      
//         if (isInRange) {
//           if (
//             (selected === 'Open' && maintenance.status === 'Open') ||
//             (selected === 'Close' && maintenance.status === 'Close') ||
//             (selected === 'Underworker' && maintenance.status === 'Underworker')
//           ) {
//             switch (maintenance.sim) {
//               case 'Airbus A-320':
//                 AirbusA320_Count++;
//                 break;
//               case 'Boeing 767/57':
//                 Boeing767_57_Count++;
//                 break;
//               case 'ATR-72':
//                 ATR72_Count++;
//                 break;
//               case 'MI-8':
//                 MI8_Count++;
//                 break;
//               case 'AN-2':
//                 AN2_Count++;
//                 break;
//               case 'IL-76':
//                 IL76_Count++;
//                 break;
//               case 'Embraer ERJ-190':
//                 EmbraerERJ190_Count++;
//                 break;
//               default:
//                 break;
//             }
//           }
//         }
//       });
//       data[0].count = AirbusA320_Count;
//       data[1].count = Boeing767_57_Count;
//       data[2].count = ATR72_Count;
//       data[3].count = MI8_Count;
//       data[4].count = AN2_Count;
//       data[5].count = IL76_Count;
//       data[6].count = EmbraerERJ190_Count; 
//     return (
//         <div>
//             <div className="App">
//           <div style={{ margin: 20 }}>
//             < RangePicker
//               onChange={(values) => {

//                 setDates(values.map(item => {
//                   return moment(item).format('YYYY-DD-MM')
//                 }))
//               }}

//             />
//           </div>
//           <div className="row">
//             <div className="sidebar">
//               <select value={selected} onChange={handleChange} style={{
//     border: '0',
//     borderRadius: '10px',
//     fontSize: '18px',
//     padding: '15px',
//     height: '30px',
//     width: '300px'}}>
//                 {options.map((option) => (
//                   <option key={option.value} value={option.value} >
//                     {option.text}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <BarChart
//             width={1100}
//             height={340}
//             data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 80,
//               bottom: 5,
//             }}
//             barSize={20}
//           >
//             <XAxis
//               dataKey="name"
//               scale="point"
//               padding={{ left: 10, right: 10 }}
//             />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <CartesianGrid strokeDasharray="3 3" />
//             <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} />
//           </BarChart>
//         </div>
//       </div>
//     );
// };
// export default Userlink
