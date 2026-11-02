/*Review entry type definition for the new 6-step review form structure*/
import { Ratings } from "./ratings";

export interface ReviewerContext {
  age_category?: string | null;
  race_ethnicity?: string | null;
  race_ethnicity_text?: string | null;
  first_generation_student?: string | null;
  disability_identity?: string | null;
  lgbtq_identity?: string | null;
}

export interface ReviewEntry {
  id: string;
  review_date: string;
  // Step 1: University and Role
  relationship_to_university?: string;
  attendance_start_year?: number;
  attendance_end_year?: number;
  // Step 2: Overall Ratings
  ratings: Ratings;
  // Step 3: Written Experience
  experience_text?: string;
  // Step 4: Topics
  topics?: string[];
  // Step 5: Category Ratings
  category_ratings?: Record<string, number>;
  // Step 6: Optional Reviewer Context
  reviewer_context?: ReviewerContext;
}
