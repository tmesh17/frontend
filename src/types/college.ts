/*
College type definition, can be expanded as needed to include scores, urls, etc.
*/
import { Ratings } from "./ratings";

export interface College {
  id: number;
  slug: string;
  name: string;
  city: string;
  state: string; //note that this is the state abbreviation, e.g. "CA" for California
  // below are optional fields that may not be present in all contexts
  university_type?: string; // e.g., "Public Research University"
  brand_color?: string; // Hex color for university branding
  ratings?: Ratings;
  num_reviews?: number;
}
