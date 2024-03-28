import imageUrlBuilder from '@sanity/image-url';
import {createClient} from 'next-sanity'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
    projectId: 'ogiywius',
    dataset: 'production',
    apiVersion: "2024-01-01",
    useCdn: true,
    // token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const { projectId, dataset } = client.config();

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;