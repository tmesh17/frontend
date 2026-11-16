/**
 * CityOverviewSection
 *
 * Displays city-level information including transit accessibility and diversity.
 */

import { Box, Typography, Paper, LinearProgress, Link, Grid, Card, CardContent, Tabs, Tab } from "@mui/material";
import { CityOverview } from "@/types/college";
import { useState } from "react";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import PeopleIcon from "@mui/icons-material/People";

interface CityOverviewSectionProps {
  data?: CityOverview;
  city?: string;
  state?: string;
  brandColor?: string;
}

export default function CityOverviewSection({
  data,
  city,
  state,
  brandColor,
}: CityOverviewSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const accentColor = brandColor || "#1976D2";

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "#2E7D32";
    if (score >= 60) return "#F57C00";
    if (score >= 45) return "#D32F2F";
    return "#C62828";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 45) return "Fair";
    return "Needs Improvement";
  };

  return (
    <Box component="section" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 700,
          mb: 3,
          fontSize: { xs: "1.75rem", md: "2.125rem" },
          color: "text.primary",
        }}
      >
        {city}, {state} — City Overview
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 3,
          fontSize: "0.9375rem",
        }}
      >
        Information about the city where the college is located, including transit accessibility and community demographics.
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          {data.transit_accessibility && (
            <Tab
              icon={<DirectionsTransitIcon sx={{ mr: 1 }} />}
              label="Transit"
              iconPosition="start"
              sx={{ textTransform: "none" }}
            />
          )}
          {data.diversity && (
            <Tab
              icon={<PeopleIcon sx={{ mr: 1 }} />}
              label="Diversity"
              iconPosition="start"
              sx={{ textTransform: "none" }}
            />
          )}
        </Tabs>
      </Box>

      {/* TRANSIT TAB */}
      {activeTab === 0 && data.transit_accessibility && (
        <Box>
          {data.transit_accessibility.overall_score !== undefined && (
            <>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  mb: 3,
                  bgcolor: `${accentColor}08`,
                  borderLeft: `5px solid ${accentColor}`,
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 1 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: getScoreColor(data.transit_accessibility.overall_score),
                      fontSize: "2.5rem",
                    }}
                  >
                    {data.transit_accessibility.overall_score.toFixed(1)}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: getScoreColor(data.transit_accessibility.overall_score),
                      mb: 0.5,
                    }}
                  >
                    / 100
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9375rem",
                    mb: 2,
                  }}
                >
                  {getScoreLabel(data.transit_accessibility.overall_score)} public transit accessibility
                </Typography>
                {data.transit_accessibility.source && (
                  <Link href="https://transitaccessibility.kines.umich.edu/" target="_blank" rel="noopener noreferrer" sx={{ fontSize: "0.8rem" }}>
                    Data from {data.transit_accessibility.source}
                  </Link>
                )}
              </Paper>

              {/* Transit Metrics */}
              <Grid container spacing={2}>
                {[
                  { label: "Accommodation", value: data.transit_accessibility.accommodation, desc: "Wheelchair accessibility" },
                  { label: "Adjacency", value: data.transit_accessibility.adjacency, desc: "Distance to stops" },
                  { label: "Availability", value: data.transit_accessibility.availability, desc: "Service frequency" },
                  { label: "Affordability", value: data.transit_accessibility.affordability, desc: "Cost of transit" },
                  { label: "Acceptability", value: data.transit_accessibility.acceptability, desc: "Safety & amenities" },
                ].map(
                  (metric) =>
                    metric.value !== undefined && (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={metric.label}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {metric.label}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1.5 }}>
                              {metric.desc}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: getScoreColor(metric.value),
                                fontSize: "1.25rem",
                                mb: 1,
                              }}
                            >
                              {metric.value.toFixed(0)}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={metric.value}
                              sx={{
                                height: 6,
                                borderRadius: 1,
                                backgroundColor: "#E0E0E0",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: getScoreColor(metric.value),
                                },
                              }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                )}
              </Grid>
            </>
          )}
        </Box>
      )}

      {/* DIVERSITY TAB */}
      {activeTab === 1 && data.diversity && (
        <Box>
          <Grid container spacing={2}>
            {[
              { label: "White", value: data.diversity.white_percentage, color: "#5E35B1" },
              { label: "Black/African American", value: data.diversity.black_percentage, color: "#1976D2" },
              { label: "Hispanic/Latino", value: data.diversity.hispanic_percentage, color: "#F57C00" },
              { label: "Asian", value: data.diversity.asian_percentage, color: "#2E7D32" },
              { label: "Other/Mixed", value: data.diversity.other_percentage, color: "#C62828" },
            ].map(
              (race) =>
                race.value !== undefined && (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={race.label}>
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {race.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: race.color }}>
                          {race.value.toFixed(1)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={race.value}
                        sx={{
                          height: 8,
                          borderRadius: 1,
                          backgroundColor: "#E0E0E0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: race.color,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                )
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
