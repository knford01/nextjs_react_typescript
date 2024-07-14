import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { CustomerType } from './index';
import axios, { AxiosError } from 'axios';
import { ParsedUrlQuery } from 'querystring';
// import clientPromise from '../../lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { BSONTypeError } from 'bson';
// import { getCustomer } from '../api/customers/[id]';

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

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!;

    try {
        const data = await axios.get<{ customer: CustomerType }>(`http://127.0.0.1:8000/api/customers/${params.id}`);
        console.log('!!!', data);

        if (!data) {
            return {
                notFound: true,
                revalidate: 60,
            };
        }

        return {
            props: {
                customer: data.data.customer,
                // customer: JSON.parse(JSON.stringify(data)),
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
    }

    return <h1>{props.customer ? 'Customer ' + props.customer.name : null}</h1>;
};

export default Customer;
