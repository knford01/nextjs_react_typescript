import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import Info from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

import { CustomerType } from '../pages/customers';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

//We have  object { customer } and we want to define what type it is: property customer of type customer\\ 
const Customer = ({ customer }: { customer: CustomerType }) => {
    return (
        <Grid item>
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginTop: 10
                }}
            >
                <Tooltip title={customer._id?.toString()}>
                    <PersonIcon fontSize="small" style={{ marginRight: 5 }} />
                </Tooltip>
                {customer.name}
            </span>
            <p>Contact: {customer.contact}</p>
            <Link
                href={{
                    pathname: '/orders',
                    query: {
                        customerId: customer._id?.toString(),
                    },
                }}
            >
                <Button variant="contained">View Orders</Button>
            </Link>
        </Grid>
    );
};

export default Customer;
