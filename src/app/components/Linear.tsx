/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LinearProgress } from "@mui/material";

export default function Linear({ isLoading }: any) {
    const line = css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 3;
    `;

    return <>{isLoading ? <LinearProgress css={line}/> : null}</>;
}
