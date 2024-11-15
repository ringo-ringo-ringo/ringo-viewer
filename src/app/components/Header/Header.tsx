/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Text from "@/app/components/Header/Text";

export default function Header({ step, score, maxScore, isLoading }: any) {
    const header = css`
        background-color: #808080bf;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 2;
        margin: 5px 10px;
        text-align: right;
        line-height: 50px;
        border-radius: 10px;
    `;

    return (
        <>
            <header css={header}>
                <Text>残りの処理のかず : {isLoading}</Text>
                <Text>step : {step}</Text>
                <Text>
                    Score : {score} / {maxScore}
                </Text>
            </header>
        </>
    );
}
