import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import { Simulation } from "@/app/lib/Simulation";
import { LoadLog } from "@/app/lib/LoadLog";

export default function useLog(): [number, Dispatch<SetStateAction<number>>, boolean, Dispatch<SetStateAction<boolean>>, Simulation, Dispatch<SetStateAction<Simulation>>, number] {
    const [step, setStep] = useState<number>(0);
    const [isPause, setIsPause] = useState<boolean>(false);
    const [simulation, setSimulation] = useState<Simulation>(new Simulation());
    const [isLoading, setIsLoading] = useState<number>(0);

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
        }
    }, [step]);

    return [step, setStep, isPause, setIsPause, simulation, setSimulation, isLoading];
}
