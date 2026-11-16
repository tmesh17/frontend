/**
 * DisabilityEnrollmentSection
 *
 * Displays comprehensive disability enrollment data for a college.
 * Includes breakdown by disability type and comparative context.
 */

import { Box, Typography, Card, CardContent, Grid, LinearProgress, Paper, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface DisabilityEnrollmentData {
  deaf_hoh_percentage?: number;
  blind_low_vision_percentage?: number;
  mobility_percentage?: number;
  orthopedic_percentage?: number;
  autism_percentage?: number;
  adhd_percentage?: number;
  learning_disability_percentage?: number;
  mental_health_percentage?: number;
  traumatic_brain_injury_percentage?: number;
  other_disability_percentage?: number;
  total_disabled_percentage?: number;
  note?: string;
}

interface DisabilityEnrollmentSectionProps {
  data?: DisabilityEnrollmentData;
  brandColor?: string;
}

const disabilityTypes = [
  {
    label: "Deaf/Hard of Hearing",
    key: "deaf_hoh_percentage",
    color: "#FF6B6B",
    description: "Students who are deaf or hard of hearing"
  },
  {
    label: "Blind/Low Vision",
    key: "blind_low_vision_percentage",
    color: "#4ECDC4",
    description: "Students with visual impairments"
  },
  {
    label: "Mobility",
    key: "mobility_percentage",
    color: "#45B7D1",
    description: "Students with mobility disabilities"
  },
  {
    label: "Orthopedic",
    key: "orthopedic_percentage",
    color: "#96CEB4",
    description: "Students with orthopedic impairments"
  },
  {
    label: "Autism",
    key: "autism_percentage",
    color: "#FFEAA7",
    description: "Students on the autism spectrum"
  },
  {
    label: "ADHD",
    key: "adhd_percentage",
    color: "#DFE6E9",
    description: "Students with ADHD"
  },
  {
    label: "Learning Disability",
    key: "learning_disability_percentage",
    color: "#A29BFE",
    description: "Students with learning disabilities (dyslexia, dyscalculia, etc.)"
  },
  {
    label: "Mental Health",
    key: "mental_health_percentage",
    color: "#FD79A8",
    description: "Students with mental health conditions (depression, anxiety, etc.)"
  },
  {
    label: "Traumatic Brain Injury",
    key: "traumatic_brain_injury_percentage",
    color: "#FDCB6E",
    description: "Students with traumatic brain injuries"
  },
  {
    label: "Other Disabilities",
    key: "other_disability_percentage",
    color: "#B8B8B8",
    description: "Other disabilities not listed above"
  },
];

export default function DisabilityEnrollmentSection({
  data,
  brandColor,
}: DisabilityEnrollmentSectionProps) {
  if (!data || !data.total_disabled_percentage) {
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
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        Disability Enrollment
        <Tooltip title="Percentages represent estimated proportion of student body with each disability type. Data sourced from IPEDS and institutional reporting.">
          <InfoIcon sx={{ fontSize: "1.25rem", color: "text.secondary" }} />
        </Tooltip>
      </Typography>

      {/* Overall Disability Enrollment */}
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: accentColor,
              fontSize: "2.5rem",
            }}
          >
            {data.total_disabled_percentage?.toFixed(1)}%
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            of students identified as having a disability
          </Typography>
        </Box>
        {data.note && (
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 1 }}>
            {data.note}
          </Typography>
        )}
      </Paper>

      {/* Disability Types Grid */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          mb: 2.5,
          color: "text.primary",
        }}
      >
        Enrollment by Disability Type
      </Typography>

      <Grid container spacing={2}>
        {disabilityTypes
          .filter((type) => data[type.key as keyof DisabilityEnrollmentData] !== undefined)
          .map((type) => {
            const value = data[type.key as keyof DisabilityEnrollmentData] as number;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={type.key}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Tooltip title={type.description}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            fontSize: "0.9375rem",
                          }}
                        >
                          {type.label}
                        </Typography>
                        <InfoIcon sx={{ fontSize: "0.9rem", color: "text.secondary" }} />
                      </Box>
                    </Tooltip>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: type.color,
                        fontSize: "1.5rem",
                        mb: 1.5,
                      }}
                    >
                      {value.toFixed(2)}%
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={Math.min(value * 5, 100)} // Scale for visibility since individual percentages are small
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        backgroundColor: "#E0E0E0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: type.color,
                          borderRadius: 1,
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>

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
          Students may identify with multiple disabilities, so percentages may not sum to the total disability enrollment percentage. Contact the Disability Services Office for more detailed information about support available for specific disability types.
        </Typography>
      </Paper>
    </Box>
  );
}
