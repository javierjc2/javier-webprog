import { useState, useMemo, useEffect, useCallback } from 'react';
import {
    Alert, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent,
    DialogTitle, FormControlLabel, IconButton, InputAdornment, MenuItem, Paper,
    Stack, Switch, TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility    from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon    from '@mui/icons-material/Search';
import RefreshIcon   from '@mui/icons-material/Refresh';
import { DataGrid }  from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser, toggleStatus } from '../../services/UserService';

// ── Enhancement 1: Role guard ─────────────────────────────────────────────────
const storedType = localStorage.getItem('type') || '';

const roles   = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '', lastName: '', age: '', gender: '',
    contactNumber: '', email: '', role: 'editor',
    username: '', password: '', address: '', isActive: true,
};

const labelize = (v) => v ? `${v.charAt(0).toUpperCase()}${v.slice(1)}` : '';

const UsersPage = () => {
    const theme    = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Enhancement 1: Editors cannot access UsersPage
    if (storedType === 'editor') {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Box sx={{ textAlign: 'center', maxWidth: 380 }}>
                    <Typography sx={{ fontSize: 48, mb: 2 }}>🔒</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                        Access Restricted
                    </Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: 14 }}>
                        Editors do not have permission to view the Users page.
                    </Typography>
                </Box>
            </Box>
        );
    }

    const [users,        setUsers]        = useState([]);
    const [loading,      setLoading]      = useState(true);
    const [apiError,     setApiError]     = useState('');
    const [modal,        setModal]        = useState({ open: false, isEdit: false, id: null });
    const [form,         setForm]         = useState({ ...blankForm });
    const [errors,       setErrors]       = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [saving,       setSaving]       = useState(false);

    const [search,       setSearch]       = useState('');
    const [filterRole,   setFilterRole]   = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // ── Load users from API ──────────────────────────────────────────────────
    const loadUsers = useCallback(async () => {
        setLoading(true);
        setApiError('');
        try {
            const { data } = await fetchUsers();
            // Normalise _id → id for DataGrid
            setUsers((data.users || []).map((u) => ({ ...u, id: u._id })));
        } catch (err) {
            setApiError(err.response?.data?.message || 'Failed to load users.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadUsers(); }, [loadUsers]);

    // ── Filtered rows ────────────────────────────────────────────────────────
    const filteredUsers = useMemo(() => {
        const q = search.trim().toLowerCase();
        return users.filter((u) => {
            const matchSearch = !q ||
                u.firstName.toLowerCase().includes(q) ||
                u.lastName.toLowerCase().includes(q)  ||
                (u.email || '').toLowerCase().includes(q) ||
                (u.username || '').toLowerCase().includes(q);
            const matchRole   = !filterRole   || u.role   === filterRole;
            const matchGender = !filterGender || u.gender === filterGender;
            const matchStatus =
                !filterStatus ||
                (filterStatus === 'active'   &&  u.isActive) ||
                (filterStatus === 'inactive' && !u.isActive);
            return matchSearch && matchRole && matchGender && matchStatus;
        });
    }, [users, search, filterRole, filterGender, filterStatus]);

    // ── Modal helpers ────────────────────────────────────────────────────────
    const openModal  = (user = null) => {
        setModal({ open: true, isEdit: Boolean(user), id: user?._id ?? null });
        setForm(user ? { ...blankForm, ...user, password: '' } : { ...blankForm });
        setErrors({});
    };
    const closeModal = () => {
        setModal({ open: false, isEdit: false, id: null });
        setShowPassword(false);
        setForm({ ...blankForm });
        setErrors({});
    };

    const handleChange = ({ target: { name, value, checked, type } }) => {
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    // ── Validation ───────────────────────────────────────────────────────────
    const validate = () => {
        const e = {};
        const mustEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        [
            ['firstName', 'First name'], ['lastName', 'Last name'],
            ['age', 'Age'], ['gender', 'Gender'],
            ['contactNumber', 'Contact number'], ['email', 'Email'],
            ['role', 'Role'], ['username', 'Username'],
            ['address', 'Address'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) e[key] = `${label} is required.`;
        });
        if (!modal.isEdit && !form.password.trim()) e.password = 'Password is required.';
        if (!e.age && !/^\d+$/.test(String(form.age).trim()))
            e.age = 'Age must be a number.';
        if (!e.contactNumber && !/^\d{11}$/.test(String(form.contactNumber).trim()))
            e.contactNumber = 'Must be exactly 11 digits.';
        if (!e.email && !mustEmail.test(String(form.email).trim()))
            e.email = 'Enter a valid email address.';
        if (!e.username && /\s/.test(form.username))
            e.username = 'No spaces allowed.';
        if (!e.password && !modal.isEdit && form.password.length < 8)
            e.password = 'At least 8 characters.';
        return e;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSaving(true);
        try {
            const payload = { ...form };
            if (modal.isEdit && !payload.password) delete payload.password;

            if (modal.isEdit) {
                await updateUser(modal.id, payload);
            } else {
                await createUser(payload);
            }
            await loadUsers();
            closeModal();
        } catch (err) {
            setErrors({ _api: err.response?.data?.message || 'Save failed.' });
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (id) => {
        try {
            await toggleStatus(id);
            setUsers((prev) =>
                prev.map((u) => u.id === id ? { ...u, isActive: !u.isActive } : u)
            );
        } catch {
            setApiError('Failed to update status.');
        }
    };

    // ── DataGrid columns ─────────────────────────────────────────────────────
    const columns = [
        { field: 'id', headerName: 'ID', width: 50, renderCell: ({ row }) => (
            <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>
                {String(row._id || row.id).slice(-4)}
            </Typography>
        )},
        { field: 'firstName', headerName: 'Full Name', minWidth: 160,
            valueGetter: (_v, row) => `${row.firstName || ''} ${row.lastName || ''}`.trim() },
        { field: 'username',      headerName: 'Username',       minWidth: 130 },
        { field: 'age',           headerName: 'Age',            width: 70 },
        { field: 'gender',        headerName: 'Gender',         minWidth: 100,
            valueGetter: (_v, row) => labelize(row.gender) },
        { field: 'contactNumber', headerName: 'Contact Number', minWidth: 140 },
        { field: 'email',         headerName: 'Email',          minWidth: 200 },
        { field: 'role',          headerName: 'Role',           minWidth: 100,
            valueGetter: (_v, row) => labelize(row.role) },
        {
            field: 'isActive', headerName: 'Status', minWidth: 110, sortable: false,
            renderCell: ({ row }) => (
                <Chip label={row.isActive ? 'Active' : 'Inactive'} size="small"
                    sx={{ fontWeight: 700, fontSize: 11, height: 22, borderRadius: 1.5,
                        ...(row.isActive
                            ? { backgroundColor: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' }
                            : { backgroundColor: '#f1f5f9', color: '#94a3b8', border: '1px solid #e2e8f0' }) }}
                />
            ),
        },
        {
            field: 'actions', headerName: 'Actions', minWidth: 190, sortable: false, filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
                    <Button size="small" variant="outlined" onClick={() => openModal(row)}
                        sx={{ borderColor: '#e2e8f0', color: '#475569', fontSize: 11, fontWeight: 700,
                            textTransform: 'none', borderRadius: 1.5, minWidth: 45,
                            '&:hover': { borderColor: '#6366f1', color: '#6366f1' } }}
                    >Edit</Button>
                    <Button size="small" variant="contained" onClick={() => handleToggle(row._id || row.id)}
                        sx={{ fontSize: 11, fontWeight: 700, textTransform: 'none', borderRadius: 1.5,
                            boxShadow: 'none', minWidth: 72,
                            ...(row.isActive
                                ? { backgroundColor: '#ef4444', '&:hover': { backgroundColor: '#dc2626', boxShadow: 'none' } }
                                : { backgroundColor: '#10b981', '&:hover': { backgroundColor: '#059669', boxShadow: 'none' } }) }}
                    >{row.isActive ? 'Disable' : 'Activate'}</Button>
                </Stack>
            ),
        },
    ];

    const hasFilters = search || filterRole || filterGender || filterStatus;

    return (
        <Box sx={{ width: '100%', minWidth: 0, pb: 4 }}>

            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', mb: 0.5 }}>
                            Users
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>
                            Manage all user accounts, roles, and access levels
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" size="small" onClick={loadUsers} startIcon={<RefreshIcon />}
                            sx={{ borderColor: '#e2e8f0', color: '#475569', textTransform: 'none', fontWeight: 600, borderRadius: 2, fontSize: 12 }}
                        >Refresh</Button>
                        <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={() => openModal()}
                            sx={{ backgroundColor: '#6366f1', borderRadius: 2, fontWeight: 700, fontSize: 13,
                                textTransform: 'none', boxShadow: 'none', px: 2.5,
                                '&:hover': { backgroundColor: '#4f46e5', boxShadow: 'none' } }}
                        >Add User</Button>
                    </Stack>
                </Stack>
            </Box>

            {/* API error banner */}
            {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{apiError}</Alert>}

            {/* Filters */}
            <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, p: 2, mb: 3, background: '#fff' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap" useFlexGap alignItems="center">
                    <TextField size="small" placeholder="Search by name, email or username…" value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: '#94a3b8' }} /></InputAdornment> }}
                        sx={{ flex: '1 1 220px', minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
                    />
                    <TextField select size="small" label="Role" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
                        sx={{ minWidth: 130, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
                    >
                        <MenuItem value="">All Roles</MenuItem>
                        {roles.map((r) => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                    </TextField>
                    <TextField select size="small" label="Gender" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}
                        sx={{ minWidth: 130, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
                    >
                        <MenuItem value="">All Genders</MenuItem>
                        {genders.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                    </TextField>
                    <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                        sx={{ minWidth: 130, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
                    >
                        <MenuItem value="">All Statuses</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                    {hasFilters && (
                        <Button size="small" variant="text"
                            onClick={() => { setSearch(''); setFilterRole(''); setFilterGender(''); setFilterStatus(''); }}
                            sx={{ color: '#6366f1', fontWeight: 600, fontSize: 12, textTransform: 'none' }}
                        >Clear filters</Button>
                    )}
                </Stack>
            </Paper>

            {/* Stats chips */}
            <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
                <Chip label={`${filteredUsers.length} of ${users.length} users`} size="small"
                    sx={{ fontSize: 12, fontWeight: 600, backgroundColor: '#f1f5f9', color: '#475569', borderRadius: 1.5 }} />
                <Chip label={`${users.filter(u => u.isActive).length} active`} size="small"
                    sx={{ fontSize: 12, fontWeight: 600, backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: 1.5 }} />
                <Chip label={`${users.filter(u => !u.isActive).length} inactive`} size="small"
                    sx={{ fontSize: 12, fontWeight: 600, backgroundColor: '#f1f5f9', color: '#94a3b8', borderRadius: 1.5 }} />
            </Stack>

            {/* DataGrid */}
            <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                        <CircularProgress sx={{ color: '#6366f1' }} />
                    </Box>
                ) : (
                    <Box sx={{ height: 480, width: '100%', overflowX: 'auto' }}>
                        <DataGrid rows={filteredUsers} columns={columns}
                            getRowId={(row) => row._id || row.id}
                            initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
                            pageSizeOptions={[5]} checkboxSelection disableRowSelectionOnClick
                            sx={{
                                border: 0,
                                '& .MuiDataGrid-columnHeader': { outline: 'none', backgroundColor: '#f8fafc' },
                                '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700, fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' },
                                '& .MuiDataGrid-cell': { borderBottom: '1px solid #f8fafc', color: '#334155', fontSize: 13 },
                                '& .MuiDataGrid-row:hover': { backgroundColor: '#fafafa' },
                                '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' },
                                '& .MuiCheckbox-root': { color: '#cbd5e1' },
                                '& .MuiCheckbox-root.Mui-checked': { color: '#6366f1' },
                            }}
                        />
                    </Box>
                )}
            </Paper>

            {/* Add/Edit Dialog */}
            <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md"
                PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3 } }}
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#0f172a', pb: 1 }}>
                        {modal.isEdit ? 'Edit User' : 'Add New User'}
                    </DialogTitle>
                    <DialogContent dividers sx={{ pt: 2, pb: 2 }}>
                        <Stack spacing={2}>
                            {errors._api && <Alert severity="error" sx={{ borderRadius: 2 }}>{errors._api}</Alert>}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField name="firstName" label="First Name" size="small" fullWidth value={form.firstName} onChange={handleChange} error={Boolean(errors.firstName)} helperText={errors.firstName} />
                                <TextField name="lastName"  label="Last Name"  size="small" fullWidth value={form.lastName}  onChange={handleChange} error={Boolean(errors.lastName)}  helperText={errors.lastName} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField name="age" label="Age" size="small" fullWidth value={form.age} onChange={handleChange} error={Boolean(errors.age)} helperText={errors.age} />
                                <TextField name="gender" label="Gender" size="small" fullWidth select value={form.gender} onChange={handleChange} error={Boolean(errors.gender)} helperText={errors.gender}>
                                    {genders.map((g) => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                                </TextField>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField name="contactNumber" label="Contact Number" size="small" fullWidth value={form.contactNumber} onChange={handleChange} error={Boolean(errors.contactNumber)} helperText={errors.contactNumber} />
                                <TextField name="email" label="Email Address" type="email" size="small" fullWidth value={form.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField name="role" label="Role" size="small" fullWidth select value={form.role} onChange={handleChange} error={Boolean(errors.role)} helperText={errors.role}>
                                    {roles.map((r) => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                                </TextField>
                                <TextField name="username" label="Username" size="small" fullWidth value={form.username} onChange={handleChange} error={Boolean(errors.username)} helperText={errors.username} />
                            </Stack>
                            <TextField name="password" label={modal.isEdit ? 'New Password (leave blank to keep)' : 'Password'}
                                type={showPassword ? 'text' : 'password'} size="small" fullWidth
                                value={form.password} onChange={handleChange}
                                error={Boolean(errors.password)} helperText={errors.password}
                                slotProps={{ input: { endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end"
                                            onClick={() => setShowPassword((p) => !p)}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )}}}
                            />
                            <TextField name="address" label="Address" size="small" fullWidth multiline rows={3} value={form.address} onChange={handleChange} error={Boolean(errors.address)} helperText={errors.address} />
                            <FormControlLabel
                                control={<Switch name="isActive" checked={form.isActive} onChange={handleChange}
                                    sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366f1' },
                                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#6366f1' } }} />}
                                label={<Typography sx={{ fontSize: 13, color: '#475569' }}>Status: <strong>{form.isActive ? 'Active' : 'Inactive'}</strong></Typography>}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                        <Button onClick={closeModal} sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={saving}
                            sx={{ backgroundColor: '#6366f1', textTransform: 'none', fontWeight: 700, borderRadius: 2, boxShadow: 'none',
                                '&:hover': { backgroundColor: '#4f46e5', boxShadow: 'none' } }}
                        >
                            {saving ? 'Saving…' : modal.isEdit ? 'Update User' : 'Save User'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default UsersPage;
