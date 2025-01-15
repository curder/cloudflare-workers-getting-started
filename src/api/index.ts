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

api.get('/', async c => {
	return c.json({
		status: true,
		data: [
			{method: 'GET', path: '/api/v1/todos', description: 'Get all todos'},
			{method: 'POST', path: '/api/v1/todos', description: 'Create a new todo'},
			{method: 'GET', path: '/api/v1/todos/:id', description: 'Get a todo'},
			{method: 'PUT', path: '/api/v1/todos/:id', description: 'Update a todo'},
			{method: 'DELETE', path: '/api/v1/todos/:id', description: 'Delete a todo'},
		]
	});
});

api.route('api/v1/todos', todo);

export default api;
