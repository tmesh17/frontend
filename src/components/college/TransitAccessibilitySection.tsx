/**
 * TransitAccessibilitySection
 *
 * Displays city-level transit accessibility data from U-M Public Transit Dashboard.
 */

import { Box, Typography, Paper, LinearProgress, Link } from "@mui/material";
import { TransitAccessibility } from "@/types/college";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";

interface TransitAccessibilitySectionProps {
  data?: TransitAccessibility;
  brandColor?: string;
}

export default function TransitAccessibilitySection({
  data,
  brandColor,
}: TransitAccessibilitySectionProps) {
  if (!data) {
    return null;
  }

  const accentColor = brandColor || "#1976D2";

  // Define score ranges and colors
  const getScoreColor = (score: number) => {
    if (score >= 75) return "#2E7D32"; // Green - Excellent
    if (score >= 60) return "#F57C00"; // Orange - Good
    if (score >= 45) return "#D32F2F"; // Red - Fair
    return "#C62828"; // Dark Red - Poor
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 45) return "Fair";
    return "Needs Improvement";
  };

  const metrics = [
    {
      label: "Accommodation",
      value: data.accommodation,
      description: "Wheelchair accessibility & elevators",
    },
    {
      label: "Adjacency",
      value: data.adjacency,
      description: "Distance to nearest stops",
    },
    {
      label: "Availability",
      value: data.availability,
      description: "Frequency of service",
    },
    {
      label: "Affordability",
      value: data.affordability,
      description: "Cost of passes/fares",
    },
    {
      label: "Acceptability",
      value: data.acceptability,
      description: "Safety, stops, timetables",
    },
  ];

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
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <DirectionsTransitIcon
          sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" } }}
        />
        Public Transit Accessibility
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 3,
          fontSize: "0.9375rem",
          fontStyle: "italic",
        }}
      >
        City-level accessibility data for {data.city}, {data.state}
        {data.source && (
          <>
            {" "}
            ·{" "}
            <Link
              href="https://transitaccessibility.kines.umich.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.source}
            </Link>
          </>
        )}
      </Typography>

      {/* Overall Score */}
      {data.overall_score !== undefined && (
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
                color: getScoreColor(data.overall_score),
                fontSize: "2.5rem",
              }}
            >
              {data.overall_score.toFixed(1)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: getScoreColor(data.overall_score),
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
            }}
          >
            {getScoreLabel(data.overall_score)} transit accessibility for the{" "}
            {data.city} area
          </Typography>
        </Paper>
      )}

      {/* Detailed Metrics */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {metrics.map(
          (metric) =>
            metric.value !== undefined && (
              <Box key={metric.label}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        fontSize: "0.9375rem",
                      }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.8125rem",
                      }}
                    >
                      {metric.description}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: getScoreColor(metric.value),
                      fontSize: "0.9375rem",
                      minWidth: "45px",
                      textAlign: "right",
                    }}
                  >
                    {metric.value.toFixed(0)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  sx={{
                    height: 8,
                    borderRadius: 1,
                    backgroundColor: "#E0E0E0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: getScoreColor(metric.value),
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>
            ),
        )}
      </Box>

      {/* Info Box */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mt: 3,
          bgcolor: "#F5F5F5",
          borderRadius: 1,
          borderLeft: `4px solid #9E9E9E`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.8125rem",
            lineHeight: 1.6,
            display: "block",
          }}
        >
          This data reflects the city&apos;s overall public transit system
          accessibility based on federal data. Campus-specific transit access
          may vary. Contact the Disability Services Office for campus-specific
          information.
        </Typography>
      </Paper>
    </Box>
  );
}
