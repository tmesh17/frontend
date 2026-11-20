import { Box, Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

interface StarRatingLabelBoxProps {
  rating: number;
  label: string;
}

/**
 * Get color for each rating type
 * Accessibility: Green, Safety: Red, Inclusivity: Purple
 */
const getRatingColor = (label: string): string => {
  const colorMap: Record<string, string> = {
    Accessibility: "#2E7D32",
    Safety: "#C62828",
    Inclusivity: "#9C27B0",
  };
  return colorMap[label] || "#1976D2"; // Default to blue if label doesn't match
};

export const StarRatingLabelBox = ({
  rating,
  label,
}: StarRatingLabelBoxProps) => {
  const ratingColor = getRatingColor(label);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="dd"
        sx={{
          m: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // This centers the icon+text group
          color: "text.primary",
        }}
      >
        <StarRateRoundedIcon sx={{ color: ratingColor }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, lineHeight: 1, color: ratingColor }}
        >
          {rating}
          <span className="sr-only"> out of 5</span>
        </Typography>
      </Box>
      <Typography
        component="dt"
        variant="caption"
        sx={{ color: "text.secondary" }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StarRatingLabelBox;
