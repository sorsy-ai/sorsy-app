"use client";

import React, { memo } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BusinessIcon from "@mui/icons-material/Business";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LabelIcon from "@mui/icons-material/Label";
import FolderIcon from "@mui/icons-material/Folder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * =====================
 * Design Tokens & Types
 * =====================
 */
const TOKENS = {
  radius: { sm: 3, md: 5, lg: 10, pill: 20 },
  font: {
    heading: "Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif",
    body: "Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif",
    alt: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
  },
  color: {
    text: {
      primary: "#18181B",
      secondary: "#71717A",
      muted: "#B3B3B3",
      inverse: "#FFF",
    },
    brand: {
      primary: "#C00F0C",
      primaryHover: "#A00C0A",
    },
    border: "#E4E4E7",
    surface: "#FFF",
    canvas: "#F8F9FA",
    status: {
      completed: { bg: "#DCFCE7", fg: "#14532D", dot: "#22C55E" },
      pending: { bg: "#FEF9C3", fg: "#713F12", dot: "#FACC15" },
      ontrack: { bg: "#DCFCE7", fg: "#14532D", dot: "#22C55E" },
      delayed: { bg: "#FEE4E2", fg: "#7A271A", dot: "#D92D20" },
      atrisk: { bg: "#FFE4E6", fg: "#9F1239", dot: "#E11D48" },
      default: { bg: "#F2F4F7", fg: "#344054", dot: "#71717A" },
    },
    chart: {
      base: "#FEE9E7",
      materials: "#FCB3AD",
      labor: "#FDD3D0",
      freight: "#EC221F",
    },
  },
};

// Status labels normalized to keys
export type StatusLabel =
  | "Completed"
  | "Pending"
  | "In Progress"
  | "On Track"
  | "Delayed"
  | "At risk";

const statusKey = (label: string) => label.toLowerCase().replace(/\s+/g, "");
const statusPaletteFor = (label: string) => {
  const key = statusKey(label);
  const map: Record<string, { bg: string; fg: string; dot: string }> = {
    completed: TOKENS.color.status.completed,
    pending: TOKENS.color.status.pending,
    inprogress: TOKENS.color.status.pending,
    ontrack: TOKENS.color.status.ontrack,
    delayed: TOKENS.color.status.delayed,
    atrisk: TOKENS.color.status.atrisk,
  };
  return map[key] ?? TOKENS.color.status.default;
};

/**
 * =====================
 * Data (would come from props/API)
 * =====================
 */
const CERTIFICATIONS: Array<{ label: string; color: string; textColor: string }> = [
  { label: "BSCI", color: "#F9F5FF", textColor: "#6941C6" },
  { label: "WRAP", color: "#EFF8FF", textColor: "#175CD3" },
  { label: "SEDEX", color: "#EEF4FF", textColor: "#3538CD" },
  { label: "WALMART", color: "#F2F4F7", textColor: "#344054" },
];

const PRODUCT_IMAGES: string[] = [
  "https://api.builder.io/api/v1/image/assets/TEMP/a1c017c1dd2c5d22befaab722154c53cb92a6e9a?width=142",
  "https://api.builder.io/api/v1/image/assets/TEMP/d51e43618fede475bf11e9be9e44e6794b6bd5b6?width=150",
  "https://api.builder.io/api/v1/image/assets/TEMP/d849568c8d584f606067b01309d04ca881bc3583?width=160",
  "https://api.builder.io/api/v1/image/assets/TEMP/afcb5d9d3ff8c432445673a84aeb8d244fdebd3c?width=158",
  "https://api.builder.io/api/v1/image/assets/TEMP/40815a6a69d82b150f03f1d5e9804a6eded9084d?width=154",
];

type Milestone = { status: StatusLabel | string; label: string; desc: string; date: string };

const MILESTONES: Milestone[] = [
  { status: "Completed", label: "Quote", desc: "Quote Accepted", date: "Jan 17, 2025" },
  { status: "Completed", label: "Sampling", desc: "Sample Delivered", date: "Feb 12, 2025" },
  { status: "Pending", label: "Production", desc: "Production in progress", date: "Dec 31, 2025" },
  { status: "Pending", label: "Payment", desc: "Payment Scheduled", date: "Jan 17, 2026" },
];

/**
 * =====================
 * Small, Reusable UI Primitives
 * =====================
 */
