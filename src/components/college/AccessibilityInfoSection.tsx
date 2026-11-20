/**
 * AccessibilityInfoSection
 *
 * Displays accessibility information from CeDaR database with collapsible sections.
 * Design: WCAG AAA compliant, condensed with expandable sections for better scrollability.
 */

import {
  Box,
  Typography,
  Link,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { AccessibilityInfo } from "@/types/college";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccessibilityInfoSectionProps {
  info?: AccessibilityInfo;
  brandColor?: string;
}

export default function AccessibilityInfoSection({
  info,
  brandColor,
}: AccessibilityInfoSectionProps) {
  if (!info) {
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
        Accessibility & Support
      </Typography>

      {/* Disability Services Office - Always visible */}
      {(info.dso_phone || info.dso_email || info.dso_url) && (
        <Paper
          elevation={0}
          sx={{
            p: 3.5,
            mb: 2,
            bgcolor: `${accentColor}08`,
            borderLeft: `5px solid ${accentColor}`,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 2.5,
              color: "text.primary",
              fontSize: "1rem",
            }}
          >
            Contact Disability Services
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {info.dso_phone && (
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <PhoneIcon
                  sx={{
                    color: accentColor,
                    mt: 0.5,
                    flexShrink: 0,
                    fontSize: "1.25rem",
                  }}
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      display: "block",
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                      mb: 0.5,
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                    }}
                  >
                    Phone
                  </Typography>
                  <Link
                    href={`tel:${info.dso_phone}`}
                    sx={{
                      textDecoration: "none",
                      fontWeight: 500,
                      color: accentColor,
                      fontSize: "0.9375rem",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {info.dso_phone}
                  </Link>
                </Box>
              </Box>
            )}
            {info.dso_email && (
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <EmailIcon
                  sx={{
                    color: accentColor,
                    mt: 0.5,
                    flexShrink: 0,
                    fontSize: "1.25rem",
                  }}
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      display: "block",
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                      mb: 0.5,
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                    }}
                  >
                    Email
                  </Typography>
                  <Link
                    href={`mailto:${info.dso_email}`}
                    sx={{
                      textDecoration: "none",
                      fontWeight: 500,
                      color: accentColor,
                      fontSize: "0.9375rem",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {info.dso_email}
                  </Link>
                </Box>
              </Box>
            )}
            {info.dso_url && (
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <LinkIcon
                  sx={{
                    color: accentColor,
                    mt: 0.5,
                    flexShrink: 0,
                    fontSize: "1.25rem",
                  }}
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      display: "block",
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                      mb: 0.5,
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                    }}
                  >
                    Website
                  </Typography>
                  <Link
                    href={info.dso_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: "none",
                      fontWeight: 500,
                      color: accentColor,
                      fontSize: "0.9375rem",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Disability Services Office
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      )}

      {/* Collapsible Sections */}
      {/* On-Campus Resources */}
      {(info.has_disability_cultural_center ||
        info.has_deaf_culture_center ||
        info.has_disability_studies_program ||
        info.has_asl_program) && (
        <Accordion
          sx={{
            mb: 1.5,
            "&:before": { display: "none" },
            border: "1px solid #E0E0E0",
            borderRadius: 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#F8F9FA",
              "&:hover": { backgroundColor: "#F0F1F3" },
              py: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: "#2E7D32",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  fontSize: "0.95rem",
                }}
              >
                On-Campus Programs & Centers
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 2.5, pb: 2.5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {info.has_disability_cultural_center && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CheckCircleIcon
                    sx={{
                      color: "#2E7D32",
                      flexShrink: 0,
                      fontSize: "1.25rem",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", fontSize: "0.9375rem" }}
                  >
                    Disability Cultural Center
                  </Typography>
                </Box>
              )}
              {info.has_deaf_culture_center && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CheckCircleIcon
                    sx={{
                      color: "#2E7D32",
                      flexShrink: 0,
                      fontSize: "1.25rem",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", fontSize: "0.9375rem" }}
                  >
                    Deaf Culture Center
                  </Typography>
                </Box>
              )}
              {info.has_disability_studies_program && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CheckCircleIcon
                    sx={{
                      color: "#2E7D32",
                      flexShrink: 0,
                      fontSize: "1.25rem",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", fontSize: "0.9375rem" }}
                  >
                    Disability Studies Program
                  </Typography>
                </Box>
              )}
              {info.has_asl_program && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CheckCircleIcon
                    sx={{
                      color: "#2E7D32",
                      flexShrink: 0,
                      fontSize: "1.25rem",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", fontSize: "0.9375rem" }}
                  >
                    American Sign Language (ASL) Program
                  </Typography>
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Accommodations */}
      {info.accommodations_provided &&
        info.accommodations_provided.length > 0 && (
          <Accordion
            sx={{
              mb: 1.5,
              "&:before": { display: "none" },
              border: "1px solid #E0E0E0",
              borderRadius: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: "#F8F9FA",
                "&:hover": { backgroundColor: "#F0F1F3" },
                py: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: "#FFA726",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: "0.95rem",
                  }}
                >
                  Available Accommodations
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 2.5, pb: 2.5 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {info.accommodations_provided.map((accommodation, idx) => (
                  <Box
                    key={idx}
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <CheckCircleIcon
                      sx={{
                        color: "#FFA726",
                        flexShrink: 0,
                        fontSize: "1.25rem",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "text.primary", fontSize: "0.9375rem" }}
                    >
                      {accommodation}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

      {/* Campus Accessibility */}
      {info.campus_accessibility_notes && (
        <Accordion
          sx={{
            mb: 1.5,
            "&:before": { display: "none" },
            border: "1px solid #E0E0E0",
            borderRadius: 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#F8F9FA",
              "&:hover": { backgroundColor: "#F0F1F3" },
              py: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: "#29B6F6",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  fontSize: "0.95rem",
                }}
              >
                Campus Accessibility
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 2.5, pb: 2.5 }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.primary",
                lineHeight: 1.7,
                fontSize: "0.9375rem",
              }}
            >
              {info.campus_accessibility_notes}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Health & Support Services */}
      {(info.counseling_services || info.health_services) && (
        <Accordion
          sx={{
            "&:before": { display: "none" },
            border: "1px solid #E0E0E0",
            borderRadius: 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "#F8F9FA",
              "&:hover": { backgroundColor: "#F0F1F3" },
              py: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: "#AB47BC",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  fontSize: "0.95rem",
                }}
              >
                Health & Support Services
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 2.5, pb: 2.5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {info.counseling_services && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      display: "block",
                      mb: 1,
                      fontSize: "0.8125rem",
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                    }}
                  >
                    Counseling Services
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.primary",
                      fontSize: "0.9375rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {info.counseling_services}
                  </Typography>
                </Box>
              )}
              {info.health_services && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      display: "block",
                      mb: 1,
                      fontSize: "0.8125rem",
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                    }}
                  >
                    Health Services
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.primary",
                      fontSize: "0.9375rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {info.health_services}
                  </Typography>
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
