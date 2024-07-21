import z from 'zod';

export const settingsSchema = z.object({
	logoUrl: z.string().optional(),
	shopName: z.string().optional(),
	locale: z.string().optional(),
	themeCSS: z.string().optional()
});
