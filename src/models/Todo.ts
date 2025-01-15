import { z } from "zod";

const Todo = z.object({
	id: z.number().int(),
	name: z.string(),
	completed: z.boolean(),
	created_at: z.date(),
	updated_at: z.date(),
})

type Todo = z.infer<typeof Todo>

export default Todo
