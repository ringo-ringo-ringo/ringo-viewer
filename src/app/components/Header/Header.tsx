/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LinearProgress } from "@mui/material";

export default function Header({ step, score, maxScore, isLoading }: any) {
    const header = css`
        width: 100%;
        background-color: #b8b8b8;
        position: relative;
        z-index: 2;
        padding: 5px 0px;
        text-align: right;
        span {
            margin: 0 10px;
        }
        .line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
    `;

    return (
        <>
            <header css={header}>
                {isLoading ? <LinearProgress className="line" /> : null}
                <span>残りの処理のかず : {isLoading}</span>
                <span>step : {step}</span>
                <span>
                    Score : {score} / {maxScore}
                </span>
            </header>
        </>
    );
}
