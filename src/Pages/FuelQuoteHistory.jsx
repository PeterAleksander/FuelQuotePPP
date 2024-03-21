import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import TableContainer from '@mui/material/TableContainer';

//The below is just dummy data, it will be pulled from our database when that is set up. This is just as a visual aid.
const columns = [
    { field: 'id', headerName: 'Quote ID', flex: 1, },
    { field: 'gallons', headerName: 'Gallons Requested', flex: 1 },
    { field: 'address', headerName: 'Delivery Address', flex: 1 },
    { field: 'date', headerName: 'Date' , flex: 1 },
    { field: 'price', headerName: 'Price / Gallon', flex: 1 },
    { field: 'total', headerName: 'Total Due', flex: 1 },
  ];
  
  const rows = [
    { id: 1, gallons: 730, address: '19973 Cedar Mill Ln', date: "02/16/24", price: 3.117, total: 2275.410 },
    { id: 2, gallons: 523, address: '20113 Amhurst Dr', date: "02/18/24", price: 3.498, total: 1829.454 },
    { id: 3, gallons: 2863, address: '88263 Houston St', date: "02/19/24", price: 2.884, total: 8256.892 }
  ];

export default function FuelQuoteHistory() {
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
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}   
                checkboxSelection
                sx={{ align: "center"}}
            />
            </Box>
        </main>
    )
}