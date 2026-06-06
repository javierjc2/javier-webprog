import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArticleIcon from "@mui/icons-material/Article";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

const dashboardNavItems = [
    { label: "Dashboard", title: "Dashboard", to: "/dashboard",         icon: DashboardIcon },
    { label: "Reports",   title: "Reports",   to: "/dashboard/reports", icon: AssessmentIcon },
    { label: "Users",     title: "Users",     to: "/dashboard/users",   icon: PeopleIcon },
    { label: "Articles",  title: "Articles",  to: "/dashboard/articles", icon: ArticleIcon },
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1, 0, 2),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#1e293b",
    boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": {
        backgroundColor: "#0f172a",
        borderRight: "1px solid rgba(255,255,255,0.06)",
    },
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
            ...openedMixin(theme),
            backgroundColor: "#0f172a",
            borderRight: "1px solid rgba(255,255,255,0.06)",
        },
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
            ...closedMixin(theme),
            backgroundColor: "#0f172a",
            borderRight: "1px solid rgba(255,255,255,0.06)",
        },
    }),
}));

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.10)",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
    "&:focus-within": {
        backgroundColor: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.22)",
    },
    transition: "all 0.2s",
    width: 220,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 1.5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.45)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    "& .MuiInputBase-input": {
        padding: theme.spacing(0.9, 1, 0.9, 0),
        paddingLeft: `calc(1em + ${theme.spacing(3)})`,
        width: "100%",
    },
}));

const getPageTitle = (pathname) =>
    dashboardNavItems.find(({ to }) => to === pathname)?.title ?? "Welcome";

const DashLayout = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
    const navigate = useNavigate();

    // Enhancement 1: Read role from localStorage
    const storedFirstName = localStorage.getItem("firstName") || "";
    const storedType      = localStorage.getItem("type")      || "";

    const handleDrawerOpen  = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    // Enhancement 1: Filter nav items — editors cannot see Users
    const visibleNavItems = dashboardNavItems.filter(({ to }) => {
        if (to === "/dashboard/users" && storedType === "editor") return false;
        return true;
    });

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* ── AppBar ── */}
            <AppBar position="fixed">
                <Toolbar sx={{ gap: 1 }}>
                    <IconButton
                        color="inherit"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, color: "rgba(255,255,255,0.85)" }}
                    >
                        {open ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 600,
                            fontSize: "1rem",
                            letterSpacing: "-0.01em",
                            color: "#f1f5f9",
                        }}
                    >
                        {pageTitle}
                    </Typography>

                    {/* Welcome label */}
                    {storedFirstName && (
                        <Typography
                            variant="body2"
                            sx={{ color: "rgba(255,255,255,0.5)", mr: 1, display: { xs: "none", sm: "block" }, fontSize: 13 }}
                        >
                            Welcome, <strong style={{ color: "#e2e8f0" }}>{storedFirstName}</strong>
                        </Typography>
                    )}

                    <Search sx={{ display: { xs: "none", md: "flex" } }}>
                        <SearchIconWrapper><SearchIcon sx={{ fontSize: 16 }} /></SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
                    </Search>

                    <Button
                        size="small"
                        onClick={handleLogout}
                        variant="outlined"
                        sx={{
                            ml: 1,
                            borderColor: "rgba(255,255,255,0.25)",
                            color: "rgba(255,255,255,0.85)",
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            "&:hover": {
                                borderColor: "rgba(255,255,255,0.5)",
                                backgroundColor: "rgba(255,255,255,0.08)",
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* ── Drawer ── */}
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    {open && (
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: 13,
                                color: "#64748b",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                            }}
                        >
                            Menu
                        </Typography>
                    )}
                    <IconButton onClick={handleDrawerClose} sx={{ color: "#475569", ml: "auto" }}>
                        {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

                <List sx={{ px: 1, pt: 1 }}>
                    {visibleNavItems.map(({ label, to, icon: Icon }) => {
                        const isSelected = location.pathname === to;
                        return (
                            <Tooltip key={to} title={!open ? label : ""} placement="right" arrow>
                                <ListItem disablePadding sx={{ display: "block", mb: 0.5 }}>
                                    <ListItemButton
                                        component={Link}
                                        to={to}
                                        selected={isSelected}
                                        sx={{
                                            minHeight: 44,
                                            px: 2,
                                            borderRadius: 2,
                                            justifyContent: open ? "initial" : "center",
                                            color: isSelected ? "#f1f5f9" : "#94a3b8",
                                            backgroundColor: isSelected
                                                ? "rgba(99,102,241,0.18)"
                                                : "transparent",
                                            "&:hover": {
                                                backgroundColor: isSelected
                                                    ? "rgba(99,102,241,0.22)"
                                                    : "rgba(255,255,255,0.06)",
                                                color: "#f1f5f9",
                                            },
                                            "&.Mui-selected": {
                                                backgroundColor: "rgba(99,102,241,0.18)",
                                            },
                                            "&.Mui-selected:hover": {
                                                backgroundColor: "rgba(99,102,241,0.22)",
                                            },
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 2.5 : "auto",
                                                justifyContent: "center",
                                                color: isSelected ? "#818cf8" : "#64748b",
                                            }}
                                        >
                                            <Icon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={label}
                                            primaryTypographyProps={{
                                                fontSize: 13,
                                                fontWeight: isSelected ? 600 : 500,
                                                letterSpacing: "0.01em",
                                            }}
                                            sx={{ opacity: open ? 1 : 0, transition: "opacity 0.2s" }}
                                        />
                                        {isSelected && open && (
                                            <Box
                                                sx={{
                                                    width: 4,
                                                    height: 4,
                                                    borderRadius: "50%",
                                                    backgroundColor: "#818cf8",
                                                    flexShrink: 0,
                                                }}
                                            />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                        );
                    })}
                </List>
            </Drawer>

            {/* ── Main content ── */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    backgroundColor: "#f8fafc",
                    minHeight: "100vh",
                    minWidth: 0,
                }}
            >
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashLayout;
