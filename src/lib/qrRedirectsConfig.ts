import { z } from "zod";

const destinationsSchema = z.record(z.string(), z.string()).optional();

function parseDestinations(rawDestinations: string | undefined): Record<string, string> | undefined {
  if (rawDestinations === undefined) return undefined;

  let destinations: unknown;
  try {
    destinations = JSON.parse(rawDestinations);
  } catch (error) {
    throw new Error("QR_REDIRECTS_JSON must be valid JSON", { cause: error });
  }

  return destinationsSchema.parse(destinations);
}

export const qrRedirectDestinations = parseDestinations(process.env.QR_REDIRECTS_JSON);
