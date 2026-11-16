/*
College type definition, can be expanded as needed to include scores, urls, etc.
*/
import { Ratings } from "./ratings";

export interface TransitAccessibility {
  city?: string;
  state?: string;
  overall_score?: number;
  accommodation?: number;
  adjacency?: number;
  availability?: number;
  affordability?: number;
  acceptability?: number;
  source?: string;
}

export interface CostOfLiving {
  median_rent?: number;
  median_home_price?: number;
  groceries_index?: number;
  utilities_index?: number;
  transportation_index?: number;
  overall_cost_of_living_index?: number;
  source?: string;
}

export interface PoliticalClimate {
  democratic_share?: number;
  republican_share?: number;
  independent_share?: number;
  lgbtq_friendly?: number;
  political_leaning?: "blue" | "purple" | "red";
  election_year?: number;
  source?: string;
}

export interface Diversity {
  white_percentage?: number;
  black_percentage?: number;
  hispanic_percentage?: number;
  asian_percentage?: number;
  other_percentage?: number;
  source?: string;
}

export interface CityOverview {
  transit_accessibility?: TransitAccessibility;
  diversity?: Diversity;
}

export interface AccessibilityInfo {
  dso_phone?: string;
  dso_email?: string;
  dso_url?: string;
  has_disability_cultural_center?: boolean;
  has_deaf_culture_center?: boolean;
  has_disability_studies_program?: boolean;
  has_asl_program?: boolean;
  accommodations_provided?: string[];
  campus_accessibility_notes?: string;
  counseling_services?: string;
  health_services?: string;
  city_overview?: CityOverview;
}

export interface UniversitySummary {
  website_url?: string;
  school_type?: string; // e.g., "4-year", "2-year"
  total_enrollment?: number;
  undergrad_enrollment?: number;
  degrees_awarded?: string[];
  school_ownership?: string; // e.g., "Public", "Private nonprofit"
  student_demographics?: {
    white_percentage?: number;
    black_percentage?: number;
    hispanic_percentage?: number;
    asian_percentage?: number;
    american_indian_percentage?: number;
    multiracial_percentage?: number;
    other_percentage?: number;
    first_generation_percentage?: number;
    international_students_percentage?: number;
    completion_rate?: number;
  };
}

export interface CategoryRatingAverage {
  average: number;
  count: number; // Number of reviews that rated this category
}

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
  accessibility_info?: AccessibilityInfo; // Accessibility info from CeDaR and other sources
  university_summary?: UniversitySummary; // Campus overview info from College Scorecard
  category_rating_averages?: Record<string, CategoryRatingAverage>; // Per-category rating averages with contributor counts
}
