"use client";

import useLog from "@/app/hook/useLog";
import Viewer from "@/app/Viewer";
import { useEffect } from "react";
import { Button } from "@mui/material";

export default function Home() {
    const [step, setStep, isPause, setIsPause, simulation, setSimulation] = useLog();

    const stepUp = (count: number) => {
        setStep((prevStep: number) => prevStep + count);
    };

    const stepDown = () => {
        setStep((prevStep: number) => prevStep - 1);
    };

    console.log("現在のシミュレーション");
    console.log(simulation);

    return (
        <>
            <Viewer simulation={simulation} step={step}></Viewer>
            <Button onClick={stepDown} variant="outlined">
                go to prev step
            </Button>
            <Button onClick={() => stepUp(1)} variant="outlined">
                go to next step : this step is {step}
            </Button>
        </>
    );
}
