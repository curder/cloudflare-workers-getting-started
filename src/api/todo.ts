import { Hono } from 'hono';
import { zValidator } from "@hono/zod-validator";
import TodoService from '../services/TodoService';
import Todo from '../models/Todo';
type Bindings = {
	DB: D1Database;
};

const todoService = new TodoService;
const todo = new Hono<{ Bindings: Bindings }>();

// todos
todo.get('/', async c => {
	let results = await todoService.list(c.env.DB) as Todo[];

	return c.json({
		status: true,
		message: 'Todos fetched successfully',
		data: results.map((todo: Todo) => ({
			id: todo.id,
			title: todo.name,
			completed: new Boolean(todo.completed),
		})),
	});
});

// add todo
todo.post("/", zValidator("json", Todo.pick({ name: true, })), async (c) => {
	// 从请求中获取待办事项数据
	const data = c.req.valid("json");

	// 使用服务添加新待办事项
	const todo = await todoService.create(c.env.DB, data);

	console.log(todo);
	// 将新待办事项作为 JSON 响应返回
	return c.json({
		success: true,
		message: 'Todo created successfully',
		data: {
			id: todo.id,
			title: todo.name,
			completed: new Boolean(todo.completed),
		},
	});
});

// update todo
todo.put("/:id", zValidator("json", Todo.pick({ name: true, completed: true, })), async (c) => {
	const id = parseInt(c.req.param('id'));
	const data = c.req.valid("json");

	const todo = await todoService.update(c.env.DB, { Id: id }, data);

	if (todo === undefined) {
		return c.json({ success: false, message: 'Todo not found' }, 404);
	}

	return c.json({
		success: true,
		message: 'Todo updated successfully',
		data: {
			id: todo?.id,
			title: todo?.name,
			completed: new Boolean(todo?.completed),
		},
	});
});

// delete todo
todo.delete("/:id", async (c) => {
	const id = parseInt(c.req.param('id'));

	const todo = await todoService.delete(c.env.DB, { id: id });

	if (todo === undefined) {
		return c.json({ success: false, message: 'Todo not found' }, 404);
	}
	return c.json({
		success: true,
		message: 'Todo deleted successfully',
		data: {
			id: todo?.id,
			title: todo?.name,
			completed: new Boolean(todo?.completed),
		},
	});
});

export default todo;
