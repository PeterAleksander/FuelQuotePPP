import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import TableContainer from '@mui/material/TableContainer';
import { getQuotes } from "../api/FuelQuote.api";

//The below is just dummy data, it will be pulled from our database when that is set up. This is just as a visual aid.
const columns = [
    { field: 'id', headerName: 'Quote ID', flex: 1, },
    { field: 'gallons', headerName: 'Gallons Requested', flex: 1 },
    { field: 'address', headerName: 'Delivery Address', flex: 1 },
    { field: 'date', headerName: 'Date' , flex: 1 },
    { field: 'price', headerName: 'Price / Gallon', flex: 1 },
    { field: 'total', headerName: 'Total Due', flex: 1 },
  ];

export default function FuelQuoteHistory() {
  // State for storing rows
  const [row, setRows] = useState([]);

  useEffect(() => {
    // Define a function to fetch quotes
    const fetchQuotes = async () => {
      const currentUserData = sessionStorage.getItem("currentUser");
      let ID;
      if (currentUserData) {
        try {
          const clientdata = Object.values(JSON.parse(currentUserData));
          ID = clientdata[0];
          const fetchedRows = await getQuotes(ID);
          if (fetchedRows) {
            // Assuming fetchedRows is an array of quotes
            setRows(fetchedRows);
          }
        } catch (error) {
          console.error("Error parsing currentUser data or fetching quotes:", error);
        }
      }
    };

    fetchQuotes();
  }, []);

    return (
        <main>
            <Box sx={{ width: "100%", minHeight: "100px", paddingTop: 5, borderBottom: 3, marginBottom: 5}}>
            <Typography
              component="h1"
              variant="h1"
              align="center"
              color="darkred"
              gutterBottom
              overflow={false}
            >
              Fuel Quote History
            </Typography>
            </Box>
            <Box sx={{ width: "85%", margin: "auto"}}>
            <DataGrid
              rows={row}
              getRowId={(row) => row.QuoteID}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 25,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              getRowHeight={() => 'auto'}
              sx={{
                [`& .${gridClasses.cell}`]: {
                  py: 1,
                },
              }}> 
              </DataGrid>
            </Box>
        </main>
    )
}