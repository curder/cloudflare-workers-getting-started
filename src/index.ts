import { Hono } from 'hono';

const app = new Hono();
app.get('/', c => c.json({ key: 'Hello world' }));

export default app;
