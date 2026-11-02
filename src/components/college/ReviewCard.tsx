import React from "react";
import {
  Card,
  Typography,
  Box,
  Stack,
  Rating,
  Chip,
} from "@mui/material";
import { ReviewEntry } from "@/types/review_entry";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ReviewCardProps {
  review: ReviewEntry;
}

/**
 * Formats years into a readable string
 * e.g., "2020-2024" or "2022-present"
 */
const formatAttendanceYears = (startYear?: number, endYear?: number): string => {
  if (!startYear && !endYear) return "";
  if (startYear && !endYear) return `${startYear}-present`;
  if (startYear && endYear) return `${startYear}-${endYear}`;
  return "";
};

/**
 * Format relationship to university for display
 */
const formatRelationship = (rel?: string): string => {
  if (!rel) return "";
  const map: Record<string, string> = {
    current_student: "Current Student",
    former_student: "Former Student",
    alumni: "Alumni",
    faculty: "Faculty",
    staff: "Staff",
    other: "Other",
  };
  return map[rel] || rel;
};

/**
 * Get color for each topic for visual differentiation
 */
const getTopicColor = (topic: string): { bg: string; text: string; border: string } => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    "disability_services": { bg: "#E8F5E9", text: "#1B5E20", border: "#4CAF50" },
    "physical_accessibility": { bg: "#E3F2FD", text: "#0D47A1", border: "#2196F3" },
    "housing": { bg: "#FCE4EC", text: "#880E4F", border: "#E91E63" },
    "transportation": { bg: "#FFF3E0", text: "#E65100", border: "#FF9800" },
    "lgbtq_inclusion": { bg: "#F3E5F5", text: "#4A148C", border: "#9C27B0" },
    "safety": { bg: "#FFEBEE", text: "#B71C1C", border: "#F44336" },
    "academic_accomodations": { bg: "#E0F2F1", text: "#004D40", border: "#009688" },
    "campus_culture": { bg: "#FFF8E1", text: "#F57F17", border: "#FBC02D" },
  };
  return colorMap[topic] || { bg: "#F5F5F5", text: "#424242", border: "#BDBDBD" };
};

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

