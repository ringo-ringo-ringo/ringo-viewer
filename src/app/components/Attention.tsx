import { useState } from "react";
import { Button } from "@mui/material";

export default function Attention({ attentionData, setAttentionData, setPerceptionId }: any) {
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
            <Button onClick={clear} variant="outlined">
                消す
            </Button>
            <li>
                {attentionList.map((e) => {
                    return <ul key={e}>{e}</ul>;
                })}
            </li>
            {perception()}
        </>
    );
}
