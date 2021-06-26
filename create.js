/* eslint-disable */
import handler from './libs/handler-libs';
import dynamoDB from './libs/dynamodb-libs';
import * as uuid from 'uuid';

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TableName,
        Item: {
            userId: "123",
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now(), 
        },
    };
    await dynamoDB.put(params);

    return params.Item;
});
