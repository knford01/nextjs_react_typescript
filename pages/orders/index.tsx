import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridApiRef } from '@mui/x-data-grid';
import { GetStaticProps, NextPage } from 'next/types';
import { getCustomers } from '../api/customers';
import { useRouter } from 'next/router';
import { CustomerType, Order } from '../customers';
import { ObjectId } from 'mongodb';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Order ID',
        width: 250,
        renderCell: (params) => (
            <Tooltip title={params.value || ''}>
                <div>{params.value}</div>
            </Tooltip>
        ),
    },
    {
        field: 'customerId',
        headerName: 'Customer ID',
        width: 250,
        renderCell: (params) => (
            <Tooltip title={params.value || ''}>
                <div>{params.value}</div>
            </Tooltip>
        ),
    },
    {
        field: 'customerName',
        headerName: 'Customer',
        width: 200,
        renderCell: (params) => (
            <Tooltip title={params.value || ''}>
                <div>{params.value}</div>
            </Tooltip>
        ),
    },
    {
        field: 'description',
        headerName: 'Description',
        type: 'string',
        width: 400,
        renderCell: (params) => (
            <Tooltip title={params.value || ''}>
                <div>{params.value}</div>
            </Tooltip>
        ),
    },
    {
        field: 'orderPrice',
        headerName: 'Price',
        type: 'string',
        sortable: true,
        width: 200,
    },
];

interface OrderRow {
    description: string;
    orderPrice: string;
    customerName: string;
    customerId: string;
    id: string;
}

type Props = {
    orders: OrderRow[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const data = await getCustomers();

    let orders: OrderRow[] = [];

    data.forEach((customer: CustomerType) => {
        if (customer.orders && customer._id) {
            customer.orders.forEach((order: Order) => {
                const custID = customer._id?.toString() || new ObjectId().toString();
                orders.push({
                    description: order.description,
                    customerName: customer.name,
                    customerId: custID,
                    id: order._id?.toString() || new ObjectId().toString(),
                    orderPrice: `$${Number(order.price).toFixed(2)}`,
                });
            });
        }
    });

    return {
        props: {
            orders: orders,
        },
        revalidate: 60,
    };
};

const Orders: NextPage<Props> = (props) => {
    const { customerId } = useRouter().query;
    const [selectedRows, setSelectedRows] = React.useState<OrderRow[]>([]);
    const gridApiRef = React.useRef<GridApiRef>(null);

    const handleSelectionChange = () => {
        const selectionModel = gridApiRef.current?.getSelectionModel();
        if (selectionModel) {
            const selectedRowsData = selectionModel.map((id) =>
                props.orders.find((row) => row.id === id)
            );
            setSelectedRows(selectedRowsData);
        }
    };

    const exportSelectedToExcel = () => {
        const selectedOrders = selectedRows.map((row) => ({
            ...row,
            orderPrice: row.orderPrice.replace('$', ''),
        }));

        const ws = XLSX.utils.json_to_sheet(selectedOrders);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Selected Orders');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        const buffer = new ArrayBuffer(wbout.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < wbout.length; i++) {
            view[i] = wbout.charCodeAt(i) & 0xff;
        }
        saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            'selected_orders.xlsx'
        );
    };

    return (
        <Container maxWidth="xl" sx={{ m: 2, width: '100%', height: '85%' }}>
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    filterModel={{
                        items: [
                            {
                                columnField: 'customerId',
                                operatorValue: 'equals',
                                value: customerId,
                            },
                        ],
                    }}
                    rows={props.orders}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    apiRef={gridApiRef}
                    components={{
                        Toolbar: () => (
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <Button
                                        onClick={exportSelectedToExcel}
                                        variant="contained"
                                        sx={{ marginRight: '10px' }}
                                    >
                                        Export Selected to Excel
                                    </Button>
                                </div>
                            </div>
                        ),
                    }}
                    onSelectionModelChange={handleSelectionChange}
                />
            </Box>
        </Container>
    );
};

export default Orders;
