import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';
import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { getCustomers } from '../api/customers/index';
// import { useQuery } from '@tanstack/react-query';

// import CustomerComponent from '../../components/Customer';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';

export type Order = {
    description: string;
    price: { $numberDecimal: string };
    _id: ObjectId;
};

export type CustomerType = {
    _id?: ObjectId;
    name: string;
    contact: string;
    // orders?: Order[];
};

type Props = {
    customers: CustomerType[];
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    //Easy MongoDB\\
    const data = await getCustomers();
    console.log(data);

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

const Customers: NextPage<Props> = ({ customers }: InferGetStaticPropsType<typeof getStaticProps>) => {
    // console.log(customers);

    return (
        <>
            <h1>Customers</h1>
            {customers.map((customer: CustomerType) => {
                return (
                    <div key={customer._id?.toString()}>
                        <p>Customer ID: {customer._id?.toString()}</p>
                        <p>Customer Name: {customer.name}</p>
                        <p>Contact: {customer.contact}</p>
                    </div>
                );
            })}
        </>
    );
};

export default Customers;
