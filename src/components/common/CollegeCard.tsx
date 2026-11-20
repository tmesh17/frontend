import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import BasicButton from "./BasicButton";
import { College } from "@/types/college";
import RatingsSection from "./RatingsSection";
import AddReviewButton from "./AddReviewButton";
import { FEATURE_FLAGS } from "@/config/flag";

type CollegeCardProps = {
  college: College;
  variant?: "card" | "hero";
  showHover?: boolean;
  onCompareToggle?: (college: College) => void;
  isSelected?: boolean;
};

/**College Card component can have varients for cards or make the card into a hero for the college page */
const CollegeCard = (props: CollegeCardProps) => {
  const {
    college,
    variant = "card",
    showHover = variant === "card",
    onCompareToggle,
    isSelected = false,
  } = props;

  return (
    <Card
      component={variant === "hero" ? "section" : "article"}
      sx={{
        width: "100%",
        borderRadius: variant === "hero" ? 2 : 4,
        overflow: "hidden",
        boxShadow: isSelected ? 4 : 2,
        height: variant === "card" ? "100%" : "auto",
        display: "flex",
        flexDirection: "column",
        borderLeft:
          variant === "card"
            ? `6px solid ${college.brand_color || "#9C27B0"}`
            : "none",
        ...(showHover && {
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-4px)",
          },
        }),
      }}
    >
      {/* Color accent bar for hero variant */}
      {variant === "hero" && (
        <Box
          sx={{
            height: 4,
            bgcolor: college.brand_color || "#9C27B0",
            width: "100%",
          }}
        />
      )}

      <CardContent
        sx={{
          p: variant === "card" ? 2 : 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* header section with the college name and location */}
        <header>
          <Typography
            variant={variant === "card" ? "h6" : "h5"}
            component={
              variant === "hero" ? "h1" : variant === "card" ? "h3" : "h3"
            }
            sx={{
              fontWeight: variant === "card" ? 700 : 800,
              color: "text.primary",
              mb: 0.25,
              fontSize: variant === "card" ? "1rem" : undefined,
            }}
          >
            {college.name}
          </Typography>
          <Typography
            variant={variant === "card" ? "caption" : "body2"}
            component="p"
            color="text.secondary"
            sx={{ fontWeight: 550, mb: 0.25 }}
          >
            {college.city}, {college.state}
          </Typography>
          {college.university_type && (
            <Typography
              variant="caption"
              component="p"
              color="text.secondary"
              sx={{
                fontStyle: "italic",
                fontSize: variant === "card" ? "0.75rem" : "0.75rem",
              }}
            >
              {college.university_type}
            </Typography>
          )}
        </header>

        {/* Ratings Section */}
        <Box sx={{ my: variant === "card" ? 1 : 2 }}>
          <RatingsSection
            ratings={college.ratings || {}}
            categoryRatings={college.category_rating_averages}
            variant={variant === "hero" ? "full" : "compact"}
          />
        </Box>

        {/* Footer with reviews count and actions */}
        <Box
          component={variant === "hero" ? "div" : "footer"}
          sx={{
            mt: variant === "card" ? "auto" : 0,
            pt: variant === "card" ? 1.5 : 3,
            display: "flex",
            justifyContent: variant === "hero" ? "flex-start" : "space-between",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {variant === "card" && (
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
              {college.num_reviews} reviews
            </Typography>
          )}

          {variant === "card" ? (
            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              {onCompareToggle && (
                <BasicButton
                  text={isSelected ? "✓ Compare" : "+ Compare"}
                  onClick={() => onCompareToggle(college)}
                  ariaLabel={`Compare ${college.name}`}
                  aria-pressed={isSelected}
                  sx={{
                    fontSize: "0.875rem",
                    px: 1,
                    py: 0.4,
                    bgcolor: isSelected ? "primary.main" : "inherit",
                    color: isSelected ? "white" : "primary.main",
                    border: `1px solid ${isSelected ? "primary.main" : "primary.main"}`,
                  }}
                />
              )}
              <BasicButton
                text="See More"
                href={`/colleges/${college.slug}`}
                ariaLabel={`See more about ${college.name}`}
                sx={{ fontSize: "0.75rem", px: 1.5, py: 0.4 }}
              />
            </Box>
          ) : (
            <>
              <AddReviewButton schoolSlug={college.slug} />
              {FEATURE_FLAGS.isCedarLinked && (
                <BasicButton
                  color="secondary"
                  text="CeDaR"
                  href={`https://www.cedardatabase.org/institution/${college.name
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-")}`}
                />
              )}
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;
