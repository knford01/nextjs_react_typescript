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
        <div style={{ flex: 1, padding: '16px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}
                >
                    <Tooltip title={customer._id?.toString()}>
                        <PersonIcon fontSize="small" style={{ marginRight: 5 }} />
                    </Tooltip>
                    {customer.name}
                </span>
                <p>Contact: {customer.contact}</p>
            </div>
            <Link
                href={{
                    pathname: '/orders',
                    query: {
                        customerId: customer._id?.toString(),
                    },
                }}
                passHref
            >
                <Button variant="contained">View Orders</Button>
            </Link>
        </div>
    );
};

export default Customer;
