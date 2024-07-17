import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/system';

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
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </CustomLink >
            <CustomLink href="/orders">
                <ListItemButton selected={router.pathname === '/orders' ? true : false}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItemButton>
            </CustomLink>
            <CustomLink href="/customers">
                <ListItemButton selected={router.pathname === '/customers' ? true : false}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItemButton>
            </CustomLink>
            <CustomLink href="/reports">
                <ListItemButton selected={router.pathname === '/reports' ? true : false}>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItemButton>
            </CustomLink>
            <CustomLink href="/integrations">
                <ListItemButton selected={router.pathname === '/integrations' ? true : false}>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Integrations" />
                </ListItemButton>
            </CustomLink>

        </React.Fragment>
    );
};

export const secondaryLinks = (router: any) => {
    return (
        <React.Fragment >
            <ListSubheader component="div" inset>
                Saved reports
            </ListSubheader>
            <CustomLink href="/integrations">
                <ListItemButton selected={router.pathname === '/integrations' ? true : false}>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current month" />
                </ListItemButton>
            </CustomLink>
        </React.Fragment >
    );
};