"use client";
import React from "react";
import {
  Box,
  IconButton,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NextLink from "next/link";
import { CompareCollege } from "./CompareData";

interface CompareTableProps {
  colleges: CompareCollege[];
  onRemove: (id: string) => void;
}

const muted = { color: "grayscale.main" } satisfies SxProps<Theme>;

function RatingValue({ value }: { value: number | null }) {
  if (value === null) {
    return <Typography sx={muted}>No ratings yet</Typography>;
  }
  return (
    <Typography sx={{ fontSize: "1.25rem", fontWeight: 600 }}>
      {value.toFixed(2)} / 5
    </Typography>
  );
}

function DisabilityServicesValue({
  has,
  url,
}: {
  has: boolean | null;
  url: string | null;
}) {
  if (!has) {
    return <Typography sx={muted}>No info yet</Typography>;
  }
  return (
    <Box>
      <Typography sx={{ fontSize: "1.25rem", fontWeight: 600 }}>Yes</Typography>
      {url && /^https?:\/\//i.test(url) && (
        <MuiLink
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontSize: "0.875rem" }}
        >
          Visit website
        </MuiLink>
      )}
    </Box>
  );
}

// Left column: the row names
const rowLabelSx = {
  fontWeight: 700,
  fontSize: "1rem",
  verticalAlign: "middle",
  width: { xs: 140, md: "22%" },
} satisfies SxProps<Theme>;

// College columns: everything centered
const valueCellSx = {
  textAlign: "center",
  verticalAlign: "middle",
  py: 3,
} satisfies SxProps<Theme>;

export default function CompareTable({
  colleges,
  onRemove,
}: CompareTableProps) {
  if (colleges.length === 0) {
    return (
      <Typography sx={{ ...muted, mt: 4 }}>
        Select a college to start comparing.
      </Typography>
    );
  }

  return (
    <TableContainer sx={{ mt: 4, overflowX: "auto" }}>
      <Table
        aria-label="College comparison"
        sx={{
          tableLayout: "fixed", // equal-width college columns
          minWidth: 600,
          "& th, & td": {
            border: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...rowLabelSx, fontSize: "1.1rem" }}>
              Colleges
            </TableCell>
            {colleges.map((college) => (
              <TableCell
                key={college.id}
                sx={{
                  position: "relative",
                  textAlign: "center",
                  verticalAlign: "middle",
                  px: 5, // leaves room for the remove button
                  py: 2.5,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => onRemove(college.id)}
                  aria-label={`Remove ${college.name}, ${college.city} from comparison`}
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    "&:focus-visible": {
                      outline: "2px solid",
                      outlineColor: "primary.main",
                      outlineOffset: "2px",
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                <MuiLink
                  component={NextLink}
                  href={`/colleges/${college.slug}`}
                  underline="hover"
                  sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                >
                  {college.name}
                </MuiLink>
                <Typography sx={muted}>
                  {[college.city, college.state].filter(Boolean).join(", ")}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Section band */}
          <TableRow>
            <TableCell
              component="th"
              scope="colgroup"
              colSpan={colleges.length + 1}
              sx={{
                bgcolor: "grayscale.light",
                fontSize: "1.1rem",
                fontWeight: 700,
                textAlign: "left",
                py: 1.5,
              }}
            >
              Ratings by category
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" sx={rowLabelSx}>
              Accessibility
            </TableCell>
            {colleges.map((c) => (
              <TableCell key={c.id} sx={valueCellSx}>
                <RatingValue value={c.ratings.ally_overall} />
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" sx={rowLabelSx}>
              Disability Services Office
            </TableCell>
            {colleges.map((c) => (
              <TableCell key={c.id} sx={valueCellSx}>
                <DisabilityServicesValue
                  has={c.has_disability_services}
                  url={c.disability_services_url}
                />
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" sx={rowLabelSx}>
              Safety
            </TableCell>
            {colleges.map((c) => (
              <TableCell key={c.id} sx={valueCellSx}>
                <RatingValue value={c.ratings.safety_overall} />
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" sx={rowLabelSx}>
              Inclusivity
            </TableCell>
            {colleges.map((c) => (
              <TableCell key={c.id} sx={valueCellSx}>
                <RatingValue value={c.ratings.inclusivity_overall} />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
