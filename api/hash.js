import fetch from 'node-fetch';
import { createHash } from 'crypto';

export async function handler(event, context) {
    const url = event.queryStringParameters.url;
    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL parameter is required' })
        };
    }
    try {
        const response = await fetch(url);
        const data = await response.text();
        const hash = createHash('sha256').update(data).digest('hex');
        return {
            statusCode: 200,
            body: JSON.stringify({ hash })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch the URL' })
        };
    }
}
