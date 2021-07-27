/* eslint-disable */
import handler from './libs/handler-libs';
import dynamoDB from './libs/dynamodb-libs';
import * as uuid from 'uuid';

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            header: data.header,
            content: data.content,
            attachment: data.attachment,
            x: 0,
            y: 0,
            createdAt: Date.now(), 
        },
    };
    await dynamoDB.put(params);

    return params.Item;
});
