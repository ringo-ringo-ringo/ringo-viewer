/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LinearProgress } from "@mui/material";
import Text from "@/app/components/Header/Text";

export default function Header({ step, score, maxScore, isLoading }: any) {
    const header = css`
        width: 100%;
        background-color: #b8b8b8;
        position: relative;
        z-index: 2;
        height: 50px;
        text-align: right;
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
                <Text>残りの処理のかず : {isLoading}</Text>
                <Text>step : {step}</Text>
                <Text>
                    Score : {score} / {maxScore}
                </Text>
            </header>
        </>
    );
}
