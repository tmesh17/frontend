import { Box, Typography } from "@mui/material";
import { StarRatingLabelBox } from "./StarRatingLabelBox";
import { Ratings } from "@/types/ratings";
import { CategoryRatingAverage } from "@/types/college";
import CategoryRatingsOverview from "../college/CategoryRatingsOverview";

interface RatingsSectionProps {
  ratings: Ratings;
  categoryRatings?: Record<string, CategoryRatingAverage>;
  variant?: "compact" | "full";
}

const RatingsSection = (props: RatingsSectionProps) => {
  const { ratings, categoryRatings, variant = "compact" } = props;

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "grayscale.light", // Light gray background for the ratings section
          borderRadius: 3, // Rounded corners for the gray box
          p: 2, // Padding inside the gray box
          my: 2, // Margin top/bottom to separate from header/footer
        }}
      >
        <Box
          component="dl"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            m: 0,
          }}
        >
          {/* Accessibility Rating */}
          <StarRatingLabelBox
            rating={ratings.a11y_overall || 0}
            label="Accessibility"
          />

          {/* Safety Rating*/}
          <StarRatingLabelBox
            rating={ratings.safety_overall || 0}
            label="Safety"
          />

          {/* Inclusivity Rating */}
          <StarRatingLabelBox
            rating={ratings.inclusivity_overall || 0}
            label="Inclusivity"
          />
        </Box>

        {/* Category Ratings Overview - only show in full variant */}
        {variant === "full" && categoryRatings && (
          <Box sx={{ mt: 2 }}>
            <CategoryRatingsOverview categoryRatings={categoryRatings} />
          </Box>
        )}
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          display: "block",
          mt: 1,
          fontStyle: "italic",
        }}
      >
        Based on community reviews
      </Typography>
    </Box>
  );
};
export default RatingsSection;
