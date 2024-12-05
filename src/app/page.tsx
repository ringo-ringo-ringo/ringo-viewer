"use client";

import useLog from "@/hook/useLog";
import Viewer from "@/components/Viewer";
import { useEffect, useState } from "react";
import { Button, Slider, LinearProgress } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import useScore from "@/hook/useScore";
import Header from "@/components/Header/Header";
import Linear from "@/components/Linear";
import Bottomer from "@/components/Bottomer";
import Alert from "@/components/Alert";

export default function Home(prop: any) {
    const [step, setStep, isPause, setIsPause, simulation, setSimulation, perceptionId, setPerceptionId, isLoading, maxStep] = useLog(prop.logPath);
    const [score, maxScore] = useScore(step, simulation);

    const [attentionData, setAttentionData] = useState(null);

    const [sliderValue, setSliderValue] = useState<number>(0);

    const [alertList, setAlertList] = useState<string[]>([]);

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
        } else {
            setAlert(`Step ${Number(step) + Number(count)} exceeds the maximum allowed step of ${maxStep}. Can choose a step between 0 and ${maxStep}.`);
        }
    };

    const stepDown = (count: number) => {
        if (step - count >= 0) {
            setStep((prevStep: number) => prevStep - count);
        } else {
            setAlert(`Step ${Number(step) - Number(count)} is below the minimum allowed step of 0. Can choose a step between 0 and ${maxStep}.`);
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

    const setAlert = (error: string) => {
        setAlertList((prev) => [...prev, error]);

        setTimeout(() => {
            setAlertList((prev) => prev.slice(1));
        }, 4000);
    };

    return (
        <>
            <Linear isLoading={isLoading}></Linear>
            <Header step={step} score={score} maxScore={maxScore} isLoading={isLoading} maxStep={maxStep}></Header>
            <Viewer simulation={simulation} step={step} setAttentionData={setAttentionData} filter={filter} perceptionId={perceptionId} perceptionFilter={perceptionFilter} attentionData={attentionData} setPerceptionId={setPerceptionId} setFilter={setFilter} setPerceptionFilter={setPerceptionFilter} IdSearch={IdSearch} setIdSearch={setIdSearch}></Viewer>
            <Alert alertList={alertList}></Alert>
            <Bottomer sliderValue={sliderValue} changeSlider={changeSlider} changeCommittedSlider={changeCommittedSlider} buttonDisable={buttonDisable} setStep={setStep} stepDown={stepDown} stepUp={stepUp} perceptionId={perceptionId} deletePerceptionId={deletePerceptionId} maxStep={maxStep}></Bottomer>
        </>
    );
}
