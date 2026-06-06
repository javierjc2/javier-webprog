import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { BarChart }  from '@mui/x-charts/BarChart';
import { Gauge }     from '@mui/x-charts/Gauge';
import { PieChart }  from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// ── Shared section-card wrapper ───────────────────────────────────────────────
const ReportCard = ({ title, subtitle, children, sx = {} }) => (
    <Card
        elevation={0}
        sx={{
            border: '1px solid #e2e8f0',
            borderRadius: 3,
            background: '#fff',
            overflow: 'hidden',
            ...sx,
        }}
    >
        {(title || subtitle) && (
            <Box sx={{ px: 3, pt: 2.5, pb: 0 }}>
                {title && (
                    <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>
                        {title}
                    </Typography>
                )}
                {subtitle && (
                    <Typography sx={{ fontSize: 12, color: '#94a3b8', mt: 0.4, lineHeight: 1.5 }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>
        )}
        <Box sx={{ p: 3 }}>{children}</Box>
    </Card>
);

// ── KPI card ─────────────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, color = '#6366f1' }) => (
    <Box
        sx={{
            flex: 1,
            minWidth: 0,
            border: '1px solid #e2e8f0',
            borderRadius: 3,
            p: 2.5,
            background: '#fff',
            borderTop: `3px solid ${color}`,
        }}
    >
        <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', mb: 0.8 }}>
            {label}
        </Typography>
        <Typography sx={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
            {value}
        </Typography>
        {sub && (
            <Typography sx={{ fontSize: 11, color: '#94a3b8', mt: 0.8 }}>{sub}</Typography>
        )}
    </Box>
);

const ReportsPage = () => {
    const printRef = useRef(null);

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;
        const printWindow = window.open('', '_blank', 'width=1200,height=900');
        if (!printWindow) return;

        const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
            .map((n) => n.outerHTML).join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long', timeStyle: 'short',
        }).format(new Date());

        printWindow.document.write(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><title>Print Report</title>${headMarkup}
<style>
  @page{size:A4;margin:16mm}*{box-sizing:border-box}
  body{margin:0;font-family:'Inter',Arial,sans-serif;background:#fff;color:#1f2937}
  .shell{padding:28px}
  .header{display:flex;align-items:center;gap:14px;margin-bottom:28px;padding-bottom:16px;border-bottom:2px solid #e5e7eb}
  .header h1{margin:0 0 4px;font-size:22px;font-weight:700;color:#111827}
  .header p{margin:0;font-size:13px;color:#6b7280}
  .kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px}
  .kpi-card{border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px}
  .kpi-label{font-size:12px;color:#6b7280;margin-bottom:4px}
  .kpi-value{font-size:26px;font-weight:700;color:#111827}
  .chart-row{display:grid;gap:14px;margin-bottom:16px}
  .chart-row-2{grid-template-columns:1fr 1fr}
  .chart-card{border:1px solid #e5e7eb;border-radius:10px;padding:18px 20px;break-inside:avoid}
  .chart-card h3{margin:0 0 4px;font-size:14px;font-weight:600;color:#111827}
  .chart-card p{margin:0 0 14px;font-size:12px;color:#6b7280}
  .footer{margin-top:28px;padding-top:12px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;display:flex;justify-content:space-between}
</style>
</head><body>
<main class="shell">
  <header class="header">
    <div><h1>Reports Summary</h1>
    <p>Analytics overview · Prepared on ${exportedAt}</p></div>
  </header>
  <div class="kpi">
    <div class="kpi-card"><div class="kpi-label">Total Generated</div><div class="kpi-value">89</div></div>
    <div class="kpi-card"><div class="kpi-label">Total Completed</div><div class="kpi-value">71</div></div>
    <div class="kpi-card"><div class="kpi-label">Completion Rate</div><div class="kpi-value">70%</div></div>
  </div>
  <div class="chart-row chart-row-2">
    <div class="chart-card"><h3>Monthly Report Output</h3>${printContent.querySelector('[data-chart="bar"]')?.outerHTML ?? ''}</div>
    <div class="chart-card"><h3>Category Share</h3>${printContent.querySelector('[data-chart="pie"]')?.outerHTML ?? ''}</div>
  </div>
  <div class="chart-row chart-row-2">
    <div class="chart-card"><h3>Revenue Trend</h3>${printContent.querySelector('[data-chart="line"]')?.outerHTML ?? ''}</div>
    <div class="chart-card" style="display:flex;flex-direction:column;align-items:center"><h3>Completion Rate</h3>${printContent.querySelector('[data-chart="gauge"]')?.outerHTML ?? ''}</div>
  </div>
  <footer class="footer"><span>Javier Web App — Reports</span><span>Generated: ${exportedAt}</span></footer>
</main></body></html>`);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '100%', pb: 4 }}>

            {/* ── Page header ── */}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                spacing={2}
                sx={{ mb: 4 }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', mb: 0.5 }}
                    >
                        Reports
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>
                        Analytics overview for generated reports, category breakdown, and completion performance.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<FileDownloadOutlinedIcon />}
                        onClick={handlePrint}
                        sx={{
                            backgroundColor: '#6366f1',
                            borderRadius: 2,
                            fontWeight: 700,
                            fontSize: 12,
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': { backgroundColor: '#4f46e5', boxShadow: 'none' },
                        }}
                    >
                        Export
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<TuneIcon />}
                        sx={{
                            borderColor: '#e2e8f0',
                            color: '#475569',
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: 12,
                            textTransform: 'none',
                            '&:hover': { borderColor: '#6366f1', color: '#6366f1' },
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AutoAwesomeIcon />}
                        sx={{
                            borderColor: '#e2e8f0',
                            color: '#475569',
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: 12,
                            textTransform: 'none',
                            '&:hover': { borderColor: '#6366f1', color: '#6366f1' },
                        }}
                    >
                        Generate
                    </Button>
                </Stack>
            </Stack>

            {/* ── KPI strip ── */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} sx={{ mb: 3 }}>
                <KpiCard label="Total Generated" value="89" sub="Jan – Apr 2025" color="#6366f1" />
                <KpiCard label="Total Completed" value="71" sub="Jan – Apr 2025" color="#10b981" />
                <KpiCard label="Completion Rate" value="70%" sub="Latest reporting cycle" color="#f59e0b" />
            </Stack>

            {/* ── Printable content ── */}
            <Box ref={printRef}>
                <Stack spacing={3}>

                    {/* Bar chart */}
                    <ReportCard
                        title="Monthly Report Output"
                        subtitle="Compares how many reports were generated vs completed across the last four months."
                    >
                        <Box data-chart="bar" sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                            <BarChart
                                height={280}
                                colors={['#6366f1', '#f59e0b']}
                                series={[
                                    { data: [18, 24, 20, 27], label: 'Generated' },
                                    { data: [12, 19, 17, 23], label: 'Completed' },
                                ]}
                                xAxis={[{
                                    data: ['January', 'February', 'March', 'April'],
                                    scaleType: 'band',
                                    label: 'Months',
                                }]}
                            />
                        </Box>
                    </ReportCard>

                    {/* Pie + Gauge */}
                    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
                        <ReportCard
                            title="Report Category Share"
                            subtitle="Distribution of report requests by category for the current reporting period."
                            sx={{ flex: 1 }}
                        >
                            <Box data-chart="pie" sx={{ display: 'flex', justifyContent: 'center' }}>
                                <PieChart
                                    width={240}
                                    height={220}
                                    colors={['#6366f1', '#f59e0b', '#ef4444', '#06b6d4']}
                                    series={[{
                                        innerRadius: 40,
                                        outerRadius: 80,
                                        paddingAngle: 3,
                                        cornerRadius: 4,
                                        data: [
                                            { id: 0, value: 14, label: 'Sales' },
                                            { id: 1, value: 30, label: 'Users' },
                                            { id: 2, value: 6,  label: 'Inventory' },
                                            { id: 3, value: 6,  label: 'Finance' },
                                        ],
                                    }]}
                                />
                            </Box>
                        </ReportCard>

                        <ReportCard
                            title="Completion Rate"
                            subtitle="Percentage of reports completed on time based on the latest reporting cycle."
                            sx={{ flex: 1 }}
                        >
                            <Box
                                data-chart="gauge"
                                sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Gauge
                                    width={180}
                                    height={180}
                                    value={70}
                                    sx={{
                                        '& .MuiGauge-valueArc': { fill: '#6366f1' },
                                        '& .MuiGauge-referenceArc': { fill: '#e2e8f0' },
                                    }}
                                />
                            </Box>
                        </ReportCard>
                    </Stack>

                    {/* Line chart */}
                    <ReportCard
                        title="Revenue Trend"
                        subtitle="Monthly revenue figures showing growth over the past six months."
                    >
                        <Box data-chart="line" sx={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                            <LineChart
                                height={260}
                                width={680}
                                series={[{
                                    data: [12, 18, 15, 24, 30, 38],
                                    color: '#6366f1',
                                    area: true,
                                    showMark: true,
                                }]}
                                xAxis={[{
                                    scaleType: 'point',
                                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                                }]}
                            />
                        </Box>
                    </ReportCard>

                </Stack>
            </Box>
        </Box>
    );
};

export default ReportsPage;
