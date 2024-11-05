import { useState, useEffect } from "react";
import { Simulation } from "@/app/lib/Simulation";
import { LoadLog } from "@/app/lib/LoadLog";
import { Dispatch, SetStateAction } from "react";

export default function useLog(): [number, Dispatch<SetStateAction<number>>, boolean, Dispatch<SetStateAction<boolean>>, Simulation, Dispatch<SetStateAction<Simulation>>] {
    const [step, setStep] = useState<number>(0);
    const [isPause, setIsPause] = useState<boolean>(false);
    const [simulation, setSimulation] = useState<Simulation>(new Simulation());

    useEffect(() => {
        if (!simulation.getWorldModel(step)) {
            if (step === 0) {
                const start = LoadLog.load(process.env.NEXT_PUBLIC_DEFAULT_LOG_PATH, "START_OF_LOG");
                const end = LoadLog.load(process.env.NEXT_PUBLIC_DEFAULT_LOG_PATH, "END_OF_LOG");

                Promise.all([start, end]) // start と end の Promise を配列で渡す
                    .then(([startJson, endJson]) => {
                        // 両方の Promise が解決されたら実行
                        // then メソッドで Promise を処理
                        // console.log("in start: ", startJson); // startJson は JSON オブジェクト
                        // console.log("in end: ", endJson); // endJson は JSON オブジェクト

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

                        // start と end の Promise が両方とも正常に解決されたら実行
                        simulation.setLogPath(String(process.env.NEXT_PUBLIC_DEFAULT_LOG_PATH));

                        LoadLog.load(simulation.getLogPath(), "INITIAL_CONDITIONS")
                            .then((res) => {
                                simulation.setWorldModel(step, res);
                                setSimulation(new Simulation(simulation));
                            })
                            .catch((error) => {
                                console.error("ログの読み込みエラー:", error);
                                // エラー処理
                                throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
                            });
                    })
                    .catch((error) => {
                        console.error("ログの読み込みエラー:", error);
                        // エラー処理
                        throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
                    });
            } else {
                LoadLog.load(simulation.getLogPath(), `${step}/UPDATES`)
                    .then((res) => {
                        simulation.setWorldModel(step, res);
                        setSimulation(new Simulation(simulation));
                    })
                    .catch((error) => {
                        console.error("ログの読み込みエラー:", error);
                        // エラー処理
                        throw new Error("ログを読み込めませんでした");
                    });
            }
        }
    }, [step]);

    return [step, setStep, isPause, setIsPause, simulation, setSimulation];
}
