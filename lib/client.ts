import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'e5mrq85j',
    dataset: 'production',
    apiVersion: '2022-12-27',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
