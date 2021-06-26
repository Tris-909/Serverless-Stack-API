import handler from './libs/handler-libs';
import dynamoDB from './libs/dynamodb-libs';

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.TableName,
        Key: {
            userId: "123",
            noteId: event.pathParameters.id,
        },
    };

    const result = await dynamoDB.get(params);
    if (!result.Item) {
        throw new Error('No item found related to this Id');
    }

    return result;
});