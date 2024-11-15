/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
            color: #91f0ff;
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
                <ArrowForwardIosIcon className="icon"></ArrowForwardIosIcon>
            </div>
        </>
    );
}
