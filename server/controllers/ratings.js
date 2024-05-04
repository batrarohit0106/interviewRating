import {v4 as uuidv4} from 'uuid';
import {driver, createSession} from '../neo4jSession.js'

const getRatings = async (req, res) => {
    const session = createSession();
    try{
        const userId=req.params.userId;
        const result = await session.run('MATCH (p:User {id: $userId})-[:POSTED]->(b:Rating) RETURN b',{userId});
        const ratings = result.records.map((record)=> record.get('b').properties);
        res.status(200).json(ratings);
    } catch(error){
        res.status(404).json({message: error.message})
    } finally{
        await session.close();
    }
};


const createRating = async (req, res) => {
    const session = createSession();

    try {
        console.log(req.body);
        const { name, contact, interviewStatus, rating, feedback, userId } = req.body;
        const ratingId = uuidv4();

        const result = await session.run(
            `
            MATCH (u:User {id: $userId})
            CREATE (b:Rating {id: $ratingId, name: $name, contact: $contact, interviewStatus: $interviewStatus, rating: $rating, feedback: $feedback, postedBy: $userId})
            MERGE (u)-[:POSTED]->(b)
            RETURN b
            `,
            { userId,ratingId,name, contact, name, interviewStatus, rating, feedback}
        );

        const newRating = result.records[0].get('b').properties;
        res.status(201).json(newRating);

    } catch (error) {
        console.error(error);
        res.status(409).json({ message: error.message });
    } finally {
        await session.close();
    }
};


// const editRating = async(req, res) => {
//     const session = createSession();
//     try{
//         // const {id} = req.params;
//         const {name, contact, price, image , userId} = req.body;
//         const result = await session.run(
//             'MATCH (b:Rating {id: $userId}) SET b += {name: $name, contact: $contact, price: $price, image: $image} RETURN b',
//             {userId, name, contact, price, image}
//         );
//         console.log(id);
//         const updatedRating = result.records[0].get('b');
//         res.json({result: updatedRating.properties});
//     } catch(error){
//         res.status(404).json({message: error.message});
//     } finally{
//         await session.close();
//     }
// };

const editRating = async (req, res) => {
    const session = createSession();
    try {
        const { name, contact, interviewStatus, rating, feedback, userId} = req.body;
        const { id } = req.params

        const checkUserResult = await session.run(
            'MATCH (u:User {id: $userId})-[:POSTED]->(b:Rating {id: $id}) RETURN u',
            { userId, id }
        );

        if (checkUserResult.records.length === 0) {
            return res.status(403).json({ message: 'You do not have permission to edit this rating.' });
        }

        const updateResult = await session.run(
            'MATCH (b:Rating {id: $id}) SET b += {name: $name, contact: $contact, interviewStatus: $interviewStatus, rating: $rating, feedback: $feedback} RETURN b',
            { id, name, contact, interviewStatus, rating, feedback }
        );
        
        const updatedRating = updateResult.records[0].get('b').properties;
        res.json(updatedRating);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await session.close();
    }
};


const deleteRating = async (req, res) => {
    const {id} = req.params;
    const session = createSession();
    try{
        await session.run('MATCH (b:Rating {id: $id}) DETACH DELETE b', { id });
        res.json({ message: 'Rating deleted successfully' });
    } catch(error){
        res.status(404).json({message: error.message});
    } finally{
        await session.close();
    }
};
export {getRatings, createRating, editRating, deleteRating};