import React from "react";
import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export default function AdminPage() {
  return <NextStudio config={config} target='_blank' />;
}
// "@sanity/client": "^5.4.2",
// "@sanity/image-url": "^1.0.2",