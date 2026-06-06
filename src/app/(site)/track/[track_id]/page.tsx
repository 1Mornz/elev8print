"use client";

import { useParams } from "next/navigation";
import TrackClient from "../TrackClient";

export default function TrackOrderPage() {
  const params = useParams();
  const trackId = params.track_id as string;
  return <TrackClient trackId={trackId} />;
}
