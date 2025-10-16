"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Rating,
  Container,
  IconButton,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { StyledCard } from "../components/common/styledCard";

const TOKENS = {
  radius: { sm: 3, md: 5, lg: 10 },
  font: {
    heading: "Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif",
    body: "Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif",
  },
  color: {
    text: { primary: "#18181B", secondary: "#71717A", muted: "#B3B3B3" },
    border: "#E4E4E7",
    surface: "#FFF",
    canvas: "#F8F9FA",
  },
};

const FACTORY_IMAGES = [
  "/factory1.png",
  "/factory2.png",
];

const SWEATER_IMAGES = [
  "/shirt1.png",
  "/shirt2.png",
  "/shirt3.png",
  "/shirt4.png",
];

const COMPLIANCE_BADGES = [
  { label: "BSCI", color: "#F9F5FF", textColor: "#6941C6" },
  { label: "WRAP", color: "#EFF8FF", textColor: "#175CD3" },
  { label: "SEDEX", color: "#EEF4FF", textColor: "#3538CD" },
];

const CertBadge = ({ label, color, textColor }: { label: string; color: string; textColor: string }) => (
  <Box
    sx={{
      borderRadius: 8,
      bgcolor: color,
      display: "inline-flex",
      px: 1,
      py: 0.25,
      alignItems: "center",
      height: 22,
    }}
  >
    <Typography
      sx={{
        color: textColor,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: "18px",
        fontFamily: TOKENS.font.body,
      }}
    >
      {label}
    </Typography>
  </Box>
);

const PerformanceChart = () => (
  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, height: 120, mt: 2 }}>
    {[
      { color: "#FBBF24", height: 60 },
      { color: "#60A5FA", height: 86 },
      { color: "#34D399", height: 110 },
      { color: "#A78BFA", height: 78 },
      { color: "#F97316", height: 96 },
    ].map((bar, i) => (
      <Box
        key={i}
        sx={{
          width: 34,
          height: bar.height,
          borderRadius: 6,
          bgcolor: bar.color,
          opacity: 0.9,
        }}
      />
    ))}
  </Box>
);