const SectionCard: React.FC<React.PropsWithChildren<{ sx?: SxProps<Theme> }>> = ({ children, sx }) => (
  <Card
    sx={{
      borderRadius: TOKENS.radius.md,
      border: `1px solid ${TOKENS.color.border}`,
      bgcolor: TOKENS.color.surface,
      display: "flex",
      flexDirection: "column",
      justifyContent: "stretch",
      ...sx,
    }}
  >
    {children}
  </Card>
);

type PrimaryButtonProps = React.PropsWithChildren<{ sx?: SxProps<Theme> }> & Omit<React.ComponentProps<typeof Button>, "sx">;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, sx, ...props }) => (
  <Button
    variant="contained"
    sx={{
      borderRadius: TOKENS.radius.sm,
      bgcolor: TOKENS.color.brand.primary,
      color: TOKENS.color.text.inverse,
      fontFamily: TOKENS.font.body,
      fontSize: 13,
      fontWeight: 700,
      lineHeight: "22px",
      px: 2,
      py: 2,
      textTransform: "none",
      height: 45,
      minWidth: 130,
      "&:hover": { bgcolor: TOKENS.color.brand.primaryHover },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Button>
);

const StatusChip: React.FC<{ label: StatusLabel | string }> = memo(function StatusChip({ label }) {
  const pal = statusPaletteFor(label);
  return (
    <Box
      sx={{
        borderRadius: TOKENS.radius.pill,
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 0.5,
        bgcolor: pal.bg,
        height: 26,
      }}
      aria-label={`status ${label}`}
    >
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: pal.dot }} />
      <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: "20px", color: pal.fg, fontFamily: TOKENS.font.body }}>
        {label}
      </Typography>
    </Box>
  );
});
StatusChip.displayName = "StatusChip";

const InfoItem: React.FC<{ icon: React.ReactNode; text: string; color?: string; upper?: boolean }> = ({ icon, text, color = TOKENS.color.brand.primary, upper = true }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
    <Box sx={{ color: "#1C1C1C", fontSize: 18 }} aria-hidden>
      {icon}
    </Box>
    <Typography
      sx={{
        fontSize: 13,
        fontWeight: 700,
        lineHeight: "18px",
        letterSpacing: "1px",
        textTransform: upper ? "uppercase" : "none",
        color,
        fontFamily: TOKENS.font.body,
      }}
    >
      {text}
    </Typography>
  </Box>
);

const CertBadge: React.FC<{ label: string; color: string; textColor: string }> = ({ label, color, textColor }) => (
  <Box sx={{ borderRadius: 8, bgcolor: color, display: "flex", px: 1, py: 0.25, justifyContent: "center", alignItems: "center" }}>
    <Typography sx={{ color: textColor, fontSize: 12, fontWeight: 500, lineHeight: "18px", fontFamily: TOKENS.font.alt }}>{label}</Typography>
  </Box>
);

/**
 * =====================
 * Charts
 * =====================
 */
type DonutSlice = { value: number; color: string; label: string };

