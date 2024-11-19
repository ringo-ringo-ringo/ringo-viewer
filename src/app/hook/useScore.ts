import { useState, useEffect } from "react";
import { Simulation } from "@/app/lib/Simulation";
import { URN_MAP } from "@/app/lib/URN";

export default function useScore(step: number, simulation: Simulation) {
    const [score, setScore] = useState<number>(0);
    const [maxScore, setMaxScore] = useState<number>(0);

    useEffect(() => {
        if (simulation.getWorldModel(step)) {
            let totalHP = 0;
            let aliveCivilian = 0;

            const worldModel = simulation.getWorldModel(step);
            const entitys = worldModel.getEntity();

            entitys.map((entity) => {
                if (URN_MAP[entity.urn] === "CIVILIAN") {
                    const properties = entity.getPropertys();
                    if (properties.HP.idDefined) {
                        if (properties.HP.value > 0) {
                            totalHP += properties.HP.value;
                            aliveCivilian++;
                        }
                    }
                }
            });

            const score: number = aliveCivilian * Math.exp(-5 * (1 - totalHP / (aliveCivilian * 10000)));
            setScore(score);
            if (step === 0) setMaxScore(score);
        }
    }, [step, simulation]);

    return [score, maxScore];
}
