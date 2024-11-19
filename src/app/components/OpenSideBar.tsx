/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Tooltip } from "@mui/material";

export default function OpenSideBar({ setShowSideBar }: any) {
    const body = css`
        position: absolute;
        top: 100px;
        left: 10px;
        width: 30px;
        height: 30px;
        background-color: #9f9f9fbe;
        border-radius: 5px;
        transition: 0.2s;
        :hover {
            color: #f3f3f3f5;
            cursor: pointer;
        }
        .icon {
            width: 30px;
            height: 30px;
        }
    `;

    const openHandler = () => {
        setShowSideBar(true);
    };

    return (
        <>
            <div css={body} onClick={openHandler}>
                <Tooltip title="open filter">
                    <ChevronRightIcon className="icon"></ChevronRightIcon>
                </Tooltip>
            </div>
        </>
    );
}
