"use client";

import { use, useState, useEffect } from "react";
import ReviewCard from "@/components/college/ReviewCard";
import ReviewFilters from "@/components/college/ReviewFilters";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ReviewEntry } from "@/types/review_entry";
import { College } from "@/types/college";
import CollegeCard from "@/components/common/CollegeCard";
import AccessibilityInfoSection from "@/components/college/AccessibilityInfoSection";
import UniversitySummarySection from "@/components/college/UniversitySummarySection";
import { FEATURE_FLAGS } from "@/config/flag";
import NotFound from "@/app/not-found";
import SummaryCard from "@/components/college/SummaryCard";
import { getCollegeReviews, getCollege } from "@/lib/api";
import { loadData } from "@/lib/utils";

const REVIEWS_PER_PAGE = 10;

export default function CollegeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [allReviews, setAllReviews] = useState<ReviewEntry[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ReviewEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [college, setCollege] = useState<College | null>(null);

  //load colleges info from the backend
  useEffect(() => {
    if (!FEATURE_FLAGS.isCollegePageBackendEnabled) return;
    loadData(
      () => getCollege(slug),
      setCollege,
      setError,
      setLoading,
      "Failed to load college information.",
    )();
  }, [slug]);

  //load the reviews from the backend
  useEffect(() => {
    if (!FEATURE_FLAGS.isCollegePageBackendEnabled) return;
    loadData(
      () => getCollegeReviews(slug),
      (reviews) => {
        setAllReviews(reviews);
        setFilteredReviews(reviews);
        setCurrentPage(1); // Reset to first page when reviews load
      },
      setError,
      setLoading,
      "Failed to load college reviews.",
    )();
  }, [slug]);

  // Reset to first page when filters change
  const handleFiltersChange = (filtered: ReviewEntry[]) => {
    setFilteredReviews(filtered);
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const displayedReviews = filteredReviews.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to reviews section
      document.getElementById("reviews-header")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to reviews section
      document.getElementById("reviews-header")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // if the search flag is disabled, show the not found screen.
  if (!FEATURE_FLAGS.isSearchEnabled) {
    return <NotFound />;
  }

  return (
    <>
      {loading ? (
        //While data is loading show loading symbol
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error || !college ? (
        //Error or college not found
        <Typography color="error" textAlign="center">
          {error || "College not found."}
        </Typography>
      ) : (
        //Data loaded successfully
        <Container id="{slug}-page" sx={{ mt: 4, mb: 6 }}>
          {/**Hero version of the college card from the search page */}
          <CollegeCard variant="hero" college={college} />

          {/**University Summary Section (Campus Overview) */}
          <UniversitySummarySection summary={college.university_summary} brandColor={college.brand_color} />

          {/**Accessibility Information Section */}
          <AccessibilityInfoSection info={college.accessibility_info} brandColor={college.brand_color} />

          <Grid container spacing={3} py={3} alignItems="start">
            {/* Left Side: Summary Cards (NOT YET IMPLEMENTED, JUST UI PLACEHOLDER) */}
            {/*Stick summary cards to the top of the page so they are always visible as you scroll through reviews*/}
            {FEATURE_FLAGS.isReviewSummariesEnabled && ( //hide until feature flag is enabled
              <Grid
                size={{ xs: 12, md: 3 }}
                sx={{
                  position: { xs: "static", md: "sticky" }, //sticky only for desktop
                  top: { md: 80 },
                }}
              >
                <aside id="response-summaries">
                  <SummaryCard
                    title="Accommodations"
                    content="filler content"
                  />
                  <SummaryCard title="Inclusivity" content="filler content" />
                  <SummaryCard title="Safety" content="filler content" />
                </aside>
              </Grid>
            )}
            {/* Right Side: Reviews Grid */}
            <Grid
              size={{
                xs: 12,
                md: FEATURE_FLAGS.isReviewSummariesEnabled ? 9 : 12, //Take up full width if summary cards not enabled
              }}
            >
              <Box
                sx={{
                  mb: 4,
                }}
              >
                <Typography
                  id="reviews-header"
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: 800, mb: 3 }}
                >
                  Reviews ({filteredReviews.length})
                </Typography>
                {FEATURE_FLAGS.isReviewSortEnabled && ( //show filter component
                  <ReviewFilters
                    reviews={allReviews}
                    onFiltersChange={handleFiltersChange}
                  />
                )}
              </Box>
              <Box
                aria-labelledby="reviews-header"
                component="ul"
                sx={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minHeight: "400px", // Prevent layout shift when pagination changes
                }}
              >
                {/*Get reviews from backend as list items */}
                {displayedReviews.length > 0 ? (
                  displayedReviews.map((review) => (
                    <Box component="li" key={review.id}>
                      <ReviewCard review={review} />
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", py: 3, textAlign: "center" }}
                  >
                    No reviews match your current filters.
                  </Typography>
                )}
              </Box>

              {/* Pagination Controls */}
              {totalPages > 1 && displayedReviews.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    mt: 4,
                    pt: 3,
                    borderTop: "1px solid #E0E0E0",
                  }}
                >
                  <IconButton
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    sx={{
                      color: currentPage === 1 ? "action.disabled" : "primary.main",
                      "&:hover": {
                        bgcolor: currentPage === 1 ? "transparent" : "action.hover",
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      minWidth: "100px",
                      textAlign: "center",
                    }}
                  >
                    Page {currentPage} of {totalPages}
                  </Typography>

                  <IconButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    sx={{
                      color: currentPage === totalPages ? "action.disabled" : "primary.main",
                      "&:hover": {
                        bgcolor: currentPage === totalPages ? "transparent" : "action.hover",
                      },
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
