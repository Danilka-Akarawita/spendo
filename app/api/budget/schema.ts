import {z} from 'zod';
const schema =z.object({
    name:z.string(),
    amount: z.number().positive().min(1)
})

export default schema;