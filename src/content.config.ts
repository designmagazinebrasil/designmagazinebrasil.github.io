import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const issuesCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: './src/data/issues' }),
	schema: z.object({
		year: z.number(),
		title: z.string(),
		link: z.string().url().optional(),
		cover: z.string().optional(),
	})
});

export const collections = {
	"issues": issuesCollection
};