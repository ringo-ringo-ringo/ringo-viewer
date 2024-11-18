/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

export default function Attention({ attentionData, setAttentionData, setPerceptionId, setFilter }: any) {
    const body = css`
        position: absolute;
        right: 10px;
        max-height: calc(100% - 20px - 36.5px - 40px);
        z-index: 2;
        width: 400px;
        background-color: #9f9f9ff5;
        border-radius: 10px;
        padding: 20px;
        overflow-y: scroll;
        margin: 10px 0;
        li {
            margin: 10px 0;
            padding: 2px 4px;
            transition: 0.2s;
            border-radius: 10px;
            :hover {
                background-color: #b2b2b2f5;
            }
        }
    `;

    const clearIcon = css`
        position: relative;
        height: 30px;
        .icon {
            position: absolute;
            right: 0;
            height: 30px;
            width: 30px;
            transition: 0.2s;
            :hover {
                color: #f3f3f3f5;
                cursor: pointer;
            }
        }
    `;

    const attentionList = [];
    for (const key in attentionData) {
        const data = key + " : " + JSON.stringify(attentionData[key], null, 2);
        attentionList.push(data);
    }

    const clear = () => {
        setAttentionData(null);
    };

    const changePerceptionId = () => {
        setPerceptionId(attentionData.entityId);
        setFilter((prevFilter: any) => {
            const newFilter = prevFilter;
            for (const key in newFilter) {
                newFilter[key] = false;
            }
            return newFilter;
        });
    };

    const perception = () => {
        if (attentionData.entity === "CIVILIAN" || attentionData.entity === "FIRE_BRIGADE" || attentionData.entity === "AMBULANCE_TEAM" || attentionData.entity === "POLICE_FORCE") {
            return (
                <Button variant="outlined" onClick={changePerceptionId}>
                    {/* 知覚情報を見る */}
                    view perception
                </Button>
            );
        }
    };

    return (
        <>
            <div css={body}>
                <div css={clearIcon}>
                    <Tooltip title="delete">
                        <ClearIcon className="icon" onClick={clear}></ClearIcon>
                    </Tooltip>
                </div>

                {perception()}
                <ul>
                    {attentionList.map((e) => {
                        return <li key={e}>{e}</li>;
                    })}
                </ul>
            </div>
        </>
    );
}
