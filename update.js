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
        UpdateExpression: "SET header = :header, content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
            ":header": data.header || null,
        },
        ReturnValues: "ALL_NEW",
    };

    await dynamoDB.update(params);

    return { status: true };
});