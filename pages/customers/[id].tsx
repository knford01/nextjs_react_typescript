import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { CustomerType } from './index';
import axios, { AxiosError } from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
// import { BSONTypeError } from 'bson';
import { getCustomer } from '../api/customers/[id]';

type Props = {
    customer?: CustomerType;
};

interface Params extends ParsedUrlQuery {
    id: string;
}

//Request for the data-api-ect.\\
export const getStaticPaths: GetStaticPaths = async () => {
    //Lazy Caching - no data is cached until it is requested for the first time
    //When fallback is set to true a web crawler will see 'blocking' which gives it an actual value for seo\\
    return {
        paths: [],
        fallback: true,
    };
};

//Use Static Props to get data for a website while server side. Use the API to Add data during run time\\
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!;

    try {

        //Connect to Django Database\\
        // const data = await axios.get<{ customer: CustomerType }>(`http://127.0.0.1:8000/api/customers/${params.id}`);
        // // console.log('!!!', data);

        // if (!data) {
        //     return {
        //         notFound: true,
        //         revalidate: 60,
        //     };
        // }

        //None API call to get customer by ID\\
        // const mongoClient = await clientPromise;

        // const data = await mongoClient
        //     .db('customers')
        //     .collection('customers')
        //     .findOne({ "_id": new ObjectId(params.id) }) as CustomerType;

        // console.log('!!!', data);

        // return {
        //     props: {
        //         customer: JSON.parse(JSON.stringify(data)),
        //     },
        //     revalidate: 60,
        // };

        //Easy MongoDB\\
        const data = await getCustomer(params.id);
        console.log(data);

        if (!data) {
            return {
                notFound: true,
                revalidate: 60
            };
        }

        return {
            props: {
                customer: JSON.parse(JSON.stringify(data)),
            },
            revalidate: 60,
        };
    } catch (err) {
        console.log(err);
        // if (err instanceof BSONTypeError) {
        if (err instanceof AxiosError) {
            return {
                notFound: true,
                revalidate: 60
            };
        }
        throw err;
    }
};

const Customer: NextPage<Props> = (props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <p>Loading...</p>;
    } else if (props.customer) {
        return (
            <div key={props.customer._id?.toString()}>
                <p>Customer ID: {props.customer._id?.toString()}</p>
                <p>Customer: {props.customer.name}</p>
                <p>Contact: {props.customer.contact}</p>
            </div>
        );
    } else {
        return <h1>Customer Not Found.</h1>;
    }
};

export default Customer;
