// /app/events/[slug]/page.js or /pages/events/[slug].js
import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import { sanityFetch } from "@/sanity/lib/live";

const EVENT_QUERY = defineQuery(`*[
    _type == "event" &&
    slug.current == $slug
  ][0]{
    ...,
    "timeDate": {
        "date": coalesce(timeDate.date, now()),
        "time": timeDate.time
    }
}`);

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: event } = await sanityFetch({
    query: EVENT_QUERY,
    params: await params,
  });
  if (!event) {
    notFound();
  }

  const { name, timeDate, details, eventType, image } = event;

  const eventDate = timeDate?.date
    ? new Date(timeDate.date).toDateString()
    : null;

  const eventTime = timeDate?.time || null;

  // --- FIX: Wrap the multi-line expression in parentheses ---
  const imageUrl = image?.image
    ? urlFor(image.image)
        .height(310)
        .width(550)
        .quality(80)
        .auto("format")
        .url()
    : "https://placehold.co/550x310/png";

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <Link
          href="/"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back to events
        </Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={imageUrl}
          alt={name || "Event"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height={310}
          width={550}
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {eventType ? (
              <div className="inline-block rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm text-gray-700 dark:text-gray-300 capitalize">
                {eventType.replace("-", " ")}
              </div>
            ) : null}
            {name ? (
              <h1 className="text-4xl font-bold tracking-tighter mb-8 text-gray-900 dark:text-white">
                {name}
              </h1>
            ) : null}
            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base text-gray-700 dark:text-gray-300">
              <dd className="font-semibold text-gray-900 dark:text-white">
                Date
              </dd>
              <div>
                {eventDate && <dt>{eventDate}</dt>}
                {eventTime && <dt>{eventTime}</dt>}
              </div>
            </dl>
          {details && details.length > 0 && (
            <div className="prose max-w-none prose-gray dark:prose-invert">
              <PortableText value={details} />
            </div>
          )}
        </div>
      </div>
    </div>
  </main>
);
}