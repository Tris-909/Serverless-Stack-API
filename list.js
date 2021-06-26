import handler from './libs/handler-libs';
import dynamoDB from './libs/dynamodb-libs';

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.TableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        },
    };

    const result = await dynamoDB.query(params);

    return result.Items;
});