const DonutChart: React.FC<{
  size?: number;
  stroke?: number;
  slices: DonutSlice[];
  centerTitle: string;
  centerSubtitle?: string;
}> = ({ size = 200, stroke = 30, slices, centerTitle, centerSubtitle }) => {
  const r = (size - stroke) / 2;
  const C = Math.PI * 2 * r;
  let acc = 0;
  const total = Math.max(1, slices.reduce((s, x) => s + x.value, 0));

  return (
    <Box sx={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Cost breakdown chart">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={TOKENS.color.chart.base} strokeWidth={stroke} />
        {slices.map((s, i) => {
          const pct = s.value / total;
          const dash = C * pct;
          const gap = C - dash;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-acc}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
          acc += dash;
          return el;
        })}
      </svg>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <Typography sx={{ fontSize: 21, fontWeight: 700, lineHeight: "32px", color: TOKENS.color.text.primary, fontFamily: TOKENS.font.body }}>
          {centerTitle}
        </Typography>
        {centerSubtitle && (
          <Typography sx={{ fontSize: 13, fontWeight: 400, lineHeight: "21px", color: TOKENS.color.text.secondary, fontFamily: TOKENS.font.body }}>
            {centerSubtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

/**
 * =====================
 * Feature Blocks
 * =====================
 */
const ProjectOverview: React.FC = () => (
  <SectionCard sx={{ minHeight: 420, flex: 1 }}>
    <CardContent sx={{ p: 3, position: "relative", flex: 1 }}>
      {/* Title + CTA */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: "24px", color: TOKENS.color.text.primary, fontFamily: TOKENS.font.heading }}>
          Melina Sweater
        </Typography>
        <PrimaryButton>Edit Project</PrimaryButton>
      </Box>

      {/* Meta */}
      <InfoItem icon={<CalendarMonthIcon sx={{ fontSize: 18 }} />} text="august 15, 2025" />
      <InfoItem icon={<BusinessIcon sx={{ fontSize: 18 }} />} text="LI FUNG FACTORY" />
      <InfoItem icon={<Inventory2OutlinedIcon sx={{ fontSize: 18 }} />} text="5,000 UNITS" />

      {/* Certifications */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Box sx={{ color: "#1C1C1C", fontSize: 18 }} aria-hidden>
          <LabelIcon sx={{ fontSize: 18 }} />
        </Box>
        {CERTIFICATIONS.map((c) => (
          <CertBadge key={c.label} {...c} />
        ))}
      </Box>

      {/* Product Images */}
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        {PRODUCT_IMAGES.map((src, idx) => (
          <Box
            key={idx}
            component="img"
            src={src}
            alt={`product angle ${idx + 1}`}
            loading="lazy"
            sx={{ width: idx < 2 ? 60 : 65, height: idx < 2 ? 90 : 100, borderRadius: TOKENS.radius.lg, objectFit: "cover" }}
          />
        ))}
      </Box>

      {/* Files link */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} role="button" aria-label="See all files">
        <FolderIcon sx={{ color: "#1C1C1C", fontSize: 18 }} />
        <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: "18px", letterSpacing: "1px", textTransform: "uppercase", color: TOKENS.color.text.muted, fontFamily: TOKENS.font.body }}>
          SEE ALL FILES 
        </Typography>
      </Box>
    </CardContent>
  </SectionCard>
);

const CostBreakdown: React.FC = () => (
  <SectionCard sx={{ minHeight: 420, flex: 1 }}>
    <CardContent sx={{ p: 3, position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: "24px", color: TOKENS.color.text.primary, fontFamily: TOKENS.font.heading }}>
            Cost Breakdown
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: "#1C1C1C", fontSize: 24 }} />
        </Box>
        <PrimaryButton>Optimize</PrimaryButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <DonutChart
          slices={[
            { value: 50, color: TOKENS.color.chart.materials, label: "Materials" },
            { value: 25, color: TOKENS.color.chart.labor, label: "Labor" },
            { value: 25, color: TOKENS.color.chart.freight, label: "Freight" },
          ]}
          centerTitle="$7.86"
          centerSubtitle="per piece"
        />
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* Legend */}
      <Box sx={{ display: "flex", gap: 3, mt: 2, pl: 0.5 }}>
        {[
          { label: "Materials", color: TOKENS.color.chart.materials },
          { label: "Labor", color: TOKENS.color.chart.labor },
          { label: "Freight", color: TOKENS.color.chart.freight },
        ].map((l) => (
          <Box key={l.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: l.color }} />
            <Typography sx={{ fontSize: 13, fontWeight: 400, color: TOKENS.color.text.primary }}>{l.label}</Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  </SectionCard>
);

const MilestonesCard: React.FC<{ items: Milestone[] }> = ({ items }) => (
  <SectionCard sx={{ minHeight: 420, flex: 1 }}>
    <CardContent sx={{ p: 0, flex: 1, display: "flex", flexDirection: "column", justifyContent: "stretch" }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: "1px solid #F0F0F0" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: "24px", color: TOKENS.color.text.primary, fontFamily: TOKENS.font.heading }}>
            Milestones
          </Typography>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              px: 2,
              py: 1,
              borderRadius: TOKENS.radius.sm,
              bgcolor: TOKENS.color.surface,
              color: TOKENS.color.brand.primary,
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "21px",
              fontFamily: TOKENS.font.body,
              textTransform: "none",
              "&:hover": { bgcolor: "#F9F9F9" },
            }}
            endIcon={<ChevronRightIcon sx={{ fontSize: 14, color: TOKENS.color.brand.primary }} />}
          >
            See All Milestones
          </Button>
        </Box>
        <Typography sx={{ fontSize: 13, fontWeight: 400, lineHeight: "22px", color: TOKENS.color.text.secondary, fontFamily: TOKENS.font.body }}>
          Track progress across key phases.
        </Typography>
      </Box>

      {/* List */}
      <Box sx={{ flex: 1, overflowY: "auto", maxHeight: 300 }}>
        {items.map((m, idx) => (
          <Box
            key={`${m.label}-${idx}`}
            sx={{ display: "flex", alignItems: "center", minHeight: 80, px: 3, py: 2, borderBottom: idx < items.length - 1 ? "1px solid rgba(228, 228, 231, 0.70)" : "none" }}
          >
            <Box sx={{ minWidth: 120 }}>
              <StatusChip label={m.status} />
            </Box>
            <Box sx={{ flex: 1, ml: 3 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: "22px", color: TOKENS.color.text.primary, fontFamily: TOKENS.font.body, mb: 0.5 }}>
                {m.label}
              </Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 500, lineHeight: "21px", color: TOKENS.color.text.secondary, fontFamily: TOKENS.font.body }}>
                {m.desc}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 13, fontWeight: 500, lineHeight: "21px", color: TOKENS.color.text.secondary, fontFamily: TOKENS.font.body, mr: 2 }}>
              {m.date}
            </Typography>
            <MoreHorizIcon sx={{ color: "#A1A1AA", fontSize: 24 }} aria-label={`more options for ${m.label}`} />
          </Box>
        ))}
      </Box>
    </CardContent>
  </SectionCard>
);

