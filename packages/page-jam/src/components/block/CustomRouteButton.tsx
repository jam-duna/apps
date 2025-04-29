"use client";

import React from "react";
import { Button } from "@mui/material";
import { NodeData } from "json-edit-react"; // Use the library's NodeData type

interface RouteButtonValue {
  target: string;
}

const RouteButton: React.FC<{ nodeData: NodeData }> = ({ nodeData }) => {
  const handleClick = () => {
    const target =
      typeof nodeData.value === "string" && nodeData.value.startsWith("http")
        ? nodeData.value
        : "/";
    window.location.href = target;
  };

  return (
    <Button 
      size="small" 
      variant="outlined"
      onClick={handleClick}
    >
      {">"}
    </Button>
  );
};

export const CustomRouteButtonDefinition = {
  condition: (key: string, value: unknown): value is RouteButtonValue =>
    typeof value === "object" && value !== null && "target" in value,
  matches: (key: string, value: unknown): key is string => true,
  Element: RouteButton,
  onClick: (nodeData: NodeData, e: React.MouseEvent) => {
    // No-op because RouteButton handles its own onClick.
  },
};
