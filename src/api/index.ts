import { Hono } from "hono";
import { cors } from 'hono/cors'
import todo from './todo';

const api = new Hono();

// Add a middleware to set the X-Powered-By header
api.use("*", async (c, next) => {
	c.res.headers.set("X-Powered-By", "Hono");
	await next();
});
// Add a middleware to enable CORS
api.use("api/*", cors());

api.route('api/v1/todos', todo);

export default api;