const TasksTable: React.FC = () => (
  <SectionCard sx={{ minHeight: 420, flex: 1 }}>
    <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column", justifyContent: "stretch" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography fontFamily={TOKENS.font.heading} fontWeight={700} fontSize={19}>
          Tasks
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          {[
            { label: "Assignee" },
            { label: "Status" },
          ].map((f) => (
            <Button key={f.label} variant="text" sx={{ color: "#222", fontWeight: 600, fontSize: 16, px: 1, textTransform: "none", "&:hover": { bgcolor: "#f5f5f5" } }} endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 24, color: "#222" }} />}>
              {f.label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", maxHeight: 300 }}>
        <TableContainer component={Paper} sx={{ boxShadow: "none", border: "none", bgcolor: "transparent" }}>
          <Table size="small" aria-label="tasks table">
            <TableHead>
              <TableRow>
                {["Name", "Assignee", "Due date", "Status", "Progress"].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 700, border: "none", fontSize: 15 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { name: "Set material quotes", due: "May 25, 2023", status: "Completed", pct: 100 },
                { name: "Complete compliance work", due: "Jun 20, 2023", status: "Delayed", pct: 38 },
                { name: "Initiate bank transfer", due: "July 13, 2023", status: "At risk", pct: 48 },
                { name: "Approve material change", due: "Dec 20, 2023", status: "Completed", pct: 100 },
                { name: "Approve upper change", due: "Mar 15, 2024", status: "In Progress", pct: 50 },
              ].map((row, i) => (
                <TableRow key={`${row.name}-${i}`}>
                  <TableCell sx={{ border: "none", fontSize: 15 }}>{row.name}</TableCell>
                  <TableCell sx={{ border: "none", fontSize: 15 }}>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ width: 28, height: 28, mr: 1 }} src="https://api.builder.io/api/v1/image/assets/TEMP/placeholder-avatar" alt="Assignee avatar" />
                      <Typography fontSize={15} fontWeight={700} fontFamily={TOKENS.font.body}>
                        Arlene McCoy
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ border: "none", fontSize: 15 }}>{row.due}</TableCell>
                  <TableCell sx={{ border: "none", fontSize: 15 }}>
                    <StatusChip label={row.status} />
                  </TableCell>
                  <TableCell sx={{ border: "none", fontSize: 15 }}>
                    <Chip
                      label={`${row.pct}%`}
                      sx={{
                        bgcolor: row.pct === 100 ? "#E6F4EA" : row.pct >= 50 ? "#FEF9C3" : "#FEE4E2",
                        color: row.pct === 100 ? "#1DB06B" : row.pct >= 50 ? "#F59E0B" : "#D92D20",
                        fontWeight: 700,
                        fontSize: 14,
                        borderRadius: "50px",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <PrimaryButton>Create Task</PrimaryButton>
      </Box>
    </CardContent>
  </SectionCard>
);

/**
 * =====================
 * Page
 * =====================
 */
const ProjectsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3, bgcolor: TOKENS.color.canvas, minHeight: "100vh", position: "relative" }}>
      {/* Page-level status pill */}
      <Box sx={{ mb: 2 }}>
        <StatusChip label="On Track" />
      </Box>

      {/* Layout: replace MUI Grid with CSS Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" }, // left 1/3, right 2/3 on md+
          gap: 3,
          alignItems: "stretch",
        }}
      >
        {/* Left Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <ProjectOverview />
          <CostBreakdown />
        </Box>

        {/* Right Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <MilestonesCard items={MILESTONES} />
          <TasksTable />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectsPage;
