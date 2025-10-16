"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { useRef } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const inputRef = useRef<HTMLInputElement>(null);

  // Example AI suggestions
  const suggestions = [
    "Women’s knit sweaters",
    "Athletic sneakers for kids",
    "Organic cotton t-shirts",
    "Recycled polyester tote bags",
  ];

  // Handle Enter key in search box
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = inputRef.current?.value?.trim();
      if (value) {
        router.push(`/search?q=${encodeURIComponent(value)}`);
      }
    }
  };

  return (
    <Box sx={{ mt: 4, px: { xs: 1, sm: 2, md: 4 } }}>
      {/* Search Box */}
      <Box
        sx={{
          bgcolor: "#eceff1",
          borderRadius: 3,
          p: 3,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 0,
          position: "relative",
          minHeight: 120,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", height: 48 }}>
          <SearchIcon sx={{ color: "#222", fontSize: 24, mr: 1 }} />
          <InputBase
            inputRef={inputRef}
            placeholder="Type what you’re looking for…"
            sx={{ flex: 1, fontSize: 16 }}
            defaultValue={query}
            onKeyDown={handleKeyDown}
          />
        </Box>
        {/* Bottom left icon inside the search box */}
        <Box
          sx={{
            position: "absolute",
            left: 24,
            bottom: 16,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton>
            <FilterAltOutlinedIcon sx={{ color: "#222" }} />
          </IconButton>
        </Box>
        {/* Two icons at bottom right */}
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
          <IconButton>
            <FolderOpenOutlinedIcon sx={{ color: "#222" }} />
          </IconButton>
          <IconButton sx={{ bgcolor: "#222", borderRadius: "50%", p: "6px" }}>
            <UploadOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </Box>

      {/* AI Suggested Searches */}
      <Box>
        <Typography fontWeight={700} fontSize={15} mb={2}>
          AI Suggested Searches for {query ? `"${query}"` : ""}
        </Typography>
        {suggestions.map((s, i) => (
          <Typography key={i} color="#B3B3B3" fontSize={15} mb={1}>
            {s}
          </Typography>
        ))}
      </Box>
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
