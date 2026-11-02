import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ReviewEntry } from "@/types/review_entry";

interface ReviewFiltersProps {
  reviews: ReviewEntry[];
  onFiltersChange: (filteredReviews: ReviewEntry[]) => void;
}

// Topic color map - using distinct, accessible colors
const TOPIC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  disability_services: { bg: "#E8F5E9", text: "#1B5E20", border: "#4CAF50" },
  physical_accessibility: { bg: "#E3F2FD", text: "#0D47A1", border: "#2196F3" },
  housing: { bg: "#FCE4EC", text: "#880E4F", border: "#E91E63" },
  transportation: { bg: "#FFF3E0", text: "#E65100", border: "#FF9800" },
  lgbtq_inclusion: { bg: "#F3E5F5", text: "#4A148C", border: "#9C27B0" },
  safety: { bg: "#FFEBEE", text: "#B71C1C", border: "#F44336" },
  academic_accomodations: { bg: "#E0F2F1", text: "#004D40", border: "#009688" },
  campus_culture: { bg: "#FFF8E1", text: "#F57F17", border: "#FBC02D" },
};

// Get all unique topics from reviews
const getAllTopics = (reviews: ReviewEntry[]): string[] => {
  const topicsSet = new Set<string>();
  reviews.forEach((review) => {
    review.topics?.forEach((topic) => topicsSet.add(topic));
  });
  return Array.from(topicsSet).sort();
};

// Format topic label
const formatTopicLabel = (topic: string): string => {
  return topic
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// All possible reviewer types from the form (regardless of whether reviews exist)
const ALL_REVIEWER_TYPES = [
  "current_student",
  "former_student",
  "alumni",
  "faculty",
  "staff",
  "other",
];

// Format reviewer type
const formatReviewerType = (type: string): string => {
  const map: Record<string, string> = {
    current_student: "Current Student",
    former_student: "Former Student",
    alumni: "Alumni",
    faculty: "Faculty",
    staff: "Staff",
    other: "Other",
  };
  return map[type] || type;
};

const ReviewFilters = ({ reviews, onFiltersChange }: ReviewFiltersProps) => {
  const [sortBy, setSortBy] = useState<"recent" | "oldest">("recent");
  const [selectedReviewerTypes, setSelectedReviewerTypes] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // Apply filters whenever any filter changes
  React.useEffect(() => {
    let filtered = [...reviews];

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.review_date).getTime();
      const dateB = new Date(b.review_date).getTime();
      return sortBy === "recent" ? dateB - dateA : dateA - dateB;
    });

    // Filter by reviewer type
    if (selectedReviewerTypes.length > 0) {
      filtered = filtered.filter((review) =>
        selectedReviewerTypes.includes(review.relationship_to_university || "")
      );
    }

    // Filter by topic
    if (selectedTopics.length > 0) {
      filtered = filtered.filter((review) => {
        if (!review.topics || review.topics.length === 0) return false;
        return selectedTopics.some((topic) => review.topics?.includes(topic));
      });
    }

    onFiltersChange(filtered);
  }, [sortBy, selectedReviewerTypes, selectedTopics, reviews]);

  const allTopics = getAllTopics(reviews);
  const activeFilterCount =
    (selectedReviewerTypes.length > 0 ? 1 : 0) +
    (selectedTopics.length > 0 ? 1 : 0);

  const handleClearTopicFilters = () => {
    setSelectedTopics([]);
  };

  const handleClearAllFilters = () => {
    setSortBy("recent");
    setSelectedReviewerTypes([]);
    setSelectedTopics([]);
  };

  return (
    <Box
      sx={{
        bgcolor: "#F8F9FA",
        p: 2.5,
        borderRadius: 2,
        mb: 3,
        border: "1px solid #E0E0E0",
      }}
    >
      <Stack spacing={2.5}>
        {/* Sort Section */}
        <Box>
          <FormControl fullWidth size="small">
            <FormLabel
              sx={{
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "text.primary",
                mb: 1,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Sort By
            </FormLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "oldest")}
              sx={{
                backgroundColor: "white",
              }}
            >
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Reviewer Type Filter */}
        <Box>
          <FormLabel
            sx={{
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "text.primary",
              mb: 1.5,
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Reviewer Type
          </FormLabel>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {ALL_REVIEWER_TYPES.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedReviewerTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReviewerTypes([
                          ...selectedReviewerTypes,
                          type,
                        ]);
                      } else {
                        setSelectedReviewerTypes(
                          selectedReviewerTypes.filter((t) => t !== type)
                        );
                      }
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ ml: 0.5, fontSize: "0.9rem" }}>
                    {formatReviewerType(type)}
                  </Typography>
                }
                sx={{ m: 0 }}
              />
            ))}
          </Box>
        </Box>

        {/* Topic Filter */}
        {allTopics.length > 0 && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <FormLabel
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: "text.primary",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Topics
              </FormLabel>
              {selectedTopics.length > 0 && (
                <Button
                  size="small"
                  startIcon={<ClearIcon />}
                  onClick={handleClearTopicFilters}
                  sx={{
                    textTransform: "none",
                    fontSize: "0.8rem",
                    color: "error.main",
                    "&:hover": {
                      bgcolor: "rgba(244, 67, 54, 0.05)",
                    },
                  }}
                >
                  Clear
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {allTopics.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                const colors = TOPIC_COLORS[topic];
                return (
                  <Chip
                    key={topic}
                    label={formatTopicLabel(topic)}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTopics(selectedTopics.filter((t) => t !== topic));
                      } else {
                        setSelectedTopics([...selectedTopics, topic]);
                      }
                    }}
                    variant={isSelected ? "filled" : "outlined"}
                    sx={{
                      backgroundColor: isSelected ? colors.bg : "white",
                      color: colors.text,
                      borderColor: colors.border,
                      borderWidth: "2px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: isSelected ? colors.bg : "#F5F5F5",
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {/* Active Filters & Clear All */}
        {activeFilterCount > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 1.5,
              borderTop: "1px solid #E0E0E0",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontStyle: "italic",
              }}
            >
              {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
            </Typography>
            <Button
              size="small"
              startIcon={<ClearIcon />}
              onClick={handleClearAllFilters}
              sx={{
                textTransform: "none",
                fontSize: "0.8rem",
                color: "text.secondary",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              Clear All
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default ReviewFilters;
