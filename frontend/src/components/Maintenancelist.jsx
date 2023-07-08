import React, { useEffect, useMemo, useState } from "react";
import { Box, Tooltip, Typography, IconButton} from '@mui/material';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from "react-router-dom";

const Maintenancelist = () => {
    const [maintenances, setMaintenances] = useState([]);
    useEffect(() => {
        getMaintenances();
    }, []);
    const getMaintenances = async () => {
        const response = await axios.get('http://localhost:5000/maintenances');
        setMaintenances(response.data)
    }
    const deleteMaintenance = async (maintenanceId) => {
        await axios.delete(`http://localhost:5000/maintenances/${maintenanceId}`);
        getMaintenances();
    }; 
    const [pageSize, setPageSize] = useState(5);
    const rows = maintenances && maintenances.map((maintenance, index) => ({
        id: index + 1,
         uuid: maintenance.uuid,
    name: maintenance.name,
    date: maintenance.date,
    sim: maintenance.sim,
    found_problems: maintenance.found_problems,
    how_to_fix: maintenance.how_to_fix,
    status: maintenance.status,
    }));

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 30 },
      {
        field: "name",
        headerName: "Name",
        width: 200,
      },
      {
        field: "date",
        headerName: "Date",
        width: 100,
        editable: true,
      },
      {
        field: "sim",
        headerName: "SIM",
        width: 150,
      },
      
      {
        field: "found_problems",
        headerName: "Found Problems",
        width: 200,
        editable: true,
        type: "string", // Set the type to "string"
        renderCell: (params) => (
          <textarea
          value={params.value}
          onChange={(event) =>
            params.api.setEditCellProps({
              id: params.id,
              field: params.field,
              props: {
                value: event.target.value,
              },
            })
          }
          style={{
            height: "100%",
            backgroundColor: "transparent",
            color: "inherit",
            resize: "none", // Prevent resizing of the textarea
            border: "none", // Remove border
            fontFamily: "inherit", // Use the same font as the rest of the table
            fontSize: "inherit", // Use the same font size as the rest of the table
          }}
          rows={4} // Set the desired number of rows for multiline input
        />
        ),
      },
      {
        field: "how_to_fix",
        headerName: "How to Fix",
        width: 200,
        editable: true,
        // Set the type to "string"
        renderCell: (params) => (
          <textarea
            value={params.value}
            onChange={(event) =>
              params.api.setEditCellProps({
                id: params.id,
                field: params.field,
                props: {
                  value: event.target.value,
                },
              })
            }
            style={{
              height: "100%",
              backgroundColor: "transparent",
              color: "inherit",
              resize: "none", // Prevent resizing of the textarea
              border: "none", // Remove border
              padding: "0", // Remove padding
              margin: "0", // Remove margin
              fontFamily: "inherit", // Use the same font as the rest of the table
              fontSize: "inherit", // Use the same font size as the rest of the table
            }}
            rows={4} // Set the desired number of rows for multiline input
          />
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 115, editable: true,
      },
            {
                field: "actions",
                headerName: "Actions",
                width: 100,
                renderCell: (params) => {
                    const maintenance = params.row;
                    if (!maintenance) return null;
                    return (
                        <>
                            <Tooltip title="Edit this maintenance">
                               <IconButton onClick={() => { }}>
                                    <Link to={`/maintenances/edit/${maintenance.uuid}`}><Edit /></Link>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete this maintenance">
                                <IconButton onClick={() => deleteMaintenance(maintenance.uuid)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </>
                    );
                },
            },
        ],
        []
    );
    return (

        <div className="container" style={{ minHeight: "100vh" }} >
            <Typography variant="h3" component="h3" sx={{ textAlign: 'center',   }}>
                Maintenances
            </Typography>
            <Box sx={{ height: 415, width: '100%', fontweight:'bold', color:"grey" , fontSize:"120px",   }}>
            <DataGrid 
  sx={{
    border: '1px solid',
    m: 2,
    boxShadow: 5,
    backgroundColor: "white"

  }}
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
            <Link to="/maintenances/add" className="button is-info is-rounded mb-2 " >Add New</Link>

        </div>
    );
};
export default Maintenancelist;

