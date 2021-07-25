import handler from './libs/handler-libs';
import dynamoDB from './libs/dynamodb-libs';

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id,
        },
        UpdateExpression: "SET x = :x, y = :y",
        ExpressionAttributeValues: {
            ":x": data.x || null,
            ":y": data.y || null,
        },
        ReturnValues: "ALL_NEW",
    };

    await dynamoDB.update(params);

    return { status: true };
});