const ReviewCard = ({ review }: ReviewCardProps) => {
  const attendanceYears = formatAttendanceYears(
    review.attendance_start_year,
    review.attendance_end_year
  );

  // Filter out null/undefined reviewer context fields
  const reviewerContextItems = review.reviewer_context
    ? Object.entries(review.reviewer_context).filter(
        ([, value]) => value !== null && value !== undefined && value !== ""
      )
    : [];

  return (
    <Card
      component="article"
      variant="outlined"
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        border: "1px solid #E0E0E0",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* LEFT SIDEBAR: Reviewer Profile */}
      <Box
        sx={{
          width: { xs: "100%", sm: "280px" },
          bgcolor: "#F8F9FA",
          p: 2.5,
          borderRight: { xs: "none", sm: "1px solid #E0E0E0" },
          borderBottom: { xs: "1px solid #E0E0E0", sm: "none" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Reviewer Status Badge */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
          <CheckCircleIcon
            sx={{
              fontSize: "1.2rem",
              color: "#4CAF50",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: "#2E7D32",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Verified Review
          </Typography>
        </Box>

        {/* Relationship & Years */}
        {review.relationship_to_university && (
          <Box sx={{ mb: 2.5 }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                display: "block",
                mb: 0.5,
              }}
            >
              Status
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              {formatRelationship(review.relationship_to_university)}
            </Typography>
            {attendanceYears && (
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    display: "block",
                    mb: 0.25,
                    fontSize: "0.65rem",
                  }}
                >
                  Years Attended
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                >
                  {attendanceYears}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Reviewer Demographics */}
        {reviewerContextItems.length > 0 && (
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                display: "block",
                mb: 1,
              }}
            >
              About This Reviewer
            </Typography>
            <Stack spacing={1}>
              {reviewerContextItems.map(([key, value]) => {
                let displayLabel = "";
                let displayValue = value;

                switch (key) {
                  case "age_category":
                    displayLabel = "Age";
                    break;
                  case "race_ethnicity":
                    displayLabel = "Background";
                    break;
                  case "first_generation_student":
                    displayLabel = "First-Gen";
                    displayValue =
                      value === "yes" ||
                      value === true ||
                      value === "Yes" ||
                      value === "true"
                        ? "Yes"
                        : "No";
                    break;
                  case "disability_identity":
                    displayLabel = "Disability";
                    break;
                  case "lgbtq_identity":
                    displayLabel = "Identity";
                    break;
                  case "race_ethnicity_text":
                    return null; // Skip the additional text field
                }

                if (!displayLabel) return null;

                return (
                  <Box key={key}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        fontSize: "0.7rem",
                      }}
                    >
                      {displayLabel}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.primary",
                        fontWeight: 600,
                        display: "block",
                      }}
                    >
                      {displayValue}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* Review Date */}
        <Box sx={{ mt: "auto", pt: 2, borderTop: "1px solid #E0E0E0" }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            {review.review_date}
          </Typography>
        </Box>
      </Box>

      {/* RIGHT CONTENT: Review Details */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Overall Ratings */}
        {review.ratings && Object.keys(review.ratings).length > 0 && (
          <Box sx={{ mb: 3, pb: 2, borderBottom: "2px solid #E0E0E0" }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 1.5,
                fontSize: "0.95rem",
              }}
            >
              Overall Rating
            </Typography>
            <Stack spacing={1.5}>
              {Object.entries(review.ratings).map(([key, value]) => {
                const labels: Record<string, string> = {
                  accessibility: "Accessibility",
                  safety: "Safety",
                  inclusivity: "Inclusion",
                };
                const colors: Record<string, string> = {
                  accessibility: "#4CAF50",
                  safety: "#F44336",
                  inclusivity: "#9C27B0",
                };

                return (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "text.primary",
                        minWidth: "90px",
                      }}
                    >
                      {labels[key]}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Rating
                        value={value}
                        readOnly
                        size="small"
                        sx={{
                          "& .MuiRating-icon": {
                            color: colors[key],
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: colors[key],
                          minWidth: "25px",
                        }}
                      >
                        {value}/5
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* Experience Text */}
        {review.experience_text && (
          <Box sx={{ mb: 3, pb: 2, borderBottom: "2px solid #E0E0E0" }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 1,
                fontSize: "0.95rem",
              }}
            >
              Experience
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                lineHeight: 1.6,
              }}
            >
              {review.experience_text}
            </Typography>
          </Box>
        )}

        {/* Topics Discussed */}
        {review.topics && review.topics.length > 0 && (
          <Box sx={{ mb: 3, pb: 2, borderBottom: "2px solid #E0E0E0" }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 1.5,
                fontSize: "0.95rem",
              }}
            >
              Topics Discussed
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {review.topics.map((topic, idx) => {
                const colors = getTopicColor(topic);
                // Format topic: replace underscores with spaces and capitalize
                const displayTopic = topic
                  .replace(/_/g, " ")
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
                
                return (
                  <Chip
                    key={idx}
                    label={displayTopic}
                    size="small"
                    sx={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      fontWeight: 600,
                      border: `2px solid ${colors.border}`,
                      fontSize: "0.8rem",
                      "& .MuiChip-label": {
                        px: 1.2,
                        py: 0.5,
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {/* Category Ratings */}
        {review.category_ratings &&
          Object.keys(review.category_ratings).length > 0 && (
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 1.5,
                  fontSize: "0.95rem",
                }}
              >
                Detailed Ratings
              </Typography>
              <Stack spacing={1.2}>
                {Object.entries(review.category_ratings).map(([category, rating]) => (
                  <Box
                    key={category}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1,
                      bgcolor: "rgba(0, 0, 0, 0.02)",
                      borderRadius: 1,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontWeight: 500,
                        flex: 1,
                      }}
                    >
                      {formatCategoryLabel(category)}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating
                        value={rating}
                        readOnly
                        size="small"
                        sx={{
                          "& .MuiRating-icon": {
                            color: "#FFC107",
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: "text.secondary",
                          minWidth: "25px",
                          textAlign: "right",
                        }}
                      >
                        {rating.toFixed(1)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
      </Box>
    </Card>
  );
};

export default ReviewCard;
