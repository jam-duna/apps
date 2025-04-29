"use client";

import React from "react";
import { ValidatorShowCase } from "../../../../types/index.js";
import { Paper, Typography } from "@mui/material";
import { ItemMode } from "../../index.js";
import { Validator } from "../ValidatorItem/index.js";

interface ActiveValidatorsProps {
    validators: ValidatorShowCase[];
}

export function ActiveValidators(param: ActiveValidatorsProps) {

    return (
        <Paper variant="outlined">
            <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 2, px: 1.5, py: 2, borderBottom: "1px solid #ccc", m: 0 }}
            >
                Active Validators
            </Typography>
            {(param.validators.length > 0) ? 
                (param.validators.map((item, itemIndex) => {
                    return (
                        <Validator key={itemIndex} mode={ItemMode.Medium} validator={item}/>
                    );
                })) : 
                (<Typography
                        variant="subtitle2"
                        sx={{ p: 2, "&:hover": { backgroundColor: "#f9f9f9" } }}
                    >
                    No active validators
                </Typography>)}
        </Paper>
    );
}