import { College } from "@/types/college";

export const MAX_COMPARE = 3;

// What the compare table needs for each college. A null means "we don't have
// data for this yet", and the table shows a placeholder instead of a number.
export interface CompareCollege {
  id: string;
  name: string;
  city: string;
  state: string;
  slug: string;
  has_disability_services: boolean | null;
  disability_services_url: string | null;
  ratings: {
    ally_overall: number | null; // read from college.ratings.a11y_overall
    safety_overall: number | null;
    inclusivity_overall: number | null;
  };
}

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function nonEmptyText(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

// Number.isFinite rejects NaN and Infinity, so the table never shows "NaN / 5"
function numberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

// The ONLY place that maps your College data to the compare table.
export function toCompareCollege(college: College): CompareCollege {
  const raw = college as unknown as Record<string, unknown>;
  const ratings = (raw.ratings ?? {}) as Record<string, unknown>;
  const info = (raw.accessibility_info ?? {}) as Record<string, unknown>;

  const websiteUrl = nonEmptyText(info.dso_url);

  // Only count real disability office contact info (website, phone, email).
  // A cultural center is not a Disability Services Office, so it is not included.
  const hasDisabilityServices =
    websiteUrl !== null ||
    nonEmptyText(info.dso_phone) !== null ||
    nonEmptyText(info.dso_email) !== null;

  return {
    id: college.slug,
    name: college.name,
    city: text(raw.city),
    state: text(raw.state),
    slug: college.slug,
    has_disability_services: hasDisabilityServices ? true : null,
    disability_services_url: websiteUrl,
    ratings: {
      ally_overall: numberOrNull(ratings.a11y_overall),
      safety_overall: numberOrNull(ratings.safety_overall),
      inclusivity_overall: numberOrNull(ratings.inclusivity_overall),
    },
  };
}
