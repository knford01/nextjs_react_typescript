import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { CustomerType, Order } from '../../customers/index';
import NextCors from 'nextjs-cors';

type Return = {
    customers: CustomerType[];
};

export const getCustomers = async (): Promise<CustomerType[]> => {
    const mongoClient = await clientPromise;

    const data = (await mongoClient
        .db('customers')
        .collection('customers')
        .find()
        .toArray()) as CustomerType[];

    return JSON.parse(JSON.stringify(data));
};

export const addCustomer = async (customer: CustomerType): Promise<ObjectId> => {
    const mongoClient = await clientPromise;

    const response = await mongoClient
        .db('customers')
        .collection('customers')
        .insertOne(customer);

    return response.insertedId;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        methods: ['GET', 'POST'],
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            //* use this for everything
        ],
        optionsSuccessStatus: 200,
    });
    if (req.method === 'GET') {
        const data = await getCustomers();
        res.status(200).json(JSON.parse(JSON.stringify(data)));
    } else if (req.method === 'POST') {
        // console.log(req.body);

        if (req.body.name && req.body.contact) {
            const customer: CustomerType = {
                name: req.body.name,
                contact: req.body.contact,
                orders: req.body.orders.map((order: Order) => {
                    return { ...order, _id: new ObjectId() };
                }),
            };

            const insertedId = await addCustomer(customer);
            res.revalidate('/customers');
            res.revalidate('/customers/' + insertedId);
            res.status(200).json(insertedId);
        } else {
            res.status(400).json({ error: 'Name and Contact are required.' });
        }
    }
}
