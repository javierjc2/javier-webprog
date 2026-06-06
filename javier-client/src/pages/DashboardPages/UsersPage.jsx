import React from 'react';
import { Avatar, Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

const userRows = [
    {
        id: 1,
        name: 'Juan Dela Cruz',
        email: 'juan@email.com',
        role: 'Admin',
        status: 'Active',
        age: 21,
    },
    {
        id: 2,
        name: 'Maria Santos',
        email: 'maria@email.com',
        role: 'Editor',
        status: 'Inactive',
        age: 24,
    },
    {
        id: 3,
        name: 'Carlos Reyes',
        email: 'carlos@email.com',
        role: 'User',
        status: 'Active',
        age: 20,
    },
    {
        id: 4,
        name: 'Angela Cruz',
        email: 'angela@email.com',
        role: 'Moderator',
        status: 'Pending',
        age: 23,
    },
    {
        id: 5,
        name: 'Nicole Garcia',
        email: 'nicole@email.com',
        role: 'User',
        status: 'Active',
        age: 22,
    },
];

const userColumns = [
    {
        field: 'name',
        headerName: 'User',
        flex: 1.3,
        minWidth: 220,
        renderCell: (params) => {
            const muiTheme = useMuiTheme();
            return (
                <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ height: '100%' }}
                >
                    <Avatar
                        sx={{
                            width: 34,
                            height: 34,
                            fontSize: 14,
                            bgcolor: '#8b5cf6',
                            color: '#ffffff',
                        }}
                    >
                        {params.row.name.charAt(0)}
                    </Avatar>

                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: muiTheme.palette.text.primary,
                        }}
                    >
                        {params.row.name}
                    </Typography>
                </Stack>
            );
        },
    },

    {
        field: 'email',
        headerName: 'Email',
        flex: 1.3,
        minWidth: 220,
    },

    {
        field: 'role',
        headerName: 'Role',
        flex: 1,
        minWidth: 140,
    },

    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 140,
        renderCell: (params) => {
            const muiTheme = useMuiTheme();
            const getStatusColor = (status) => {
                switch (status) {
                    case 'Active':
                        return '#10b981';
                    case 'Inactive':
                        return '#ef4444';
                    case 'Pending':
                        return '#f59e0b';
                    default:
                        return '#8b5cf6';
                }
            };
            return (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        borderRadius: 2,
                        backgroundColor: getStatusColor(params.value),
                        color: '#ffffff',
                        fontWeight: 500,
                    }}
                />
            );
        },
    },

    {
        field: 'age',
        headerName: 'Age',
        flex: 0.6,
        minWidth: 100,
    },
];

function UsersPage() {
    const muiTheme = useMuiTheme();
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
            }}
        >

            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: muiTheme.palette.text.primary,
                        mb: 1,
                    }}
                >
                    Users
                </Typography>
            </Box>

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={3}
                sx={{ mb: 5 }}
            >

                <Card
                    sx={{
                        flex: 1,
                        borderRadius: 2,
                        backgroundColor: muiTheme.palette.background.paper,
                        border: `1px solid ${muiTheme.palette.divider}`,
                        boxShadow: 'none',
                        transition: '0.2s ease',
                        '&:hover': {
                            borderColor: muiTheme.palette.primary.main,
                            backgroundColor: 'rgba(139, 92, 246, 0.05)',
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: muiTheme.palette.text.secondary,
                                mb: 1,
                            }}
                        >
                            Total Users
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: {
                                    xs: '2rem',
                                    sm: '2.5rem',
                                },
                                color: muiTheme.palette.text.primary,
                            }}
                        >
                            {userRows.length}
                        </Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        flex: 1,
                        borderRadius: 2,
                        backgroundColor: muiTheme.palette.background.paper,
                        border: `1px solid ${muiTheme.palette.divider}`,
                        boxShadow: 'none',
                        transition: '0.2s ease',
                        '&:hover': {
                            borderColor: muiTheme.palette.primary.main,
                            backgroundColor: 'rgba(139, 92, 246, 0.05)',
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    <CardContent sx={{ p: 4 }}>

                        <Typography
                            variant="body2"
                            sx={{
                                color: muiTheme.palette.text.secondary,
                                mb: 1,
                            }}
                        >
                            Active Users
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: {
                                    xs: '2rem',
                                    sm: '2.5rem',
                                },
                                color: muiTheme.palette.text.primary,
                            }}
                        >
                            {
                                userRows.filter(
                                    (user) => user.status === 'Active'
                                ).length
                            }
                        </Typography>
                    </CardContent>
                </Card>

            </Stack>

            <Card
                sx={{
                    borderRadius: 2,
                    backgroundColor: muiTheme.palette.background.paper,
                    border: `1px solid ${muiTheme.palette.divider}`,
                    boxShadow: 'none',
                    overflow: 'hidden',
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    <Box
                        sx={{
                            px: { xs: 2, sm: 3 },
                            py: 2,
                            borderBottom: `1px solid ${muiTheme.palette.divider}`,
                            backgroundColor: 'rgba(139, 92, 246, 0.05)',
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: muiTheme.palette.text.primary,
                            }}
                        >
                            User List
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            height: 500,
                            width: '100%',
                            overflowX: 'auto',
                        }}
                    >
                        <DataGrid
                            rows={userRows}
                            columns={userColumns}
                            pageSizeOptions={[5]}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            checkboxSelection
                            disableRowSelectionOnClick
                            sx={{
                                border: 0,
                                minWidth: {
                                    xs: 750,
                                    md: '100%',
                                },

                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#f8fafc',
                                    borderBottom: '1px solid #ececec',
                                    fontWeight: 600,
                                    color: '#374151',
                                },

                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 600,
                                },

                                '& .MuiDataGrid-cell': {
                                    borderBottom: '1px solid #f5f5f5',
                                    color: '#525252',
                                },

                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: '#fafafa',
                                },

                                '& .MuiCheckbox-root': {
                                    color: '#9ca3af',
                                },

                                '& .MuiCheckbox-root.Mui-checked': {
                                    color: '#52525b',
                                },

                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: '1px solid #ececec',
                                    backgroundColor: '#fafafa',
                                },
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default UsersPage;