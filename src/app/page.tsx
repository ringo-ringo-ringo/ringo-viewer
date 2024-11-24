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
        COMMAND_PATH: false,
    });

    const [perceptionFilter, setPerceptionFilter] = useState({
        perceptionROAD: true,
        perceptionBLOCKADE: true,
        perceptionBUILDING: true,
        perceptionREFUGE: true,
        perceptionHYDRANT: true,
        perceptionGAS_STATION: true,
        perceptionFIRE_STATION: true,
        perceptionAMBULANCE_CENTRE: true,
        perceptionPOLICE_OFFICE: true,
        perceptionCIVILIAN: true,
        perceptionFIRE_BRIGADE: true,
        perceptionAMBULANCE_TEAM: true,
        perceptionPOLICE_FORCE: true,
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
                newFilter[key] = true;
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

    // console.log("現在のステップ");
    // console.log(step);
    // console.log("現在のシミュレーション");
    // console.log(simulation);
    // console.log("現在のスコアと最大スコア");
    // console.log(score, maxScore);

    return (
        <>
            <Linear isLoading={isLoading}></Linear>
            <Header step={step} score={score} maxScore={maxScore} isLoading={isLoading} maxStep={maxStep}></Header>
            <Viewer simulation={simulation} step={step} setAttentionData={setAttentionData} filter={filter} perceptionId={perceptionId} perceptionFilter={perceptionFilter} attentionData={attentionData} setPerceptionId={setPerceptionId} setFilter={setFilter} setPerceptionFilter={setPerceptionFilter} IdSearch={IdSearch} setIdSearch={setIdSearch}></Viewer>
            <Bottomer sliderValue={sliderValue} changeSlider={changeSlider} changeCommittedSlider={changeCommittedSlider} buttonDisable={buttonDisable} setStep={setStep} stepDown={stepDown} stepUp={stepUp} perceptionId={perceptionId} deletePerceptionId={deletePerceptionId} maxStep={maxStep}></Bottomer>
        </>
    );
}
