import React from 'react';


import { useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';

import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

import { Marker, MapContainer, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


function DashboardPage() {
    const Location = useLocation();

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
            }}
        >

            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        color: '#111827',
                        mb: 1,
                        fontSize: {
                            xs: '1.8rem',
                            sm: '2rem',
                        },
                    }}
                >
                    Dashboard
                </Typography>
            </Box>

            {/* Summary Section */}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={3}
                sx={{ mb: 5 }}
            >

                <Card
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        borderRadius: 4,
                        border: '1px solid #e5e7eb',
                        boxShadow: 'none',
                        transition: '0.2s ease',
                        '&:hover': {
                            borderColor: '#d1d5db',
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>

                        <Typography
                            variant="body2"
                            sx={{
                                color: '#6b7280',
                                mb: 1,
                                letterSpacing: 0.5,
                            }}
                        >
                            Total Users
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: 700,
                                color: '#111827',
                                fontSize: {
                                    xs: '2rem',
                                    sm: '2.5rem',
                                },
                            }}
                        >
                            {rows.length}
                        </Typography>

                    </CardContent>
                </Card>

                <Card
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        borderRadius: 4,
                        border: '1px solid #e5e7eb',
                        boxShadow: 'none',
                        transition: '0.2s ease',
                        '&:hover': {
                            borderColor: '#d1d5db',
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>

                        <Typography
                            variant="body2"
                            sx={{
                                color: '#6b7280',
                                mb: 1,
                                letterSpacing: 0.5,
                            }}
                        >
                            Average Age
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: 700,
                                color: '#111827',
                                fontSize: {
                                    xs: '2rem',
                                    sm: '2.5rem',
                                },
                            }}
                        >
                            {(
                                rows.reduce((sum, row) => sum + (row.age || 0), 0) /
                                rows.filter((row) => row.age !== null).length
                            ).toFixed(1)}
                        </Typography>

                    </CardContent>
                </Card>

            </Stack>

            {/* Charts */}
            <Card
                sx={{
                    borderRadius: 4,
                    border: '1px solid #ececec',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    mb: 5,
                    overflow: 'hidden',
                }}
            >
                <CardContent
                    sx={{
                        p: { xs: 2, sm: 3 },
                    }}
                >

                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        spacing={3}
                        sx={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >

                        {/* Bar Chart */}
                        <Box
                            sx={{
                                flex: 1,
                                width: '100%',
                                minWidth: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                overflowX: 'auto',
                            }}
                        >

                            <BarChart
                                colors={['#64748b', '#cbd5e1']}
                                series={[
                                    { data: [35, 44, 24, 34], label: 'Series 1' },
                                    { data: [51, 6, 49, 30], label: 'Series 2' },
                                ]}
                                height={220}
                                width={
                                    typeof window !== 'undefined' &&
                                    window.innerWidth < 600
                                        ? 300
                                        : 380
                                }
                                xAxis={[
                                    {
                                        data: ['Q1', 'Q2', 'Q3', 'Q4'],
                                        scaleType: 'band',
                                    },
                                ]}
                            />

                        </Box>

                        {/* Pie Chart */}
                        <Box
                            sx={{
                                flex: 1,
                                width: '100%',
                                minWidth: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >

                            <PieChart
                                width={
                                    typeof window !== 'undefined' &&
                                    window.innerWidth < 600
                                        ? 180
                                        : 220
                                }
                                height={
                                    typeof window !== 'undefined' &&
                                    window.innerWidth < 600
                                        ? 180
                                        : 220
                                }
                                colors={['#475569', '#94a3b8', '#e2e8f0']}
                                series={[
                                    {
                                        innerRadius: 35,
                                        outerRadius: 65,
                                        paddingAngle: 2,
                                        cornerRadius: 3,
                                        data: [
                                            { id: 0, value: 10, label: 'Series A' },
                                            { id: 1, value: 15, label: 'Series B' },
                                            { id: 2, value: 20, label: 'Series C' },
                                        ],
                                    },
                                ]}
                            />

                        </Box>

                    </Stack>

                </CardContent>
            </Card>

            {/* DataGrid */}
            <Card
                sx={{
                    borderRadius: 4,
                    border: '1px solid #ececec',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    mb: 5,
                    overflow: 'hidden',
                }}
            >
                <CardContent sx={{ p: 0 }}>

                    <Box
                        sx={{
                            px: { xs: 2, sm: 3 },
                            py: 2,
                            borderBottom: '1px solid #ececec',
                            backgroundColor: '#fafafa',
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: '#18181b',
                            }}
                        >
                            Users Overview
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            height: 420,
                            width: '100%',
                            overflowX: 'auto',
                        }}
                    >

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            experimentalFeatures={{ newEditingApi: true }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            sx={{
                                border: 0,
                                minWidth: {
                                    xs: 650,
                                    md: '100%',
                                },

                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#f8fafc',
                                    borderBottom: '1px solid #ececec',
                                    fontWeight: 600,
                                    color: '#374151',
                                },

                                '& .MuiDataGrid-cell': {
                                    borderBottom: '1px solid #f5f5f5',
                                    color: '#525252',
                                },

                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: '#fafafa',
                                },

                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: '1px solid #ececec',
                                },
                            }}
                        />

                    </Box>

                </CardContent>
            </Card>

            {/* Map */}
            <Card
                sx={{
                    borderRadius: 4,
                    border: '1px solid #e5e7eb',
                    boxShadow: 'none',
                    overflow: 'hidden',
                }}
            >
                <CardContent sx={{ p: 0 }}>

                    <Box
                        sx={{
                            px: { xs: 2, sm: 3 },
                            py: 2.5,
                            borderBottom: '1px solid #e5e7eb',
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: '#111827',
                            }}
                        >
                            Location Map
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            height: {
                                xs: 300,
                                sm: 380,
                                md: 450,
                            },
                            width: '100%',
                        }}
                    >

                        <MapContainer
                            center={[14.604253, 120.994314]}
                            zoom={13}
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; OpenStreetMap contributors'
                            />
                            <Marker position={[14.604253, 120.994314]}>
                                <Popup>
                                    National University-Manila <br />
                                    <p>
                                        <i>
                                            551 F Jhocson ST, Sampaloc,
                                            Manila, 1008 Metro Manila
                                        </i>
                                    </p>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}



export default DashboardPage;