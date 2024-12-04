/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MuiAlert from "@mui/material/Alert";

export default function Alert({ alertList }: any) {
    const base = css`
        position: absolute;
        left: 10px;
        bottom: calc(76.5px + 10px);
        z-index: 100;
        .alert{
            margin-top: 5px;
        }
    `;

    return (
        <>
            <div css={base}>
                {alertList.map((alert: string, index: any) => {
                    return (
                        <MuiAlert className="alert" key={index} severity="warning">
                            {alert}
                        </MuiAlert>
                    );
                })}
            </div>
        </>
    );
}