export default function FactoriesPage() {
  return (
    <Box sx={{ bgcolor: TOKENS.color.canvas, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* LEFT COLUMN */}
          <StyledCard>
            {/* Top info */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {/* Badge */}
              <Box
                sx={{
                  bgcolor: "#E6F4EA",
                  borderRadius: 999,
                  px: 1.2,
                  py: 0.3,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mr: 2,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#22C55E",
                  }}
                />
                <Typography fontSize={12} fontWeight={600} color="#16A34A">
                  99
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={700} fontSize={16}>
                  Atlas Garments
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <PlaceIcon sx={{ color: "#9CA3AF", fontSize: 16 }} />
                  <Typography fontSize={13} color={TOKENS.color.text.secondary}>
                    Ho Chi Minh, Vietnam
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Media */}
            <Box sx={{ position: "relative" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {FACTORY_IMAGES.map((src, i) => (
                  <Box
                    key={i}
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={src}
                      alt={`factory-${i}`}
                      sx={{
                        width: "100%",
                        height: 120,
                        objectFit: "cover",
                        borderRadius: TOKENS.radius.lg,
                      }}
                    />
                    {i === 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 6,
                          left: 6,
                          bgcolor: "rgba(0,0,0,0.6)",
                          borderRadius: "50%",
                          p: 0.6,
                        }}
                      >
                        ▶
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: -10,
                  transform: "translateY(-50%)",
                  bgcolor: "#FFF",
                  border: "1px solid #E5E7EB",
                  "&:hover": { bgcolor: "#F9FAFB" },
                }}
                size="small"
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>

            {/* Description */}
            <Typography
              fontSize={13}
              mt={2}
              color={TOKENS.color.text.secondary}
            >
              Mid-sized garment manufacturer specializing in sustainable cotton
              and blended knits for premium activewear brands.
            </Typography>

            {/* Chips */}
            <Box sx={{ display: "flex", gap: 1.2, mt: 2 }}>
              {["Knitwear", "Kids", "Womens"].map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  sx={{
                    bgcolor: "#000",
                    color: "#FFF",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    px: 0.5,
                    height: 26,
                  }}
                />
              ))}
            </Box>

            {/* Ratings */}
            <Box sx={{ mt: 3 }}>
              {[
                { label: "Communication", rating: 5 },
                { label: "On-Time Delivery", rating: 5 },
                { label: "Price Matching", rating: 5 },
              ].map((r) => (
                <Box
                  key={r.label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 0.8,
                  }}
                >
                  <Typography fontSize={13} fontWeight={500}>
                    {r.label}:
                  </Typography>
                  <Rating
                    name={r.label}
                    value={r.rating}
                    readOnly
                    size="small"
                    sx={{ color: "#FACC15" }}
                  />
                </Box>
              ))}
            </Box>
          </StyledCard>

          {/* RIGHT SECTION */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Row 1: Compliance + Overview */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <StyledCard>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Box>
                    <Typography fontWeight={700} fontSize={15} mb={1}>
                      Compliance:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      {COMPLIANCE_BADGES.map((b) => (
                        <CertBadge key={b.label} {...b} />
                      ))}
                    </Box>
                    {/* Two real SGS-style compliance report images */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        component="img"
                        src="/compliance1.png"
                        alt="Factory Capacity & Capability Report 1"
                        sx={{
                          width: "48%",
                          borderRadius: 2,
                          objectFit: "cover",
                          border: "1px solid #eee",
                        }}
                      />
                      <Box
                        component="img"
                        src="/compliance2.png"
                        alt="Factory Capacity & Capability Report 2"
                        sx={{
                          width: "48%",
                          borderRadius: 2,
                          objectFit: "cover",
                          border: "1px solid #eee",
                        }}
                      />
                    </Box>
                  </Box>
                  <Button
                    sx={{
                      fontSize: 12,
                      mt: 1,
                      textTransform: "none",
                      color: "#888",
                      fontWeight: 500,
                      alignSelf: "flex-end",
                      p: 0,
                      "&:hover": { color: "#000" },
                    }}
                  >
                    SEE ALL FILES &gt;
                  </Button>
                </Box>
              </StyledCard>

              <StyledCard>
                <Typography fontWeight={700} mb={2}>
                  Factory Overview
                </Typography>
                {[
                  "Established: 2006",
                  "Location: 480/6 Hoang Huu Nam Street, Long Binh Ward, District 9, Ho Chi Minh City, Vietnam",
                  "Number of employees: 500–1,000",
                  "Other production countries: Bangladesh, China, India",
                  "Export Markets: Japan, Europe",
                  "Featured Clients:",
                ].map((item, i) => (
                  <Typography key={i} fontSize={14} mb={1}>
                    • {item}
                  </Typography>
                ))}
              </StyledCard>
            </Box>

            {/* Row 2: Capabilities + Performance */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <StyledCard>
                <Typography fontWeight={700} mb={2}>
                  Production Capabilities:
                </Typography>
                {[
                  "Knit sweaters and garment accessories (ribs, waistbands, scarves)",
                  "Sampling, knitting, sewing, trims, packing, washing",
                  "Skilled labor with rotating shifts",
                ].map((cap, i) => (
                  <Typography key={i} fontSize={14} mb={1}>
                    • {cap}
                  </Typography>
                ))}
              </StyledCard>

              <StyledCard
                title={
                  <Typography fontWeight={700} fontSize={15}>
                    Performance
                  </Typography>
                }
                actions={
                  <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      color: "#000",
                      textTransform: "none",
                      fontSize: 13,
                      bgcolor: "#F4F4F5",
                      borderRadius: 999,
                      px: 1.5,
                      "&:hover": { bgcolor: "#E4E4E7" },
                    }}
                  >
                    Order Volume
                  </Button>
                }
              >
                <PerformanceChart />
              </StyledCard>
            </Box>

            {/* Row 3: Full-width carousel */}
            <StyledCard>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <IconButton size="small">
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton size="small">
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
                {SWEATER_IMAGES.map((src, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={src}
                    alt={`sweater-${i}`}
                    sx={{
                      width: 160,
                      height: 190,
                      objectFit: "cover",
                      borderRadius: TOKENS.radius.lg,
                      border: "1px solid #eee",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </Box>
            </StyledCard>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
