"use client";

import useLog from "@/app/hook/useLog";
import Viewer from "@/app/Viewer";
import { useEffect } from "react";
import { Button, Slider } from "@mui/material";

export default function Home() {
    const [step, setStep, isPause, setIsPause, simulation, setSimulation] = useLog();

    const stepUp = (count: number) => {
        setStep((prevStep: number) => prevStep + count);
    };

    const stepDown = (count: number) => {
        setStep((prevStep: number) => prevStep - count);
    };

    const changeSlider = (e) => {
        setStep(e.target.value);
    };

    console.log("現在のシミュレーション");
    console.log(simulation);

    return (
        <>
            <Viewer simulation={simulation} step={step}></Viewer>
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
                go to next step : this step is {step}
            </Button>
            <Button
                onClick={() => {
                    stepUp(10);
                }}
                variant="outlined"
            >
                go to next 10 step : this step is {step}
            </Button>
            <Slider size="small" defaultValue={0} aria-label="Small" valueLabelDisplay="auto" min={0} max={300} onChange={changeSlider} />
        </>
    );
}
