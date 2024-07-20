// import { NextApiRequest, NextApiResponse } from 'next';
// import { MongoClient } from 'mongodb';

// const client = new MongoClient(process.env.MONGODB_URI || '', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         const { userId } = req.body;

//         try {
//             await client.connect();
//             const db = client.db('YourDatabase');
//             const collection = db.collection('Login');

//             const user = await collection.findOne({ userId });
//             const theme = user?.theme || 'light';

//             res.status(200).json({ theme });
//         } catch (error) {
//             res.status(500).json({ error: 'Failed to get theme' });
//         } finally {
//             await client.close();
//         }
//     } else {
//         res.status(405).json({ error: 'Method not allowed' });
//     }
// }

// export default handler;
