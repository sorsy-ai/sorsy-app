"use client";
import * as React from "react";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import type { ReactNode } from "react";

type StyledCardProps = {
  /** Left side of header */
  title?: ReactNode;
  /** Optional subtitle under title (left side) */
  subtitle?: ReactNode;
  /**
   * Right side of header.
   * - Single node -> rendered as-is
   * - Array of nodes -> rendered in a row (gap)
   * - If actionsLayout="grid", renders as a CSS grid with actionsColumns
   */
  actions?: ReactNode | ReactNode[];

  /** "row" (default) puts items in a flex row; "grid" uses CSS grid */
  actionsLayout?: "row" | "grid";
  /** Number of columns for grid layout (or responsive template string) */
  actionsColumns?: number | string;

  /** Show/Hide header divider space via margin only */
  hideHeader?: boolean;

  children?: ReactNode;
};

export function StyledCard({
  title,
  subtitle,
  actions,
  actionsLayout = "row",
  actionsColumns = 2,
  hideHeader = false,
  children,
}: StyledCardProps) {
  const hasHeader = !!(title || subtitle || actions);

  const renderActions = () => {
    if (!actions) return null;

    // Single node
    if (!Array.isArray(actions)) {
      return <Button>{actions}</Button>;
    }

    // Array of nodes
    if (actionsLayout === "grid") {
      const template =
        typeof actionsColumns === "number"
          ? `repeat(${actionsColumns}, minmax(0,1fr))`
          : actionsColumns; // allow custom templates like "auto auto"
      return (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: template,
            gap: 1.5,
            alignItems: "center",
            justifyItems: "end",
          }}
        >
          {actions.map((a, i) => (
            <Box key={i}>{a}</Box>
          ))}
        </Box>
      );
    }

    // Row layout
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {actions.map((a, i) => (
          <Box key={i}>{a}</Box>
        ))}
      </Box>
    );
  };

  return (
    <Card
      sx={{
           display: "flex",
    flexDirection: "column",
    height: "100%",           // ⬅️ important
    borderRadius: 2,
    boxShadow: "none",
    border: "1px solid #E4E4E7",
    bgcolor: "#fff"
      }}
    >
      <CardContent  >
        {hasHeader && !hideHeader && (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                {typeof title === "string" ? (
                  <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                    {title}
                  </Typography>
                ) : (
                  title
                )}
                {subtitle && (
                  <Box sx={{ mt: 0.5 }}>
                    {typeof subtitle === "string" ? (
                      <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                        {subtitle}
                      </Typography>
                    ) : (
                      subtitle
                    )}
                  </Box>
                )}
              </Box>

              <Box sx={{ flexShrink: 0 }}>{renderActions()}</Box>
            </Box>
          </Box>
        )}

        {children}
      </CardContent>
    </Card>
  );
}
