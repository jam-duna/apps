"use client";

import React from "react";
import type { Report, ServiceInfoDetail } from "../../../types/index.js";
import { Paper, Typography } from "@mui/material";
import { ItemMode, WorkPackage } from "../index.js";

export interface ReportWithTime {
    report: Report;
    timestamp: number;
}

interface RecentWorkPackageProps {
    reports: ReportWithTime[];
    services: ServiceInfoDetail[];
}

export function RecentWorkPackages(param : RecentWorkPackageProps) {
    const displayReports = param.reports.slice(0, 8);

    return (
        <Paper variant="outlined">
            <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 2, px: 1.5, py: 2, borderBottom: "1px solid #ccc", m: 0 }}
            >
                Recent Work Packages
            </Typography>
            {(displayReports && displayReports.length > 0) ? 
                (displayReports.map((item, itemIndex) => {
                    return (
                        <WorkPackage
                            key={itemIndex}
                            mode={ItemMode.Medium}
                            hash={item.report.package_spec.hash}
                            report={item.report}
                            timestamp={item.timestamp}
                            services={param.services}
                        />
                    );
                })) : 
                (<Typography
                        variant="subtitle2"
                        sx={{ p: 2, "&:hover": { backgroundColor: "#f9f9f9" } }}
                    >
                    No work packages
                </Typography>)}
        </Paper>
    );
}