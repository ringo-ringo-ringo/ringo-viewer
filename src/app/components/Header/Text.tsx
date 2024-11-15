/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Text({ children }: any) {
    const text = css`
        margin: 0 15px;
    `;
    return (
        <>
            <span css={text}>{children}</span>
        </>
    );
}
