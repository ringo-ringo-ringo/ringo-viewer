"use client";

import useLog from "@/app/hook/useLog";
import Viewer from "@/app/Viewer";
import { useEffect, useState } from "react";
import { Button, Slider, LinearProgress } from "@mui/material";
import Attention from "@/app/components/Attention";
import Sidebar from "@/app/components/Sidebar";
import useScore from "@/app/hook/useScore";

export default function Home() {
    const [step, setStep, isPause, setIsPause, simulation, setSimulation, perceptionId, setPerceptionId, isLoading] = useLog();
    const [score, maxScore] = useScore(step, simulation);

    const [attentionData, setAttentionData] = useState(null);

    const [sliderValue, setSliderValue] = useState<number>(0);

    useEffect(() => {
        changeCommittedSlider("a", step);
    }, [step]);

    const [buttonDisable, setButtonDisable] = useState<boolean>(false);

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
        perceptionPOSITION_HISTORY: true,
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
            <Viewer simulation={simulation} step={step} setAttentionData={setAttentionData} filter={filter} perceptionId={perceptionId} perceptionFilter={perceptionFilter}></Viewer>
            {isLoading ? <LinearProgress /> : null}
            <p>残りの読み込むべきステップ : {isLoading}</p>
            <p>step : {step}</p>
            <p>
                Score : {score} / {maxScore}
            </p>
            <Button
                onClick={() => {
                    setStep(0);
                }}
                variant="outlined"
                disabled={buttonDisable}
            >
                go to initial step
            </Button>
            <Button
                onClick={() => {
                    stepDown(10);
                }}
                variant="outlined"
                disabled={buttonDisable}
            >
                go to prev 10 step
            </Button>
            <Button
                onClick={() => {
                    stepDown(1);
                }}
                variant="outlined"
                disabled={buttonDisable}
            >
                go to prev step
            </Button>
            <Button
                onClick={() => {
                    stepUp(1);
                }}
                variant="outlined"
                disabled={buttonDisable}
            >
                go to next step
            </Button>
            <Button
                onClick={() => {
                    stepUp(10);
                }}
                variant="outlined"
                disabled={buttonDisable}
            >
                go to next 10 step
            </Button>
            <Button
                onClick={() => {
                    setStep(300);
                }}
                variant="outlined"
                disabled={buttonDisable}
            >
                go to last step
            </Button>
            {perceptionId !== null ? (
                <Button
                    onClick={() => {
                        deletePerceptionId();
                    }}
                    variant="outlined"
                    disabled={buttonDisable}
                >
                    delete perception view
                </Button>
            ) : (
                ""
            )}
            <Slider size="small" value={sliderValue} aria-label="Small" valueLabelDisplay="auto" min={0} max={300} onChange={changeSlider} onChangeCommitted={changeCommittedSlider} disabled={buttonDisable} />
            <div style={{ position: "relative", zIndex: 2, width: "250px", backgroundColor: "lightgray", border: "1px black solid" }}>
                <Sidebar filter={filter} setFilter={setFilter} perceptionId={perceptionId} perceptionFilter={perceptionFilter} setPerceptionFilter={setPerceptionFilter}></Sidebar>
            </div>
            <div style={{ position: "relative", zIndex: 2, backgroundColor: "lightgray" }}>{attentionData ? <Attention attentionData={attentionData} setAttentionData={setAttentionData} setPerceptionId={setPerceptionId} setFilter={setFilter}></Attention> : ""}</div>
        </>
    );
}
