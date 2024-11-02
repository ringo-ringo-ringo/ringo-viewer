import { useState, useEffect } from "react";
import { Simulation } from "@/app/lib/Simulation";
import { LoadLog } from "@/app/lib/LoadLog";

export default function useLog() {
    const [step, setStep] = useState<number>(0);
    const [isPause, setIsPause] = useState<boolean>(false);
    const [simulation, setSimulation] = useState(new Simulation());
    const loadLog = new LoadLog();

    useEffect(() => {
        if (step === 0) {
            const start = loadLog.load(process.env.NEXT_PUBLIC_DEFAULT_LOG_PATH, "START_OF_LOG");
            const end = loadLog.load(process.env.NEXT_PUBLIC_DEFAULT_LOG_PATH, "END_OF_LOG");

            start
                .then((startJson) => {
                    // then メソッドで Promise を処理
                    console.log("in : ", startJson); // startJson は JSON オブジェクト

                    // startJson を JSON として操作する処理をここに記述

                    if (startJson.hasOwnProperty("start")) {
                        // start プロパティが存在する場合の処理
                        console.log("start プロパティが存在します");
                    } else {
                        // start プロパティが存在しない場合の処理
                        console.log("start プロパティは存在しません");
                        throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
                    }
                })
                .catch((error) => {
                    console.error("start ログの読み込みエラー:", error);
                    throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
                });

            end.then((endJson) => {
                // then メソッドで Promise を処理
                console.log("in : ", endJson); // startJson は JSON オブジェクト

                // startJson を JSON として操作する処理をここに記述

                if (endJson.hasOwnProperty("end")) {
                    // start プロパティが存在する場合の処理
                    console.log("end プロパティが存在します");
                } else {
                    // start プロパティが存在しない場合の処理
                    console.log("end プロパティは存在しません");
                    throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
                }
            }).catch((error) => {
                console.error("end ログの読み込みエラー:", error);
                throw new Error("ログのパスが間違っているか，ログファイルではないか，ログファイルが破損しています");
            });
        }

    }, [step]);

    return [step, setStep, isPause, setIsPause, simulation, setSimulation];
}
