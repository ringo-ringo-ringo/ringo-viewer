"use client";

import useLog from "@/app/hook/useLog";
import Viewer from "@/app/Viewer";
import { useEffect, useState } from "react";
import { Button, Slider, LinearProgress } from "@mui/material";
import Attention from "@/app/components/Attention";
import Sidebar from "@/app/components/Sidebar";

export default function Home() {
    const [step, setStep, isPause, setIsPause, simulation, setSimulation, isLoading] = useLog();

    const [attentionData, setAttentionData] = useState(null);

    const [filter, setFilter] = useState({
        ROAD: true,
        BLOCKADE: true,
        BUILDING: true,
        REFUGE: true,
        HYDRANT: true,
        GAS_STATION: true,
        FIRE_STATION: true,
        AMBULANCE_CENTRE: true,
        POLICE_OFFICE: true,
        CIVILIAN: true,
        FIRE_BRIGADE: true,
        AMBULANCE_TEAM: true,
        POLICE_FORCE: true,
        POSITION_HISTORY: true,
    });

    const stepUp = (count: number) => {
        if (step + count <= 300) {
            setStep((prevStep: number) => prevStep + count);
        }
    };

    const stepDown = (count: number) => {
        if (step - count >= 0) {
            setStep((prevStep: number) => prevStep - count);
        }
    };

    const changeSlider = (e: any) => {
        setStep(e.target.value);
    };

    console.log("現在のステップ");
    console.log(step);
    console.log("現在のシミュレーション");
    console.log(simulation);

    return (
        <>
            <Viewer simulation={simulation} step={step} setAttentionData={setAttentionData} filter={filter}></Viewer>
            {isLoading ? <LinearProgress /> : null}
            <p>残りの読み込むべきステップ : {isLoading}</p>
            <p>step : {step}</p>
            <Button
                onClick={() => {
                    setStep(0);
                }}
                variant="outlined"
            >
                go to initial step
            </Button>
            <Button
                onClick={() => {
                    stepDown(10);
                }}
                variant="outlined"
            >
                go to prev 10 step
            </Button>
            <Button
                onClick={() => {
                    stepDown(1);
                }}
                variant="outlined"
            >
                go to prev step
            </Button>
            <Button
                onClick={() => {
                    stepUp(1);
                }}
                variant="outlined"
            >
                go to next step
            </Button>
            <Button
                onClick={() => {
                    stepUp(10);
                }}
                variant="outlined"
            >
                go to next 10 step
            </Button>
            <Button
                onClick={() => {
                    setStep(300);
                }}
                variant="outlined"
            >
                go to last step
            </Button>
            <Slider size="small" value={step} aria-label="Small" valueLabelDisplay="auto" min={0} max={300} onChange={changeSlider} />
            <div style={{ position: "relative", zIndex: 2, width: "250px", backgroundColor: "lightgray", border: "1px black solid" }}>
                <Sidebar filter={filter} setFilter={setFilter}></Sidebar>
            </div>
            <div style={{ position: "relative", zIndex: 2, backgroundColor: "lightgray" }}>{attentionData ? <Attention attentionData={attentionData} setAttentionData={setAttentionData}></Attention> : ""}</div>
        </>
    );
}
