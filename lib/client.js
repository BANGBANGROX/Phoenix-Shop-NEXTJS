import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

console.log(process.env.SANITY_PROJECT_ID);

export const client = sanityClient({
    projectId: "uoi77ffd",
    dataset: "production",
    apiVersion: "2022-06-10",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
