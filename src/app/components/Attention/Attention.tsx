/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Button } from "@mui/material";

export default function Attention({ attentionData, setAttentionData, setPerceptionId, setFilter }: any) {
    const body = css`
        position: absolute;

        z-index: 2;
        width: 400px;
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
                    知覚情報を見る - 未実装
                </Button>
            );
        }
    };

    return (
        <>
            <div css={body}>
                <Button onClick={clear} variant="outlined">
                    消す
                </Button>
                {perception()}
                <li>
                    {attentionList.map((e) => {
                        return <ul key={e}>{e}</ul>;
                    })}
                </li>
            </div>
        </>
    );
}