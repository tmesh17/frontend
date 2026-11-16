"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import NotFound from "../not-found";
import { FEATURE_FLAGS } from "@/config/flag";
import SearchHero from "@/components/search/Hero";
import CollegeCard from "@/components/common/CollegeCard";
import { College } from "@/types/college";
import { filterColleges } from "@/lib/api";

function SearchContent() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [searchResults, setSearchResults] = useState<College[]>([]);

  const loadData = useCallback(async () => {
    if (!FEATURE_FLAGS.isSearchEnabled) return;
    setLoading(true);
    try {
      const data = await filterColleges({ has_data: true });
      setColleges(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "We're having trouble loading the colleges right now.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!FEATURE_FLAGS.isSearchEnabled) return;
    loadData();
  }, [loadData]);

  const handleSearchSelect = (college: College | null) => {
    if (college) {
      // Check if already in search results
      const alreadySelected = searchResults.some(c => c.slug === college.slug);
      if (!alreadySelected) {
        setSearchResults([...searchResults, college]);
      }
    }
  };

  const removeSearchResult = (slug: string) => {
    setSearchResults(searchResults.filter(c => c.slug !== slug));
  };

  const handleCompareToggle = (college: College) => {
    setSelectedColleges((prev) => {
      const isSelected = prev.some((c) => c.slug === college.slug);
      if (isSelected) {
        return prev.filter((c) => c.slug !== college.slug);
      } else {
        return [...prev, college];
      }
    });
  };

  const isCollegeSelected = (college: College) => {
    return selectedColleges.some((c) => c.slug === college.slug);
  };

  if (!FEATURE_FLAGS.isSearchEnabled) return <NotFound />;

  return (
    <Container id="search-page" sx={{ mt: 4, mb: 8 }}>
      <SearchHero onSearchSelect={handleSearchSelect} />

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mt: 6, mb: 4, fontWeight: 600, color: "text.primary" }}
          >
            Search Results
          </Typography>

          <Grid
            container
            spacing={2}
            component="ul"
            aria-label="Search results"
          >
            {searchResults.map((college) => (
              <Grid
                key={college.slug}
                size={{ xs: 12, sm: 6, md: 4 }}
                component="li"
              >
                <Box sx={{ position: "relative" }}>
                  <CollegeCard
                    college={college}
                    onCompareToggle={handleCompareToggle}
                    isSelected={isCollegeSelected(college)}
                  />
                  <Box
                    onClick={() => removeSearchResult(college.slug)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      cursor: "pointer",
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    ✕
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Explore Universities Section */}
      <Typography
        variant="h5"
        component="h2"
        sx={{ mt: 6, mb: 4, fontWeight: 600, color: "text.primary" }}
      >
        Explore Universities
      </Typography>

      {/* College Results Grid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            component="ul"
            aria-label="List of colleges"
          >
            {colleges.map((college) => (
              <Grid
                key={college.slug}
                size={{ xs: 12, sm: 6, md: 4 }}
                component="li"
              >
                <CollegeCard
                  college={college}
                  onCompareToggle={handleCompareToggle}
                  isSelected={isCollegeSelected(college)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Comparison Section */}
          {selectedColleges.length > 0 && (
            <Paper
              sx={{
                mt: 6,
                p: 3,
                bgcolor: "background.paper",
                border: "2px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 3, fontWeight: 600 }}
              >
                Compare ({selectedColleges.length})
              </Typography>

              {/* Comparison placeholder */}
              <Box sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 1, textAlign: "center" }}>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Comparing: {selectedColleges.map((c) => c.name).join(", ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comparison details coming soon...
                </Typography>
              </Box>
            </Paper>
          )}
        </>
      )}
    </Container>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <Container sx={{ mt: 10, textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading Search...</Typography>
        </Container>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
