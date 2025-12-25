"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Chip,
  Switch,
  Button,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Avatar,
  TableContainer,
  Stack,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { NoteAddOutlined, Tune } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Factory = {
  id: string;
  name: string;
  location: string;
  country: string;
  matchScore: number;
  moq: number;
  description: string;
  certifications: string[];
};

function inferTags(q: string) {
  const text = q.toLowerCase();
  const tags: string[] = [];

  // super basic “theater” parsing
  if (text.includes("vietnam")) tags.push("Vietnam");
  if (text.includes("bsci")) tags.push("BSCI");
  if (text.includes("wrap")) tags.push("WRAP");
  if (text.includes("sedex")) tags.push("SEDEX");
  if (text.includes("oeko") || text.includes("oeko-tex")) tags.push("OEKO-TEX");
  if (text.includes("organic")) tags.push("Organic");

  return tags;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") ?? "";

  const avatarBg = ["#E9E3FF", "#E7F2FF", "#FFE8E8", "#E8FFF1"];
  const initials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");

  const [inputValue, setInputValue] = useState<string>(query);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFactoryIds, setSelectedFactoryIds] = useState<
    Record<string, boolean>
  >({});

  // file upload refs/state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // reset selection when results change
    setSelectedFactoryIds({});
  }, [query]);

  useEffect(() => {
    setInputValue(query);
    if (inputRef.current) inputRef.current.value = query;
  }, [query]);

  const goSearch = () => {
    const v = inputValue.trim();
    if (v) router.push(`/search?q=${encodeURIComponent(v)}`);
    else router.push("/search");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") goSearch();
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      console.log("upload success", data);
    } catch (err) {
      console.error("upload error", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const suggestions = [
    "Women’s knit sweaters",
    "Athletic sneakers for kids",
    "Organic cotton t-shirts",
    "Recycled polyester tote bags",
  ];

  const hasQuery = query.trim().length > 0;

  // ---- MOCK DATA ----
  const factories: Factory[] = useMemo(
    () => [
      {
        id: "atlas-garments",
        name: "Atlas Garments",
        location: "Ho Chi Minh City, Vietnam",
        country: "Vietnam",
        matchScore: 99,
        moq: 2000,
        description:
          "Mid-sized garment manufacturer specializing in sustainable cotton and blended knits.",
        certifications: ["BSCI", "WRAP", "SEDEX"],
      },
      {
        id: "lotus-stitch",
        name: "Lotus Stitch Co.",
        location: "Ho Chi Minh City, Vietnam",
        country: "Vietnam",
        matchScore: 98,
        moq: 2320,
        description:
          "Full-package knitwear partner with sampling support and quick turnaround.",
        certifications: ["BSCI", "WRAP", "SEDEX"],
      },
      {
        id: "bamboo-threadworks",
        name: "Bamboo Threadworks Ltd.",
        location: "Hai Phong, Vietnam",
        country: "Vietnam",
        matchScore: 97,
        moq: 2000,
        description:
          "Known for organic cotton sourcing and quality control processes.",
        certifications: ["BSCI", "SEDEX", "OEKO-TEX"],
      },
      {
        id: "sunrise-apparel",
        name: "Sunrise Apparel Manufacturing",
        location: "Hai Phong, Vietnam",
        country: "Vietnam",
        matchScore: 96,
        moq: 2000,
        description:
          "Production-ready lines for knit tops, sweaters, and performance blends.",
        certifications: ["WRAP", "SEDEX"],
      },
    ],
    []
  );

  const inferred = useMemo(() => inferTags(query), [query]);

  const filteredFactories = useMemo(() => {
    if (!hasQuery) return [];
    const q = query.toLowerCase();
    return factories.filter((f) => {
      const hay = [
        f.name,
        f.location,
        f.country,
        f.description,
        f.certifications.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return (
        hay.includes(q) || inferred.some((t) => hay.includes(t.toLowerCase()))
      );
    });
  }, [factories, hasQuery, query, inferred]);

  // ---- COST SUGGESTIONS ----
  const [costSuggestions, setCostSuggestions] = useState([
    {
      id: "mat-swap",
      label: "Change material from nylon to recycled polyester",
      description: "Potential savings: $0.48 per unit. Similar durability.",
      enabled: true,
    },
    {
      id: "move-country",
      label: "Move production from Bangladesh to Vietnam",
      description: "Lower shipping costs and lead time (6 vs. 10 days).",
      enabled: true,
    },
    {
      id: "reduce-qty",
      label: "Reduce order quantity from 5,000 → 4,000 units",
      description: "Lower MOQ offsets higher price per unit.",
      enabled: false,
    },
  ]);

  const toggleSuggestion = (id: string) => {
    setCostSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  // “Apply Changes” can re-rank as a simple theater effect
  const [applied, setApplied] = useState(false);
  const displayedFactories = useMemo(() => {
    if (!hasQuery) return [];
    const base = [...filteredFactories].sort(
      (a, b) => b.matchScore - a.matchScore
    );
    if (!applied) return base;
    // tiny fake shift when applied
    return base.map((f, idx) => ({
      ...f,
      matchScore: Math.min(99, f.matchScore + (idx === 0 ? 0 : 1)),
    }));
  }, [filteredFactories, hasQuery, applied]);

  // ------------------ FACTORIES ------------------
  const pageSize = 8;
  const [page, setPage] = useState(1);

  useEffect(() => {
    // when results change, reset to first page
    setPage(1);
  }, [query, applied]);

  const totalPages = Math.max(
    1,
    Math.ceil(displayedFactories.length / pageSize)
  );

  useEffect(() => {
    // clamp page if list shrinks
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const pagedFactories = useMemo(() => {
    const start = (page - 1) * pageSize;
    return displayedFactories.slice(start, start + pageSize);
  }, [displayedFactories, page]);

  const toggleFactory = (id: string) => {
    setSelectedFactoryIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allChecked =
    pagedFactories.length > 0 &&
    pagedFactories.every((f) => !!selectedFactoryIds[f.id]);

  const someChecked =
    pagedFactories.some((f) => !!selectedFactoryIds[f.id]) && !allChecked;

  const toggleAllFactories = () => {
    const next = !allChecked;
    setSelectedFactoryIds((prev) => {
      const copy = { ...prev };
      pagedFactories.forEach((f) => {
        copy[f.id] = next;
      });
      return copy;
    });
  };

  const MatchPill = ({ value }: { value: number }) => (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1.2,
        py: 0.55,
        borderRadius: 999,
        bgcolor: "rgba(46,125,50,0.10)",
        color: "#2E7D32",
        fontWeight: 800,
        fontSize: 13,
        lineHeight: 1,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "#2E7D32",
        }}
      />
      {value}
    </Box>
  );

  const ArrowDownwardTiny = () => (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: "1px solid rgba(46,125,50,0.55)",
        color: "#2E7D32",
        fontSize: 12,
        fontWeight: 800,
        lineHeight: 1,
      }}
    >
      ↓
    </Box>
  );

  return (
    <Box sx={{ mt: 4, px: { xs: 1, sm: 2, md: 4 } }}>
      {/* Search Box */}
      <Box
        sx={{
          bgcolor: "#eceff1",
          borderRadius: 3,
          p: 3,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0,
          position: "relative",
          minHeight: 120,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", height: 48 }}>
          <InputBase
            inputRef={inputRef}
            placeholder="Search factories, products, certifications..."
            defaultValue={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              ml: 1,
              flex: 1,
              borderRadius: 1,
              px: 2,
              height: 40,
              alignItems: "center",
            }}
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton onClick={goSearch} aria-label="search" sx={{ ml: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* bottom-left single icon */}
        <Box
          sx={{
            position: "absolute",
            left: 24,
            bottom: 16,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton size="small" sx={{ p: "6px" }} aria-label="filter">
            <Tune sx={{ color: "#222" }} />
          </IconButton>
          {hasQuery && (
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip size="small" label="Vietnam" variant="outlined" />
              <Chip size="small" label="BSCI" variant="outlined" />
              <Chip size="small" label="WRAP" variant="outlined" />
              <Chip size="small" label="SEDEX" variant="outlined" />
              <Box sx={{ flex: 1 }} />
            </Box>
          )}
        </Box>

        {/* bottom-right two icons (folder + upload) */}
        <Box
          sx={{
            position: "absolute",
            right: 24,
            bottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: "#1976d2",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => console.log("open techpack")}
          >
            techpack.pdf
          </Typography>

          <IconButton size="small" sx={{ p: "6px" }} aria-label="open-folder">
            <NoteAddOutlined sx={{ color: "#222" }} />
          </IconButton>

          <IconButton
            size="small"
            onClick={handleUploadClick}
            sx={{ bgcolor: "#222", borderRadius: "50%", p: "6px" }}
            aria-label="upload"
            disabled={uploading}
          >
            <UploadOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Suggested vs Results */}
      {!hasQuery ? (
        <Box>
          <Typography fontWeight={700} fontSize={15} mb={2}>
            AI Suggested Searches
          </Typography>
          {suggestions.map((s, i) => (
            <Typography
              key={i}
              color="#B3B3B3"
              fontSize={15}
              mb={1}
              sx={{ cursor: "pointer" }}
              onClick={() => router.push(`/search?q=${encodeURIComponent(s)}`)}
            >
              {s}
            </Typography>
          ))}
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {/* Cost Optimizations */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 3,
              border: "1px solid #e9e9e9",
              p: 3,
              mb: 2,
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography fontWeight={700} fontSize={18}>
                Cost Optimizations
              </Typography>
              <Chip
                label={`${costSuggestions.length} suggestions`}
                size="small"
                sx={{
                  bgcolor: "#F3EEFF",
                  color: "#6C4DE6",
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* Subheader */}
            <Typography color="#444" fontSize={14} sx={{ mb: 1 }}>
              Based on your RFQ, your projected cost per unit will be
              approximately{" "}
              <Box component="span" sx={{ fontWeight: 800 }}>
                $5.50
              </Box>
              .
            </Typography>

            <Typography
              color="#666"
              fontSize={14}
              sx={{ mb: 2, maxWidth: 900 }}
            >
              Sorsy identified a few ways to increase margin and reduce landed
              cost. Select any recommendations you&apos;d like to apply before
              matching additional factories.
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Body: suggestions left, buttons right */}
            <Box sx={{ display: "flex", gap: 3, alignItems: "stretch" }}>
              {/* Suggestions list */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {costSuggestions.map((s) => (
                  <Box
                    key={s.id}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      py: 1.3,
                    }}
                  >
                    <Switch
                      checked={s.enabled}
                      onChange={() => toggleSuggestion(s.id)}
                      sx={{
                        mt: -0.25,
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#2E7D32",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          { backgroundColor: "#2E7D32" },
                      }}
                    />

                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={700} fontSize={15}>
                        {s.label}
                      </Typography>
                      <Typography color="#777" fontSize={13}>
                        {s.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Buttons */}
              <Box
                sx={{
                  width: 320,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => console.log("preview cost")}
                  sx={{
                    bgcolor: "#222",
                    borderRadius: 999,
                    py: 1.4,
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#111" },
                  }}
                >
                  Preview Updated Cost
                </Button>

                <Button
                  variant="contained"
                  onClick={() => setApplied(true)}
                  sx={{
                    bgcolor: "#222",
                    borderRadius: 999,
                    py: 1.6,
                    fontWeight: 800,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#111" },
                  }}
                >
                  Apply Changes &amp; Match Factories
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Factories (UPDATED) */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 3,
              border: "1px solid #e9e9e9",
              p: 0,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                px: 3,
                py: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(28,28,28,0.08)",
              }}
            >
              <Typography fontWeight={700} fontSize={18}>
                Factories
                <Chip
                  label={`${displayedFactories.length} results`}
                  size="small"
                  sx={{
                    bgcolor: "#F3EEFF",
                    color: "#6C4DE6",
                    fontWeight: 600,
                  }}
                />
              </Typography>

              <IconButton size="small" aria-label="bookmark">
                {/* placeholder bookmark icon in mock */}
                <BookmarkIcon sx={{ color: "#6B7280" }} />
              </IconButton>
            </Box>

            {displayedFactories.length === 0 ? (
              <Box sx={{ px: 3, py: 3 }}>
                <Typography color="#666">No results found.</Typography>
              </Box>
            ) : (
              <>
                <TableContainer
                  component={Box}
                  sx={{ width: "100%", boxShadow: "none" }}
                >
                  <Table size="medium" sx={{ tableLayout: "fixed" }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#FAFAFA" }}>
                        {/* checkbox */}
                        <TableCell
                          align="center"
                          sx={{
                            width: 52,
                            borderBottom: "1px solid rgba(28,28,28,0.10)",
                          }}
                        >
                          <Checkbox
                            size="small"
                            indeterminate={someChecked}
                            checked={allChecked}
                            onChange={toggleAllFactories}
                          />
                        </TableCell>

                        <TableCell
                          sx={{
                            width: 320,
                            borderBottom: "1px solid rgba(28,28,28,0.10)",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(28,28,28,0.5)" }}
                          >
                            Name
                          </Typography>
                        </TableCell>

                        <TableCell
                          sx={{
                            width: 140,
                            borderBottom: "1px solid rgba(28,28,28,0.10)",
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: "rgba(28,28,28,0.5)" }}
                            >
                              Match
                            </Typography>
                            <ArrowDownwardTiny />
                          </Stack>
                        </TableCell>

                        <TableCell
                          sx={{
                            width: 120,
                            borderBottom: "1px solid rgba(28,28,28,0.10)",
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: "rgba(28,28,28,0.5)" }}
                            >
                              MOQ
                            </Typography>
                            <Tooltip title="Minimum order quantity">
                              <InfoOutlinedIcon
                                sx={{
                                  fontSize: 16,
                                  color: "rgba(28,28,28,0.35)",
                                }}
                              />
                            </Tooltip>
                          </Stack>
                        </TableCell>

                        <TableCell
                          sx={{
                            borderBottom: "1px solid rgba(28,28,28,0.10)",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(28,28,28,0.5)" }}
                          >
                            Description
                          </Typography>
                        </TableCell>

                        <TableCell
                          sx={{
                            width: 260,
                            borderBottom: "1px solid rgba(28,28,28,0.10)",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(28,28,28,0.5)" }}
                          >
                            Certifications
                          </Typography>
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            width: 120,
                            borderBottom: "1px solid rgba(28,28,28,0.10)",
                          }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {pagedFactories.map((f, idx) => {
                        const isSelected = !!selectedFactoryIds[f.id];
                        const bg = isSelected ? "#F7F9FB" : "#fff";
                        const border = "1px solid rgba(28,28,28,0.06)";
                        const certs = f.certifications ?? [];
                        const shown = certs.slice(0, 3);
                        const extra = certs.length - shown.length;

                        return (
                          <TableRow
                            key={f.id}
                            hover
                            selected={isSelected}
                            sx={{ cursor: "pointer" }}
                            onClick={() => router.push(`/factories/${f.id}`)}
                          >
                            {/* Checkbox */}
                            <TableCell
                              align="center"
                              sx={{
                                width: 52,
                                backgroundColor: bg,
                                borderBottom: border,
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Checkbox
                                size="small"
                                checked={isSelected}
                                onChange={() => toggleFactory(f.id)}
                              />
                            </TableCell>

                            {/* Name */}
                            <TableCell
                              sx={{ backgroundColor: bg, borderBottom: border }}
                            >
                              <Stack
                                direction="row"
                                spacing={1.5}
                                alignItems="center"
                                sx={{ minWidth: 0 }}
                              >
                                <Avatar
                                  sx={{
                                    width: 34,
                                    height: 34,
                                    bgcolor: avatarBg[idx % avatarBg.length],
                                    color: "#5B43D6",
                                    fontWeight: 700,
                                    fontSize: 13,
                                  }}
                                >
                                  {initials(f.name)}
                                </Avatar>

                                <Box sx={{ minWidth: 0 }}>
                                  <Typography
                                    fontWeight={800}
                                    fontSize={14}
                                    noWrap
                                  >
                                    {f.name}
                                  </Typography>
                                  <Typography
                                    fontSize={12}
                                    color="#6B7280"
                                    noWrap
                                  >
                                    {f.location}
                                  </Typography>
                                </Box>
                              </Stack>
                            </TableCell>

                            {/* Match */}
                            <TableCell
                              sx={{ backgroundColor: bg, borderBottom: border }}
                            >
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <MatchPill value={f.matchScore} />

                                <Tooltip title="How we calculate match">
                                  <Box
                                    sx={{
                                      width: 18,
                                      height: 18,
                                      borderRadius: "50%",
                                      border: "1px solid rgba(46,125,50,0.55)",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "#2E7D32",
                                      fontSize: 12,
                                      fontWeight: 800,
                                    }}
                                  >
                                    ?
                                  </Box>
                                </Tooltip>
                              </Stack>
                            </TableCell>

                            {/* MOQ */}
                            <TableCell
                              sx={{ backgroundColor: bg, borderBottom: border }}
                            >
                              <Typography fontWeight={600} color="#6B7280">
                                {f.moq.toLocaleString()}
                              </Typography>
                            </TableCell>

                            {/* Description */}
                            <TableCell
                              sx={{ backgroundColor: bg, borderBottom: border }}
                            >
                              <Typography
                                fontSize={13}
                                color="#6B7280"
                                sx={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {f.description}
                              </Typography>
                            </TableCell>

                            {/* Certifications */}
                            <TableCell
                              sx={{ backgroundColor: bg, borderBottom: border }}
                            >
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ flexWrap: "wrap" }}
                              >
                                {shown.map((c) => (
                                  <Chip
                                    key={c}
                                    size="small"
                                    label={c}
                                    sx={{
                                      bgcolor: "#EEF2FF",
                                      color: "#3949AB",
                                      fontWeight: 700,
                                    }}
                                  />
                                ))}
                                {extra > 0 && (
                                  <Chip
                                    size="small"
                                    label={`+${extra}`}
                                    sx={{
                                      bgcolor: "#F3F4F6",
                                      color: "#374151",
                                      fontWeight: 700,
                                    }}
                                  />
                                )}
                              </Stack>
                            </TableCell>

                            {/* Actions */}
                            <TableCell
                              align="right"
                              sx={{
                                backgroundColor: bg,
                                borderBottom: border,
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="flex-end"
                              >
                                <IconButton size="small" aria-label="delete">
                                  <DeleteOutlineIcon
                                    sx={{ color: "#6B7280" }}
                                  />
                                </IconButton>
                                <IconButton size="small" aria-label="edit">
                                  <EditOutlinedIcon sx={{ color: "#6B7280" }} />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination bar */}
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderTop: "1px solid rgba(28,28,28,0.08)",
                    bgcolor: "#fff",
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                  >
                    Previous
                  </Button>

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    {Array.from({ length: Math.min(totalPages, 10) }).map(
                      (_, i) => {
                        const pageNum = i + 1;
                        const active = pageNum === page;
                        return (
                          <Box
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: 2,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontWeight: 700,
                              color: active ? "#6C4DE6" : "#6B7280",
                              bgcolor: active ? "#F3EEFF" : "transparent",
                              userSelect: "none",
                            }}
                          >
                            {pageNum}
                          </Box>
                        );
                      }
                    )}
                  </Box>

                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}

      {/* Hidden file input for uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*,application/pdf"
      />
    </Box>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}
