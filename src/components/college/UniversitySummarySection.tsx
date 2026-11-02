/**
 * UniversitySummarySection
 *
 * Displays campus overview information.
 * WCAG AAA compliant: proper text sizing (min 14px body), high contrast, clear visual separation.
 */

import { Box, Typography, Link, Grid } from "@mui/material";
import { UniversitySummary } from "@/types/college";
import LinkIcon from "@mui/icons-material/Link";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";

interface UniversitySummaryProps {
  summary?: UniversitySummary;
  brandColor?: string;
}

export default function UniversitySummarySection({ summary, brandColor }: UniversitySummaryProps) {
  if (!summary) {
    return null;
  }

  const accentColor = brandColor || "#1976D2";

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
        Campus Information
      </Typography>

      {/* Key Stats Grid - Clean, readable layout */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {summary.total_enrollment && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <GroupsIcon sx={{ color: accentColor, fontSize: "1.5rem" }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    fontSize: "0.8125rem",
                    textTransform: "uppercase",
                    letterSpacing: 0.3,
                  }}
                >
                  Total Enrollment
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  fontSize: "1.5rem",
                }}
              >
                {summary.total_enrollment.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        )}

        {summary.undergrad_enrollment && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <SchoolIcon sx={{ color: accentColor, fontSize: "1.5rem" }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    fontSize: "0.8125rem",
                    textTransform: "uppercase",
                    letterSpacing: 0.3,
                  }}
                >
                  Undergraduates
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  fontSize: "1.5rem",
                }}
              >
                {summary.undergrad_enrollment.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        )}

        {summary.school_type && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <SchoolIcon sx={{ color: accentColor, fontSize: "1.5rem" }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    fontSize: "0.8125rem",
                    textTransform: "uppercase",
                    letterSpacing: 0.3,
                  }}
                >
                  School Type
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  fontSize: "1rem",
                }}
              >
                {summary.school_type}
              </Typography>
            </Box>
          </Grid>
        )}

        {summary.school_ownership && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <BusinessIcon sx={{ color: accentColor, fontSize: "1.5rem" }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    fontSize: "0.8125rem",
                    textTransform: "uppercase",
                    letterSpacing: 0.3,
                  }}
                >
                  Ownership
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  fontSize: "1rem",
                }}
              >
                {summary.school_ownership}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Additional Info - Left-aligned, spacious */}
      {(summary.degrees_awarded || summary.website_url) && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {summary.degrees_awarded && summary.degrees_awarded.length > 0 && (
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "text.primary",
                  fontSize: "0.9375rem",
                }}
              >
                Degrees Offered
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  lineHeight: 1.7,
                  fontSize: "0.9375rem",
                }}
              >
                {summary.degrees_awarded.join(", ")}
              </Typography>
            </Box>
          )}

          {summary.website_url && (
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "text.primary",
                  fontSize: "0.9375rem",
                }}
              >
                Official Website
              </Typography>
              <Link
                href={summary.website_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  textDecoration: "none",
                  fontWeight: 500,
                  color: accentColor,
                  fontSize: "0.9375rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                <LinkIcon sx={{ fontSize: "1rem" }} />
                Visit Campus Website
              </Link>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