//import React, { useEffect, useMemo, useState } from "react";
// import { Box, Tooltip, Typography, IconButton, Select, MenuItem, TextField, Button } from '@mui/material';
// import axios from "axios";
// import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
// import { Delete, Edit, Save, Cancel, ArrowDropDown as DownArrow } from '@mui/icons-material';
// import { Link, useParams } from "react-router-dom";
// import { CSVLink } from "react-csv";
// const Maintenancelist = () => {
//   const [maintenances, setMaintenances] = useState([]);
//   const [editRowId, setEditRowId] = useState(null);
  
//   const { id } = useParams();

//   useEffect(() => {
//     const getMaintenanceById = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/maintenances/${id}`);
//         setMaintenances([response.data]);
//       } catch (error) {
//         if (error.response) {
//           console.log(error.response.data.msg);
//         }
//       }
//     };
//     getMaintenanceById();
//   }, [id]);

//   useEffect(() => {
//     getMaintenances();
//   }, []);

//   const getMaintenances = async () => {
//     const response = await axios.get('http://localhost:5000/maintenances');
//     setMaintenances(response.data);
//   };

//   const updateMaintenance = async (maintenance) => {
//     try {
//       await axios.patch(`http://localhost:5000/maintenances/${maintenance.uuid}`, maintenance);
//       getMaintenances();
//     } catch (error) {
//       if (error.response) {
//         console.error(error.response.data.msg);
//       }
//     }
//   };

//   const deleteMaintenance = async (maintenanceId) => {
//     await axios.delete(`http://localhost:5000/maintenances/${maintenanceId}`);
//     getMaintenances();
//   };

//   const handleEditClick = (rowId) => {
//     setEditRowId(rowId);
//   };

//   const handleSaveClick = async (maintenanceId) => {
//     const maintenance = maintenances.find((maintenance) => maintenance.uuid === maintenanceId);
//     setEditRowId(null);
//     updateMaintenance(maintenance);
//   };
//   const handleCancelClick = () => {
//     setEditRowId(null);
//   };


//   const handleDateChange = (uuid, value) => {
//     setMaintenances((prevRows) =>
//       prevRows.map((maintenance) => (maintenance.uuid === uuid ? { ...maintenance, date: value } : maintenance))
//     );
//   };

//   const handleSIMChange = (uuid, value) => {
//     setMaintenances((prevRows) =>
//       prevRows.map((maintenance) => (maintenance.uuid === uuid ? { ...maintenance, sim: value } : maintenance))
//     );
//   };

//   const handleTypeChange = (uuid, value) => {
//     setMaintenances((prevRows) =>
//       prevRows.map((maintenance) => (maintenance.uuid === uuid ? { ...maintenance, type: value } : maintenance))
//     );
//   };
//   const handleFoundProblemsChange = (uuid, value) => {
//     setMaintenances((prevRows) =>
//       prevRows.map((maintenance) => (maintenance.uuid === uuid ? { ...maintenance, found_problems: value } : maintenance))
//     );
//   };

//   const handleHowToFixChange = (uuid, value) => {
//     setMaintenances((prevRows) =>
//       prevRows.map((maintenance) => (maintenance.uuid === uuid ? { ...maintenance, how_to_fix: value } : maintenance))
//     );
//   };

//   const handleStatusChange = (uuid, value) => {
//     setMaintenances((prevRows) =>
//     prevRows.map((maintenance) => (maintenance.uuid === uuid ? { ...maintenance, date: value } : maintenance))
//     );
//   };

//   const [pageSize, setPageSize] = useState(5);
//   const rows = maintenances.map((maintenance, index) => ({
//     id: index + 1,
//     uuid: maintenance.uuid,
//     name: maintenance.name,
//     date: maintenance.date,
//     sim: maintenance.sim,
//     type: maintenance.type,
//     found_problems: maintenance.found_problems,
//     how_to_fix: maintenance.how_to_fix,
//     status: maintenance.status,
//   }));

