"use client";

import useLog from "@/app/hook/useLog";
import Viewer from "@/app/components/Viewer";
import { useEffect, useState } from "react";
import { Button, Slider, LinearProgress } from "@mui/material";
import Sidebar from "@/app/components/Sidebar";
import useScore from "@/app/hook/useScore";
import Header from "@/app/components/Header/Header";
import Linear from "@/app/components/Linear";
import Bottomer from "@/app/components/Bottomer";
import Alert from "@/app/components/Alert";

export default function Home() {
    const [step, setStep, isPause, setIsPause, simulation, setSimulation, perceptionId, setPerceptionId, isLoading, maxStep] = useLog();
    const [score, maxScore] = useScore(step, simulation);

    const [attentionData, setAttentionData] = useState(null);

    const [sliderValue, setSliderValue] = useState<number>(0);

    useEffect(() => {
        changeCommittedSlider("a", step);
    }, [step]);

    const [buttonDisable, setButtonDisable] = useState<boolean>(false);

    const [IdSearch, setIdSearch] = useState<string>("");

    useEffect(() => {
        if (isLoading > 0) {
            setButtonDisable(true);
        } else {
            setButtonDisable(false);
        }
    }, [isLoading]);

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
        PATH: false,
        CLEAR: false,
        CLEAR_AREA: true,
        COMMUNICATION_TARGET: false,
        HELP_MESSAGE: false,
    });

    const [perceptionFilter, setPerceptionFilter] = useState({
        visibleROAD: true,
        visibleBLOCKADE: true,
        visibleBUILDING: true,
        visibleREFUGE: true,
        visibleHYDRANT: true,
        visibleGAS_STATION: true,
        visibleFIRE_STATION: true,
        visibleAMBULANCE_CENTRE: true,
        visiblePOLICE_OFFICE: true,
        visibleCIVILIAN: true,
        visibleFIRE_BRIGADE: true,
        visibleAMBULANCE_TEAM: true,
        visiblePOLICE_FORCE: true,
        communicationROAD: true,
        communicationAMBULANCE_TEAM: true,
        communicationCIVILIAN: true,
        communicationFIRE_BRIGADE: true,
        communicationPOLICE_FORCE: true,
        communicationCENTRALIZED: true,

        communicationTarget: true,
    });

    const stepUp = (count: number) => {
        if (step + count <= maxStep) {
            setStep((prevStep: number) => prevStep + count);
        }
    };

    const stepDown = (count: number) => {
        if (step - count >= 0) {
            setStep((prevStep: number) => prevStep - count);
        }
    };

    const deletePerceptionId = () => {
        setPerceptionId(null);
        setFilter((prevFilter: any) => {
            const newFilter = prevFilter;
            for (const key in newFilter) {
                if (key === "COMMAND_PATH" || key === "COMMAND_CLEAR" || key === "COMMAND_COMMUNICATION_TARGET" || key === "COMMAND_HELP_MESSAGE") {
                    newFilter[key] = false;
                } else {
                    newFilter[key] = true;
                }
            }
            return newFilter;
        });
    };

    const changeSlider = (e: any) => {
        setSliderValue(e.target.value);
    };

    const changeCommittedSlider = (e: any, value: any) => {
        setSliderValue(value);
        setStep(value);
    };

    return (
        <>
            <Linear isLoading={isLoading}></Linear>
            <Header step={step} score={score} maxScore={maxScore} isLoading={isLoading} maxStep={maxStep}></Header>
            <Viewer simulation={simulation} step={step} setAttentionData={setAttentionData} filter={filter} perceptionId={perceptionId} perceptionFilter={perceptionFilter} attentionData={attentionData} setPerceptionId={setPerceptionId} setFilter={setFilter} setPerceptionFilter={setPerceptionFilter} IdSearch={IdSearch} setIdSearch={setIdSearch}></Viewer>
            <Alert></Alert>
            <Bottomer sliderValue={sliderValue} changeSlider={changeSlider} changeCommittedSlider={changeCommittedSlider} buttonDisable={buttonDisable} setStep={setStep} stepDown={stepDown} stepUp={stepUp} perceptionId={perceptionId} deletePerceptionId={deletePerceptionId} maxStep={maxStep}></Bottomer>
        </>
    );
}
