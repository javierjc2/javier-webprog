import React from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography, Card, CardContent, Chip } from '@mui/material';
import { Marker, MapContainer, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const columns = [
    { field: 'id',        headerName: 'ID',         width: 70  },
    { field: 'firstName', headerName: 'First name', width: 140 },
    { field: 'lastName',  headerName: 'Last name',  width: 140 },
    { field: 'age',       headerName: 'Age',        width: 90, type: 'number' },
    {
        field: 'fullName',
        headerName: 'Full name',
        width: 180,
        sortable: false,
        valueGetter: (value, row) =>
            `${row.firstName || ''} ${row.lastName || ''}`.trim(),
    },
];

const rows = [
    { id: 1, lastName: 'Snow',       firstName: 'Jon',      age: 14  },
    { id: 2, lastName: 'Lannister',  firstName: 'Cersei',   age: 31  },
    { id: 3, lastName: 'Lannister',  firstName: 'Jaime',    age: 31  },
    { id: 4, lastName: 'Stark',      firstName: 'Arya',     age: 11  },
    { id: 5, lastName: 'Targaryen',  firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null,       age: 150 },
    { id: 7, lastName: 'Clifford',   firstName: 'Ferrara',  age: 44  },
    { id: 8, lastName: 'Frances',    firstName: 'Rossini',  age: 36  },
    { id: 9, lastName: 'Roxie',      firstName: 'Harvey',   age: 65  },
];

const avgAge = (
    rows.reduce((sum, r) => sum + (r.age || 0), 0) /
    rows.filter((r) => r.age !== null).length
).toFixed(1);

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, accent, sub }) => (
    <Card
        elevation={0}
        sx={{
            flex: 1,
            minWidth: 0,
            border: '1px solid #e2e8f0',
            borderRadius: 3,
            background: '#fff',
            transition: 'box-shadow 0.2s, transform 0.2s',
            '&:hover': {
                boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                transform: 'translateY(-2px)',
            },
        }}
    >
        <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                <Box>
                    <Typography
                        sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                              textTransform: 'uppercase', color: '#94a3b8', mb: 1 }}
                    >
                        {label}
                    </Typography>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                        {value}
                    </Typography>
                    {sub && (
                        <Typography sx={{ fontSize: 12, color: '#64748b', mt: 0.8 }}>
                            {sub}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        width: 44, height: 44, borderRadius: 2.5,
                        background: accent + '18',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Icon sx={{ color: accent, fontSize: 22 }} />
                </Box>
            </Stack>
        </CardContent>
    </Card>
);

// ── Section card ──────────────────────────────────────────────────────────────
const SectionCard = ({ title, badge, children, sx }) => (
    <Card
        elevation={0}
        sx={{
            border: '1px solid #e2e8f0',
            borderRadius: 3,
            background: '#fff',
            overflow: 'hidden',
            mb: 3,
            ...sx,
        }}
    >
        {title && (
            <Box
                sx={{
                    px: 3, py: 2,
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex', alignItems: 'center', gap: 1.5,
                }}
            >
                <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>
                    {title}
                </Typography>
                {badge && (
                    <Chip
                        label={badge}
                        size="small"
                        sx={{ fontSize: 11, height: 20, backgroundColor: '#f1f5f9', color: '#64748b', fontWeight: 600 }}
                    />
                )}
            </Box>
        )}
        <Box sx={{ p: title ? 0 : 3 }}>{children}</Box>
    </Card>
);

function DashboardPage() {
    return (
        <Box sx={{ width: '100%', maxWidth: '100%', pb: 4 }}>

            {/* ── Page header ── */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', mb: 0.5 }}
                >
                    Dashboard
                </Typography>
                <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>
                    Overview of your system metrics and activity
                </Typography>
            </Box>

            {/* ── Stat cards ── */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mb: 3 }}>
                <StatCard
                    icon={PeopleAltIcon}
                    label="Total Users"
                    value={rows.length}
                    accent="#6366f1"
                    sub="All registered users"
                />
                <StatCard
                    icon={CakeIcon}
                    label="Average Age"
                    value={avgAge}
                    accent="#f59e0b"
                    sub="Across active users"
                />
                <StatCard
                    icon={TrendingUpIcon}
                    label="Active Sessions"
                    value="3"
                    accent="#10b981"
                    sub="Currently online"
                />
            </Stack>

            {/* ── Charts row ── */}
            <SectionCard title="Analytics Overview" badge="Q1–Q4">
                <Stack
                    direction={{ xs: 'column', lg: 'row' }}
                    spacing={0}
                    divider={<Box sx={{ width: '1px', background: '#f1f5f9', display: { xs: 'none', lg: 'block' } }} />}
                >
                    {/* Bar */}
                    <Box sx={{ flex: 1, p: 3 }}>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Quarterly Performance
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                            <BarChart
                                colors={['#6366f1', '#c7d2fe']}
                                series={[
                                    { data: [35, 44, 24, 34], label: 'Series 1' },
                                    { data: [51, 6, 49, 30],  label: 'Series 2' },
                                ]}
                                height={220}
                                width={typeof window !== 'undefined' && window.innerWidth < 600 ? 300 : 380}
                                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                            />
                        </Box>
                    </Box>

                    {/* Pie */}
                    <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Distribution
                        </Typography>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <PieChart
                                width={typeof window !== 'undefined' && window.innerWidth < 600 ? 180 : 220}
                                height={220}
                                colors={['#6366f1', '#818cf8', '#e0e7ff']}
                                series={[{
                                    innerRadius: 40,
                                    outerRadius: 75,
                                    paddingAngle: 3,
                                    cornerRadius: 4,
                                    data: [
                                        { id: 0, value: 10, label: 'Series A' },
                                        { id: 1, value: 15, label: 'Series B' },
                                        { id: 2, value: 20, label: 'Series C' },
                                    ],
                                }]}
                            />
                        </Box>
                    </Box>
                </Stack>
            </SectionCard>

            {/* ── Users DataGrid ── */}
            <SectionCard title="Users Overview" badge={`${rows.length} records`}>
                <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        sx={{
                            border: 0,
                            minWidth: 600,
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f8fafc',
                                borderBottom: '1px solid #e2e8f0',
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 700,
                                fontSize: 12,
                                color: '#475569',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid #f8fafc',
                                color: '#334155',
                                fontSize: 13,
                            },
                            '& .MuiDataGrid-row:hover': { backgroundColor: '#f8fafc' },
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: '1px solid #e2e8f0',
                                backgroundColor: '#f8fafc',
                            },
                            '& .MuiCheckbox-root': { color: '#cbd5e1' },
                            '& .MuiCheckbox-root.Mui-checked': { color: '#6366f1' },
                        }}
                    />
                </Box>
            </SectionCard>

            {/* ── Map ── */}
            <Card
                elevation={0}
                sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}
            >
                <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LocationOnIcon sx={{ fontSize: 18, color: '#6366f1' }} />
                    <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>
                        Location Map
                    </Typography>
                    <Chip
                        label="Manila, PH"
                        size="small"
                        sx={{ fontSize: 11, height: 20, backgroundColor: '#ede9fe', color: '#6366f1', fontWeight: 600 }}
                    />
                </Box>
                <Box sx={{ height: { xs: 280, sm: 380 }, width: '100%' }}>
                    <MapContainer
                        center={[14.604253, 120.994314]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <Marker position={[14.604253, 120.994314]}>
                            <Popup>
                                <strong>National University–Manila</strong>
                                <br />
                                <span style={{ fontSize: 12, color: '#64748b' }}>
                                    551 F Jhocson St, Sampaloc, Manila
                                </span>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Box>
            </Card>
        </Box>
    );
}

export default DashboardPage;
