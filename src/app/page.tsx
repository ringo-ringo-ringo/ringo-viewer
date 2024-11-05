"use client";

import useLog from "@/app/hook/useLog";
import Viewer from "@/app/Viewer";
import { useEffect } from "react";
import { Button } from "@mui/material";

export default function Home() {
    const [step, setStep, isPause, setIsPause, simulation, setSimulation] = useLog();

    const stepUp = () => {
        setStep((step: number) => step + 1);
    };

    return (
        <>
            <Viewer simulation={simulation} step={step}></Viewer>
            <Button onClick={stepUp} variant="outlined"> go to next step : this step is {step}</Button>
        </>
    );
}
