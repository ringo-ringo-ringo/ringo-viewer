import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import { Simulation } from "@/app/lib/Simulation";
import { LoadLog } from "@/app/lib/LoadLog";

export default function useLog(): [number, Dispatch<SetStateAction<number>>, boolean, Dispatch<SetStateAction<boolean>>, Simulation, Dispatch<SetStateAction<Simulation>>, any, Dispatch<SetStateAction<any>>, number] {
    const [step, setStep] = useState<number>(0);
    const [isPause, setIsPause] = useState<boolean>(false);
    const [simulation, setSimulation] = useState<Simulation>(new Simulation());
    const [isLoading, setIsLoading] = useState<number>(0);
    const [perceptionId, setPerceptionId] = useState(null);

    useEffect(() => {
        if (!simulation.getWorldModel(step)) {
            if (step === 0) {
                setIsLoading((e) => e + 1);

                const start = LoadLog.load(process.env.NEXT_PUBLIC_DEFAULT_LOG_PATH, "START_OF_LOG");
                const end = LoadLog.load(process.env.NEXT_PUBLIC_DEFAULT_LOG_PATH, "END_OF_LOG");

                Promise.all([start, end])
                    .then(([startJson, endJson]) => {
                        if (startJson.hasOwnProperty("start")) {
                            console.log("start プロパティが存在します");
                        } else {
                            console.error("start プロパティは存在しません");
                            throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
                        }

                        if (endJson.hasOwnProperty("end")) {
                            console.log("end プロパティが存在します");
                        } else {
                            console.error("end プロパティは存在しません");
                            throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
                        }

                        simulation.setLogPath(String(process.env.NEXT_PUBLIC_DEFAULT_LOG_PATH));

                        LoadLog.load(simulation.getLogPath(), "INITIAL_CONDITIONS")
                            .then((res) => {
                                simulation.setWorldModel(step, res);
                                setSimulation(new Simulation(simulation));
                                setIsLoading((e) => e - 1);
                            })
                            .catch((error) => {
                                console.error("ログの読み込みエラー:", error);

                                throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
                            });
                    })
                    .catch((error) => {
                        console.error("ログの読み込みエラー:", error);

                        throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
                    });
            } else {
                const fetchUpdate = async (callStep: number) => {
                    setIsLoading((e) => e + 1);

                    if (!simulation.getWorldModel(callStep - 1)) {
                        await fetchUpdate(callStep - 1);
                    }

                    await LoadLog.load(simulation.getLogPath(), `${callStep}/UPDATES`)
                        .then((res) => {
                            simulation.setWorldModel(callStep, res);
                            setSimulation(new Simulation(simulation));
                            setIsLoading((e) => e - 1);
                        })
                        .catch((error) => {
                            console.error("ログの読み込みエラー:", error);

                            throw new Error("ログを読み込めませんでした");
                        });
                };

                fetchUpdate(step);
            }
        } else {
            if (perceptionId) {
                console.log("読み込むperceptionId");
                console.log(perceptionId);

                const fetchPerception = async (callStep: number) => {
                    if (callStep === 0) {
                        await simulation.initPerseption(callStep, perceptionId);
                    } else {
                        setIsLoading((e) => e + 1);

                        //過去のログが読み込めていない時の処理
                        if (simulation.getPerception(callStep - 1, perceptionId) === null) {
                            await fetchPerception(callStep - 1);
                        }

                        await LoadLog.load(simulation.getLogPath(), `${callStep}/PERCEPTION/${perceptionId}`)
                            .then((res) => {
                                console.log(res);
                                //ここに処理を書く
                                simulation.changePerception(callStep, res, perceptionId);
                                setSimulation(new Simulation(simulation));
                                setIsLoading((e) => e - 1);
                            })
                            .catch((error) => {
                                console.error("ログの読み込みエラー : ", error);

                                throw new Error("ログを読み込めませんでした");
                            });
                    }
                };

                fetchPerception(step);
            }
        }
    }, [step, perceptionId]);

    return [step, setStep, isPause, setIsPause, simulation, setSimulation, perceptionId, setPerceptionId, isLoading];
}
