import * as React from 'react';
import Link from 'next/link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';

const CustomLink = styled(Link)({
    textDecoration: 'none',
});

export const mainLinks = (router: any) => {
    return (
        <React.Fragment>
            <CustomLink href="/">
                <ListItemButton selected={router.pathname === '/'}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </CustomLink>

            <CustomLink href="/orders">
                <ListItemButton selected={router.pathname === '/orders'}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItemButton>
            </CustomLink>
        </React.Fragment>
    );
};

export const resourceLinks = (router: any) => {
    return (
        <React.Fragment>
            <ListSubheader component="div" inset sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Resources
            </ListSubheader>

            <CustomLink href="/customers">
                <ListItemButton selected={router.pathname === '/customers'}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItemButton>
            </CustomLink>
        </React.Fragment>
    );
};

export const siteLinks = (router: any) => {
    return (
        <React.Fragment>
            <ListSubheader component="div" inset sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Site Settings
            </ListSubheader>
        </React.Fragment>
    );
};

export const adminLinks = (router: any) => {
    return (
        <React.Fragment>
            <ListSubheader component="div" inset sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Admin Settings
            </ListSubheader>

            <CustomLink href="/users">
                <ListItemButton selected={router.pathname === '/users'}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItemButton>
            </CustomLink>
        </React.Fragment>
    );
};
