// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { fetchSegment } from "../../hooks/useFetchSegment.js";
import { getRpcUrlFromWs } from "../../utils/ws.js";

const PAGE_DIM = 64; // 64×64 = 4096 bytes per page
const CELL_SIZE = 4; // 4 px pixels
const PAGES_PER_ROW = 3; // 3 × 3 grid
const CANVAS_SIDE = PAGE_DIM * PAGES_PER_ROW * CELL_SIZE; // 192*4 = 768px

function segmentToPage(raw: string): Uint8Array {
  let data = raw.trim();

  const hasPrefix = data.startsWith("0x") || data.startsWith("0X");
  if (hasPrefix) data = data.slice(2);

  const isPureHex = /^[0-9a-fA-F]+$/.test(data) && data.length === 8208; // 4104*2
  if (isPureHex) {
    const bytes = new Uint8Array(4104);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(data.substr(i * 2, 2), 16);
    }
    return bytes.subarray(8);
  }

  const bin = atob(data);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.subarray(8);
}

export default function GameOfLifeViewer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hash = searchParams.get("hash") || "";

  const [pages, setPages] = useState<(Uint8Array | null)[]>(
    Array(9).fill(null)
  );
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hash) return;
    (async () => {
      try {
        const raws = await Promise.all(
          Array.from({ length: 9 }, (_, i) =>
            fetchSegment(hash, i, getRpcUrlFromWs(localStorage.getItem("jamUrl") || "dot-0.jamduna.org"))
          )
        );
        setPages(raws.map((r) => (r ? segmentToPage(r) : null)));
      } catch (e) {
        console.error("Failed to fetch segments:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [hash]);

  useEffect(() => {
    if (pages.some((p) => p === null)) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = CANVAS_SIDE;
    canvas.height = CANVAS_SIDE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    pages.forEach((page, idx) => {
      if (!page) return;
      const rowOff = Math.floor(idx / PAGES_PER_ROW);
      const colOff = idx % PAGES_PER_ROW;

      for (let r = 0; r < PAGE_DIM; r++) {
        for (let c = 0; c < PAGE_DIM; c++) {
          const val = page[r * PAGE_DIM + c];
          if (val === 1) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(
              (colOff * PAGE_DIM + c) * CELL_SIZE,
              (rowOff * PAGE_DIM + r) * CELL_SIZE,
              CELL_SIZE,
              CELL_SIZE
            );
          }
        }
      }
    });
  }, [pages]);

  useEffect(() => {
    if (!hash) navigate("/");
  }, [hash, navigate]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }} className="hasOwnMaxWidth">
      <Typography variant="h5" gutterBottom>
        Game&nbsp;of&nbsp;Life&nbsp;Viewer
      </Typography>

      {loading ? (
        <Box mt={6}>
          <CircularProgress />
          <Typography mt={2}>Loading segments…</Typography>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }} />
        </Box>
      )}
    </Container>
  );
}