//   const columns = useMemo(
//     () => [
//       { field: "id", headerName: "ID", width: 30 },
//       {
//         field: "name",
//         headerName: "Name",
//         width: 150,
//       },
//       {
//         field: "date",
//         headerName: "Date",
//         width: 100,
//         editable: true,
//         renderCell: (params) => {
//           const maintenance = params.row;
//           if (!maintenance) return null;
//           if (editRowId === maintenance.uuid) {
//             return (
//               <TextField
//               type="date"
//               id={`date-${maintenance.uuid}`}
//                 value={maintenance.date}
//                 onChange={(e) => handleDateChange(maintenance.uuid,e.target.value)}
//               />
//             );
//           }
//           return <Typography>{maintenance.date}</Typography>;
//         },
//       },
//       {
//         field: "sim",
//         headerName: "SIM",
//         width: 150,
//         renderCell: (params) => {
//           const maintenance = params.row;
//           if (!maintenance) return null;
//           if (editRowId === maintenance.uuid) {
//             return (
//               <Select
//               id={`sim-${maintenance.uuid}`}
//                 value={maintenance.sim}
//                 onChange={(e) => handleSIMChange(maintenance.uuid, e.target.value)}
//               >
//                 <MenuItem value="">Choose option</MenuItem>
//                 <MenuItem value="Airbus A-320">Airbus A-320</MenuItem>
//                 <MenuItem value="Boeing 767/57">Boeing 767/57</MenuItem>
//                 <MenuItem value="ATR-72">ATR-72</MenuItem>
//                 <MenuItem value="MI-8">MI-8</MenuItem>
//                 <MenuItem value="AN-2">AN-2</MenuItem>
//                 <MenuItem value="IL-76">IL-76</MenuItem>
//                 <MenuItem value="Embraer ERJ-190">Embraer ERJ-190</MenuItem>
//               </Select>
//             );
//           }
//           return <Typography>{maintenance.sim}</Typography>;
//         },
//       },
//       {
//         field: "type",
//         headerName: "Type",
//         width: 200,
//         editable: true,
//         renderCell: (params) => {
//           const maintenance = params.row;
//           if (!maintenance) return null;
//           if (editRowId === maintenance.uuid) {
//             return (
//               <TextField
//               id={`type-${maintenance.uuid}`}
//                 value={maintenance.type}
//                 onChange={(e) => handleTypeChange(maintenance.uuid, e.target.value)}
//               />
//             );
//           }
//           return <Typography>{maintenance.type}</Typography>;
//         },
//       },
//       {
//         field: "found_problems",
//         headerName: "Found Problems",
//         flex: 1,
//         editable: true,
//         renderCell: (params) => {
//           const maintenance = params.row;
//           if (maintenance.uuid === editRowId) {
//             return (
//               <TextField
//                 multiline
//                 id={`found_problems-${maintenance.uuid}`}
//                 value={maintenance.found_problems}
//                 onChange={(e) =>
//                   handleFoundProblemsChange(maintenance.uuid, e.target.value)
//                 }
//               />
//             );
//           }
//           return <Typography>{maintenance.found_problems}</Typography>;
//         },
//       },
//       {
//         field: "how_to_fix",
//         headerName: "How to Fix",
//         flex: 1,
//         editable: true,
//         renderCell: (params) => {
//           const maintenance = params.row;
//           if (maintenance.uuid === editRowId) {
//             return (
//               <TextField
//                 multiline
//                 id={`how_to_fix-${maintenance.uuid}`}
//                 value={maintenance.how_to_fix}
//                 onChange={(e) => handleHowToFixChange(maintenance.uuid, e.target.value)}
//               />
//             );
//           }
//           return <Typography>{maintenance.how_to_fix}</Typography>;
//         },
//       },
//       {
//         field: "status",
//         headerName: "Status",
//         width: 130,
//         renderCell: (params) => {
//           const maintenance = params.row;
//           if (!maintenance) return null;
//           if (editRowId === maintenance.uuid) {
//             return (
//               <Select
//               id={`status-${maintenance.uuid}`}
//                 value={maintenance.status}
//                 onChange={(e) => handleStatusChange(maintenance.uuid, e.target.value)}
//               >
//                 <MenuItem value="">Choose option</MenuItem>
//                 <MenuItem value="Open">Open</MenuItem>
//                 <MenuItem value="Close">Close</MenuItem>
//                 <MenuItem value="Underworker">Underworker</MenuItem>
//               </Select>
//             );
//           }
//           return <Typography>{maintenance.status}</Typography>;
//         },
//       },
//       {
//         field: "actions",
//         headerName: "Actions",
//         width: 180,
//         renderCell: (params) => {
//           const maintenance = params.row;
//           if (!maintenance) return null;

