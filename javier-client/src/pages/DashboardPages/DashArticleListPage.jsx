import { useState, useMemo, useEffect, useCallback } from 'react';
import {
    Alert, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent,
    DialogTitle, InputAdornment, MenuItem, Paper, Stack, TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid }  from '@mui/x-data-grid';
import SearchIcon    from '@mui/icons-material/Search';
import AddIcon       from '@mui/icons-material/Add';
import RefreshIcon   from '@mui/icons-material/Refresh';
import { fetchArticles, createArticle, updateArticle, toggleArticle } from '../../services/ArticleService';

const blankForm = { title: '', slug: '', paragraphs: '', preview: '' };

const DashArticleListPage = () => {
    const theme    = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [articles,     setArticles]     = useState([]);
    const [loading,      setLoading]      = useState(true);
    const [apiError,     setApiError]     = useState('');
    const [modal,        setModal]        = useState({ open: false, isEdit: false, id: null });
    const [form,         setForm]         = useState({ ...blankForm });
    const [errors,       setErrors]       = useState({});
    const [saving,       setSaving]       = useState(false);
    const [search,       setSearch]       = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const loadArticles = useCallback(async () => {
        setLoading(true);
        setApiError('');
        try {
            const { data } = await fetchArticles();
            setArticles((data.articles || []).map((a) => ({ ...a, id: a._id })));
        } catch (err) {
            setApiError(err.response?.data?.message || 'Failed to load articles.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadArticles(); }, [loadArticles]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return articles.filter((a) => {
            const matchSearch = !q || a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q);
            const matchStatus =
                !filterStatus ||
                (filterStatus === 'active'   &&  a.isActive) ||
                (filterStatus === 'inactive' && !a.isActive);
            return matchSearch && matchStatus;
        });
    }, [articles, search, filterStatus]);

    const openModal  = (art = null) => {
        setModal({ open: true, isEdit: Boolean(art), id: art?._id ?? null });
        setForm(art ? { title: art.title, slug: art.slug, paragraphs: String(art.paragraphs), preview: art.preview } : { ...blankForm });
        setErrors({});
    };
    const closeModal = () => {
        setModal({ open: false, isEdit: false, id: null });
        setForm({ ...blankForm });
        setErrors({});
    };

    const handleChange = ({ target: { name, value } }) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.title.trim())      e.title      = 'Title is required.';
        if (!form.slug.trim())       e.slug        = 'Slug is required.';
        if (!form.paragraphs.trim()) e.paragraphs  = 'Paragraph count is required.';
        else if (!/^\d+$/.test(form.paragraphs.trim())) e.paragraphs = 'Must be a number.';
        if (!form.preview.trim())    e.preview     = 'Preview text is required.';
        return e;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSaving(true);
        try {
            const payload = { ...form, paragraphs: Number(form.paragraphs) };
            if (modal.isEdit) await updateArticle(modal.id, payload);
            else await createArticle(payload);
            await loadArticles();
            closeModal();
        } catch (err) {
            setErrors({ _api: err.response?.data?.message || 'Save failed.' });
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (id) => {
        try {
            await toggleArticle(id);
            setArticles((prev) => prev.map((a) => a._id === id ? { ...a, isActive: !a.isActive } : a));
        } catch {
            setApiError('Failed to update article status.');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90,
            renderCell: ({ row }) => <Typography sx={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>{String(row._id).slice(-6)}</Typography> },
        { field: 'slug',       headerName: 'Slug',       minWidth: 160 },
        { field: 'title',      headerName: 'Title',      minWidth: 240, flex: 1 },
        { field: 'paragraphs', headerName: 'Paragraphs', width: 110, type: 'number' },
        {
            field: 'preview', headerName: 'Preview', minWidth: 240, flex: 1,
            renderCell: ({ row }) => (
                <Typography sx={{ fontSize: 12, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.preview}
                </Typography>
            ),
        },
        {
            field: 'isActive', headerName: 'Status', width: 100, sortable: false,
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
            field: 'actions', headerName: 'Actions', width: 190, sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
                    <Button size="small" variant="outlined" onClick={() => openModal(row)}
                        sx={{ borderColor: '#e2e8f0', color: '#475569', fontSize: 11, fontWeight: 700,
                            textTransform: 'none', borderRadius: 1.5, minWidth: 45,
                            '&:hover': { borderColor: '#6366f1', color: '#6366f1' } }}
                    >Edit</Button>
                    <Button size="small" variant="contained" onClick={() => handleToggle(row._id)}
                        sx={{ fontSize: 11, fontWeight: 700, textTransform: 'none', borderRadius: 1.5, boxShadow: 'none', minWidth: 72,
                            ...(row.isActive
                                ? { backgroundColor: '#ef4444', '&:hover': { backgroundColor: '#dc2626', boxShadow: 'none' } }
                                : { backgroundColor: '#10b981', '&:hover': { backgroundColor: '#059669', boxShadow: 'none' } }) }}
                    >{row.isActive ? 'Disable' : 'Activate'}</Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%', minWidth: 0, pb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', mb: 0.5 }}>
                            Articles
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>
                            Manage published articles and their content
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" size="small" onClick={loadArticles} startIcon={<RefreshIcon />}
                            sx={{ borderColor: '#e2e8f0', color: '#475569', textTransform: 'none', fontWeight: 600, borderRadius: 2, fontSize: 12 }}
                        >Refresh</Button>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => openModal()}
                            sx={{ backgroundColor: '#6366f1', borderRadius: 2, fontWeight: 700, fontSize: 13,
                                textTransform: 'none', boxShadow: 'none', px: 2.5,
                                '&:hover': { backgroundColor: '#4f46e5', boxShadow: 'none' } }}
                        >Add Article</Button>
                    </Stack>
                </Stack>
            </Box>

            {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{apiError}</Alert>}

            <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, p: 2, mb: 3, background: '#fff' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap" useFlexGap alignItems="center">
                    <TextField size="small" placeholder="Search articles…" value={search} onChange={(e) => setSearch(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: '#94a3b8' }} /></InputAdornment> }}
                        sx={{ flex: '1 1 200px', minWidth: 180, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
                    />
                    <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                        sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
                    >
                        <MenuItem value="">All Statuses</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                    {(search || filterStatus) && (
                        <Button size="small" variant="text" onClick={() => { setSearch(''); setFilterStatus(''); }}
                            sx={{ color: '#6366f1', fontWeight: 600, fontSize: 12, textTransform: 'none' }}
                        >Clear</Button>
                    )}
                </Stack>
            </Paper>

            <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
                <Chip label={`${filtered.length} of ${articles.length} articles`} size="small"
                    sx={{ fontSize: 12, fontWeight: 600, backgroundColor: '#f1f5f9', color: '#475569', borderRadius: 1.5 }} />
                <Chip label={`${articles.filter(a => a.isActive).length} active`} size="small"
                    sx={{ fontSize: 12, fontWeight: 600, backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: 1.5 }} />
            </Stack>

            <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                        <CircularProgress sx={{ color: '#6366f1' }} />
                    </Box>
                ) : (
                    <Box sx={{ height: 480, width: '100%', overflowX: 'auto' }}>
                        <DataGrid rows={filtered} columns={columns} getRowId={(row) => row._id || row.id}
                            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
                            pageSizeOptions={[10]} checkboxSelection disableRowSelectionOnClick
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

            <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="sm"
                PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3 } }}
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 800, fontSize: 18, color: '#0f172a', pb: 1 }}>
                        {modal.isEdit ? 'Edit Article' : 'Add Article'}
                    </DialogTitle>
                    <DialogContent dividers sx={{ pt: 2, pb: 2 }}>
                        <Stack spacing={2}>
                            {errors._api && <Alert severity="error" sx={{ borderRadius: 2 }}>{errors._api}</Alert>}
                            <TextField name="title" label="Title" size="small" fullWidth value={form.title} onChange={handleChange} error={Boolean(errors.title)} helperText={errors.title} />
                            <TextField name="slug"  label="Slug"  size="small" fullWidth value={form.slug}  onChange={handleChange} error={Boolean(errors.slug)}  helperText={errors.slug} />
                            <TextField name="paragraphs" label="Paragraph Count" size="small" fullWidth value={form.paragraphs} onChange={handleChange} error={Boolean(errors.paragraphs)} helperText={errors.paragraphs} />
                            <TextField name="preview" label="Preview Text" size="small" fullWidth multiline rows={3} value={form.preview} onChange={handleChange} error={Boolean(errors.preview)} helperText={errors.preview} />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                        <Button onClick={closeModal} sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={saving}
                            sx={{ backgroundColor: '#6366f1', textTransform: 'none', fontWeight: 700, borderRadius: 2, boxShadow: 'none',
                                '&:hover': { backgroundColor: '#4f46e5', boxShadow: 'none' } }}
                        >{saving ? 'Saving…' : modal.isEdit ? 'Update Article' : 'Save Article'}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default DashArticleListPage;
