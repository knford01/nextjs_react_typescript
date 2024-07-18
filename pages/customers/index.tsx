import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';
import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { getCustomers } from '../api/customers/index';
import { useQuery } from '@tanstack/react-query';
// import Grid from '@mui/material/Grid';

import Customer from '@/components/Customer';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export type Order = {
    description: string;
    price: { $numberDecimal: string };
    _id: ObjectId;
};

export type CustomerType = {
    _id?: ObjectId;
    name: string;
    contact: string;
    orders?: Order[];
};

type Props = {
    customers: CustomerType[];
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    //Easy MongoDB\\
    const data = await getCustomers();
    // console.log(data);

    return {
        props: {
            customers: data,
        },
        revalidate: 60,
    };


    //This is used to connect to a MongoDB the slow way\\
    // const mongoClient = new MongoClient('mongodb+srv://koriford2023:D2nLPeoZU8CuCwOg@cluster0.k3mpqc2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    // const mongoClient = await clientPromise;

    // const data = await mongoClient
    //     .db('customers')
    //     .collection('customers')
    //     .find({})
    //     .toArray();

    // console.log('!!!', data);
    // return {
    //     props: {
    //         customers: JSON.parse(JSON.stringify(data)),
    //     },
    //     revalidate: 60
    // };

    //This is used to connect to a DjangoDB\\
    // const results = await axios.get<{ customers: CustomerType[]; }>('http://127.0.0.1:8000/api/customers/');
    // console.log(results);
    // return {
    //     props: {
    //         customers: results.data.customers
    //     },
    //     revalidate: 60
    // };
};

// const Customers: NextPage<Props> = ({ customers: c }) => {
//     console.log(c);
//     const { data: { data: { customers = c } = {} } = {} } = useQuery(
//         ['customers'],
//         () => {
//             return axios('/api/customers');
//         }
//     );

//     return (
//         <Container>
//             <Grid container spacing={5} sx={{ mt: 1 }}>
//                 {customers.map((customer: Customer) => {
//                     return (
//                         <CustomerComponent
//                             key={customer._id?.toString()}
//                             customer={customer}
//                         />
//                     );
//                 })}
//             </Grid>
//         </Container>
//     );
// };

const Customers: NextPage<Props> = ({ customers: initialCustomers }: InferGetStaticPropsType<typeof getStaticProps>) => {


    const { data: customers, refetch } = useQuery({
        queryKey: ['customers'], queryFn: async () => {
            const response = await axios.get('/api/customers');
            return response.data;
        },
        initialData: initialCustomers,
        refetchInterval: 1000 * 5,
    });

    if (customers) {
        console.log(customers);

        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', minHeight: '10vh', mt: 1 }}>
                <Grid container spacing={1} justifyContent="center">
                    {customers.map((customer: CustomerType) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={customer._id?.toString()} sx={{ display: 'flex' }}>
                            <Customer customer={customer} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    return null;
};

export default Customers;