//           if (editRowId === maintenance.uuid) {
//             return (
//               <>
//                 <Tooltip title="Save">
//                   <IconButton
//                     aria-label="save"
//                     onClick={() => handleSaveClick(maintenance.uuid)}
//                   >
//                     <Save />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Cancel">
//                   <IconButton
//                     aria-label="cancel"
//                     onClick={() => handleCancelClick(maintenance.uuid)}
//                   >
//                     <Cancel />
//                   </IconButton>
//                 </Tooltip>
//               </>
//             );
//           }

//           return (
//             <>
//               <Tooltip title="Edit">
//                 <IconButton
//                   aria-label="edit"
//                   onClick={() => handleEditClick(maintenance.uuid)}
//                 >
//                   <Edit />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="Delete">
//                 <IconButton
//                   aria-label="delete"
//                   onClick={() => deleteMaintenance(maintenance.uuid)}
//                 >
//                   <Delete />
//                 </IconButton>
//               </Tooltip>
//             </>
//           );
//         },
//       },
//     ],
//     [editRowId, maintenances]
//   );
//   const csvData = maintenances.map((maintenance) => ({
//     // Map maintenance data to CSV fields
//     id: maintenance.uuid,
//     name: maintenance.name,
//     date: maintenance.date,
//     sim: maintenance.sim,
//     type: maintenance.type,
//     found_problems: maintenance.found_problems,
//     how_to_fix: maintenance.how_to_fix,
//     status: maintenance.status,
//   }));
//   return (
//     <div>
//       <Typography variant="h3" component="h3" sx={{ textAlign: "center" }}>
//         Users
//       </Typography>
//       <Box
//         sx={{
//           height: 400,
//           width: "100%",
//           fontweight: "bold",
//           color: "grey",
//           fontSize: "120px",
//         }}
//       >
//         <DataGrid
//           sx={{
//             border: 1,
//             m: 2,
//             boxShadow: 5,
//             "& .MuiDataGrid-row": {
//               borderTop: "1px solid", // Customize the top border color here
//               borderBottom: "1px solid", // Customize the bottom border color here
//               borderWidth: "1px 0", // Customize the border width here
//             },
//           }}
//           columns={columns}
//           rows={rows}
//           rowsPerPageOptions={[5, 10, 20]}
//           pageSize={pageSize}
//           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//           getRowSpacing={(params) => ({
//             top: params.isFirstVisible ? 0 : 5,
//             bottom: params.isLastVisible ? 0 : 5,
//           })}
//           components={{
//             Toolbar: GridToolbar, // Render the default toolbar with export button
//           }}
//           componentsProps={{
//             toolbar: {
//               exportButton: (
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   size="small"
//                   startIcon={<Save />}
//                   endIcon={<DownArrow />}
//                   component={CSVLink}
//                   data={csvData}
//                   filename={"maintenances.csv"}
//                   className="button is-link is-rounded mb-2"
//                 >
//                   Export
//                 </Button>
//               ),
//             },
//           }}
//         />
//       </Box>
//       <br></br>
//       <Link
//         to="/maintenances/add"
//         className="button is-link is-rounded mb-2 "
//       >
//         Add New
//       </Link>
//     </div>
//   );
// };
// export default Maintenancelist