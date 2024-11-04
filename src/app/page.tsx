"use client";

import useLog from "@/app/hook/useLog";
import Viewer from "@/app/Viewer";
import { useEffect } from "react";

export default function Home() {
    const [step, setStep, isPause, setIsPause, simulation, setSimulation] = useLog();

    return (
        <>
            <Viewer simulation={simulation} step={step}></Viewer>
        </>
    );
}
