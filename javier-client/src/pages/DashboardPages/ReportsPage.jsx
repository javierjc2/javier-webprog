import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { LineChart, ScatterChart, RadarChart } from '@mui/x-charts';

function ReportsPage() {
    const muiTheme = useMuiTheme();
    return (
        <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: muiTheme.palette.text.primary, mb: 1 }}>
                    Reports
                </Typography>
            </Box>

            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 5 }}>

                {/* Revenue Trend */}
                <Card sx={{
                    flex: 1.4,
                    borderRadius: 2,
                    backgroundColor: muiTheme.palette.background.paper,
                    border: `1px solid ${muiTheme.palette.divider}`,
                    boxShadow: 'none',
                }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: muiTheme.palette.text.primary }}>
                            Revenue Trend
                        </Typography>

                        <Box sx={{
                            width: '100%',
                            overflowX: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <LineChart
                                height={260}
                                width={380}
                                series={[{
                                    data: [12, 18, 15, 24, 30, 38],
                                    color: '#8b5cf6',
                                    area: true,
                                }]}
                                xAxis={[{
                                    scaleType: 'point',
                                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                                }]}
                            />
                        </Box>
                    </CardContent>
                </Card>

                {/* Team Performance */}
                <Card sx={{
                    flex: 1,
                    borderRadius: 2,
                    backgroundColor: muiTheme.palette.background.paper,
                    border: `1px solid ${muiTheme.palette.divider}`,
                    boxShadow: 'none',
                }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: muiTheme.palette.text.primary }}>
                            Team Performance
                        </Typography>
                        <Box sx={{
                            width: '100%',
                            overflowX: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <RadarChart
                                height={320}
                                width={360}
                                margin={{ top: 60, bottom: 60, left: 80, right: 80 }}
                                series={[{
                                    label: 'Performance',
                                    data: [80, 65, 75, 90, 70],
                                    color: '#8b5cf6',
                                }]}
                                radar={{
                                    metrics: [
                                        'Sales',
                                        'Marketing',
                                        'Support',
                                        'Operations',
                                        'Development',
                                    ],
                                }}
                                sx={{
                                    '& text': {
                                        fill: '#374151',
                                        fontSize: 12,
                                        fontWeight: 500,
                                    },
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Stack>

            {/* Scatter Analytics */}
            <Card sx={{
                borderRadius: 2,
                backgroundColor: muiTheme.palette.background.paper,
                border: `1px solid ${muiTheme.palette.divider}`,
                boxShadow: 'none',
                mb: 5,
            }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>

                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: muiTheme.palette.text.primary }}>
                        User Activity Distribution
                    </Typography>

                    <Box sx={{
                        width: '100%',
                        overflowX: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <ScatterChart
                            height={320}
                            width={700}
                            series={[{
                                label: 'Activity',
                                color: '#8b5cf6',
                                data: [
                                    { x: 5, y: 20, id: 1 },
                                    { x: 10, y: 35, id: 2 },
                                    { x: 15, y: 45, id: 3 },
                                    { x: 20, y: 55, id: 4 },
                                    { x: 25, y: 70, id: 5 },
                                    { x: 30, y: 82, id: 6 },
                                ],
                            }]}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ReportsPage;