import * as React from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';
// import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const CustomLink = styled(Link)({
    textDecoration: 'none',
});

export const mainLinks = (router: any) => {

    return (
        <React.Fragment>
            <CustomLink href="/">
                <ListItemButton selected={router.pathname === '/' ? true : false}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Dashboard
                            </Typography>
                        }
                    />
                </ListItemButton>
            </CustomLink >

            <CustomLink href="/orders">
                <ListItemButton selected={router.pathname === '/orders' ? true : false}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Orders
                            </Typography>
                        }
                    />
                </ListItemButton>
            </CustomLink>

            {/* <CustomLink href="/integrations">
                <ListItemButton selected={router.pathname === '/integrations' ? true : false}>
                    <ListItemIcon>
                        <LocalShippingIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Warehouse Manager
                            </Typography>
                        }
                    />
                </ListItemButton>
            </CustomLink> */}

        </React.Fragment>
    );
};

export const resourceLinks = (router: any) => {
    return (
        <React.Fragment >
            <ListSubheader component="div" inset>
                Resources
            </ListSubheader>

            <CustomLink href="/customers">
                <ListItemButton selected={router.pathname === '/customers' ? true : false}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Customers
                            </Typography>
                        }
                    />
                </ListItemButton>
            </CustomLink>

            {/* <CustomLink href="/reports">
                <ListItemButton selected={router.pathname === '/reports' ? true : false}>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Reports
                            </Typography>
                        }
                    />
                </ListItemButton>
            </CustomLink> */}
        </React.Fragment >
    );
};

export const siteLinks = (router: any) => {
    return (
        <React.Fragment >
            <ListSubheader component="div" inset>
                Site Settings
            </ListSubheader>

            <CustomLink href="/themes">
                <ListItemButton selected={router.pathname === '/themes' ? true : false}>
                    <ListItemIcon>
                        <AutoAwesomeMosaicIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Themes
                            </Typography>
                        }
                    />
                </ListItemButton>
            </CustomLink>
        </React.Fragment >
    );
};

export const adminLinks = (router: any) => {
    return (
        <React.Fragment >
            <ListSubheader component="div" inset>
                Admin Settings
            </ListSubheader>

            <CustomLink href="/users">
                <ListItemButton selected={router.pathname === '/users' ? true : false}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Users
                            </Typography>
                        }
                    />
                </ListItemButton>
            </CustomLink>
        </React.Fragment >
    );
};