import { notFound } from "next/navigation";
import { getTrack } from "@/_lib/university/data";
import TrackPageClient from "./track-client";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ faculty: string; track: string }>;
}) {
  const { faculty, track } = await params;

  const trackData = getTrack(faculty, track);

  if (!trackData) {
    notFound();
  }

  return (
    <TrackPageClient
      faculty={faculty}
      track={track}
      trackTitle={trackData.title}
    />
  );
}
