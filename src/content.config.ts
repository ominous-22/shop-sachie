import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pieceSchema = ({ image }: { image: any }) =>
  z.object({
    title: z.string(),
    date: z.coerce.date(),
    section: z.enum([
      'Quality Finds',
      'Originals for Sale',
      'Collection',
      'Original Archive',
    ]),
    category: z.enum(['Furniture', 'Sculpture', 'Dolls', 'Paintings', 'Objects']),
    status: z.enum(['Available', 'Sold', 'Not for Sale', 'Commission Only']),
    price: z.string().optional(),
    costBasis: z.number().optional(),
    soldPrice: z.number().optional(),
    dimensions: z.string().optional(),
    materials: z.string().optional(),
    eraOrStyle: z.string().optional(),
    conditionNotes: z.string().optional(),
    pickupLocation: z.string().optional(),
    paymentLink: z.string().url().optional(),
    coverImage: image(),
    gallery: z.array(image()).optional(),
    featured: z.boolean().default(false),
  });

const pieces = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pieces' }),
  schema: pieceSchema,
});

const settings = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content/settings' }),
  schema: z.object({
    siteTitle: z.string(),
    tagline: z.string(),
    statusBanner: z.string().optional(),
    accentColor: z.string().default('#d96b43'),
    backgroundColor: z.string().default('#161618'),
    contactEmail: z.string().email(),
    instagramHandle: z.string().optional(),
    venmoOrCashapp: z.string().optional(),
  }),
});

export const collections = { pieces, settings };
