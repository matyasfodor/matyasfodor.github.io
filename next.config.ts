import type { NextConfig } from "next";
import { qrRedirectDestinations } from "./src/lib/qrRedirectsConfig";

// Importing and evaluating this at startup makes invalid redirect configuration
// fail `next dev` and `next build`, before the application begins serving traffic.
void qrRedirectDestinations;

const nextConfig: NextConfig = {};

export default nextConfig;
