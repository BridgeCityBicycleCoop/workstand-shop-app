import { z } from 'zod';

export const makeOptionalPropsNullable = <Schema extends z.AnyZodObject>(schema: Schema) => {
	const entries = Object.entries(schema.shape) as [keyof Schema['shape'], z.ZodTypeAny][];
	const newProps = entries.reduce(
		(acc, [key, value]) => {
			acc[key] = value instanceof z.ZodOptional ? value.unwrap().nullable() : value;
			return acc;
		},
		{} as {
			[key in keyof Schema['shape']]: Schema['shape'][key] extends z.ZodOptional<infer T>
				? z.ZodNullable<T>
				: Schema['shape'][key];
		}
	);
	return z.object(newProps);
};

export const requireEmailOrPhone = z.union(
	[
		z.object({ email: z.undefined(), phone: z.string() }),
		z.object({ email: z.string(), phone: z.undefined() }),
		z.object({ email: z.string(), phone: z.string() })
	],
	{ errorMap: (_issue, _ctx) => ({ message: 'Either email or phone must be filled in' }) }
);
