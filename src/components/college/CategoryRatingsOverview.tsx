import React from "react";
import { Box, Typography, Stack, Rating, Grid } from "@mui/material";
import { CategoryRatingAverage } from "@/types/college";

interface CategoryRatingsOverviewProps {
  categoryRatings?: Record<string, CategoryRatingAverage>;
}

/**
 * Format category label from snake_case
 */
const formatCategoryLabel = (key: string): string => {
  const labelMap: Record<string, string> = {
    disability_services: "Disability Services",
    academic_accomodations: "Academic Accommodations",
    physical_accessibility: "Physical Accessibility",
    accessible_housing: "Accessible Housing",
    transportation: "Transportation",
    digital_accessibility: "Digital Accessibility",
    lgbtq_inclusion: "LGBTQ+ Inclusion",
    racial_cultural_inclusion: "Racial & Cultural Inclusion",
    religious_tolerance: "Religious Tolerance",
    campus_diversity: "Campus Diversity",
    peer_support: "Peer Support",
    liberal_climate: "Liberal Climate",
  };
  return labelMap[key] || key;
};

/**
 * Define the order of categories - grouped by theme
 * This ensures similar categories appear together
 */
const CATEGORY_ORDER = [
  // Accessibility & Physical Access
  "disability_services",
  "physical_accessibility",
  "accessible_housing",
  "transportation",
  "digital_accessibility",
  "academic_accomodations",

  // Inclusivity & Community
  "lgbtq_inclusion",
  "racial_cultural_inclusion",
  "religious_tolerance",
  "campus_diversity",
  "peer_support",
  "liberal_climate",
];

const CategoryRatingsOverview = ({
  categoryRatings,
}: CategoryRatingsOverviewProps) => {
  if (!categoryRatings || Object.keys(categoryRatings).length === 0) {
    return null;
  }

  // Sort by defined category order
  const sortedCategories = Object.entries(categoryRatings).sort(
    ([keyA], [keyB]) => {
      const indexA = CATEGORY_ORDER.indexOf(keyA);
      const indexB = CATEGORY_ORDER.indexOf(keyB);
      // If both are in the order list, use that order
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // If only one is in the order list, it comes first
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      // Otherwise, sort alphabetically
      return keyA.localeCompare(keyB);
    },
  );

  // Split into two columns
  const midpoint = Math.ceil(sortedCategories.length / 2);
  const leftColumn = sortedCategories.slice(0, midpoint);
  const rightColumn = sortedCategories.slice(midpoint);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="subtitle2"
        component="h2"
        sx={{
          fontWeight: 700,
          color: "text.primary",
          mb: 2,
          fontSize: "0.9rem",
        }}
      >
        Detailed Category Ratings
      </Typography>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={0}>
            {leftColumn.map(([category, data]) => (
              <Box
                key={category}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.primary",
                      fontWeight: 500,
                    }}
                  >
                    {formatCategoryLabel(category)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.8rem",
                    }}
                  >
                    {data.count} contributor{data.count > 1 ? "s" : ""}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    value={data.average}
                    readOnly
                    precision={0.1}
                    size="small"
                    sx={{
                      "& .MuiRating-icon": {
                        color: "#FFC107",
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      minWidth: "30px",
                      textAlign: "right",
                    }}
                  >
                    {data.average.toFixed(1)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={0}>
            {rightColumn.map(([category, data]) => (
              <Box
                key={category}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.primary",
                      fontWeight: 500,
                    }}
                  >
                    {formatCategoryLabel(category)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.8rem",
                    }}
                  >
                    {data.count} contributor{data.count > 1 ? "s" : ""}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    value={data.average}
                    readOnly
                    precision={0.1}
                    size="small"
                    sx={{
                      "& .MuiRating-icon": {
                        color: "#FFC107",
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      minWidth: "30px",
                      textAlign: "right",
                    }}
                  >
                    {data.average.toFixed(1)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryRatingsOverview;
