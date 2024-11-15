/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Text from "@/app/components/Header/Text";
import { LinearProgress } from "@mui/material";

export default function Header({ step, score, maxScore, isLoading }: any) {
    const header = css`
        background-color: #808080bf;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 2;
        padding: 5px 10px;
        text-align: right;
        border-radius: 10px;
        overflow: hidden;
    `;

    const line = css`
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 3;
        background-color: #7c997c;
        span{
            background-color: #7fdf7f;
        }
    `;

    return (
        <>
            <header css={header}>
                <Text>step : {step}</Text>
                <Text>
                    score : {score} / {maxScore}
                </Text>
                <Text>remaining processes : {isLoading}</Text>
                <LinearProgress variant="determinate" value={(score / maxScore) * 100} css={line} />
            </header>
        </>
    );
}
