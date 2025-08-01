import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl,
  },
});