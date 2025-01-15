import Todo from "../models/Todo";

export default class TodoService {
	async list(d1: D1Database): Promise<Todo[]> {
		const { results } = await d1.prepare('SELECT * FROM "todos"').all();
		return results as Todo[];
	}

	async create(d1: D1Database, data: { name: string }): Promise<Todo> {
		const stmt = d1.prepare('INSERT INTO "todos" ("name") VALUES (?) RETURNING *').bind(data.name);
		const { results } = await stmt.all();
		return results[0] as Todo;
	}

	async find(d1: D1Database, query: Pick<Todo, "id">): Promise<Todo | null> {
		const stmt = d1.prepare('SELECT * FROM "todos" WHERE "Id" = ?').bind(query.id);
		const { results } = await stmt.all();
		return results[0] as Todo | null; // 返回 null 如果未找到
	}

	async delete(d1: D1Database, query: Pick<Todo, "id">): Promise<Todo | null> {
		const stmt = d1.prepare('DELETE FROM "todos" WHERE "id" = ? RETURNING *').bind(query.id);
		const { results } = await stmt.all();
		return results[0] as Todo | null; // 返回 null 如果未找到
	}

	async update(d1: D1Database, query: Pick<Todo, "id">, data: { name: string; completed: boolean }): Promise<Todo | null> {
		const stmt = d1
			.prepare('UPDATE "todos" SET "name" = ?, "completed" = ? WHERE "id" = ? RETURNING *')
			.bind(data.name, data.completed, query.id);
		const { results } = await stmt.all();
		return results[0] as Todo | null; // 返回 null 如果未找到
	}
}
