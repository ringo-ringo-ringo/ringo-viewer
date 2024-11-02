import { WorldModel } from "@/app/lib/WorldModel";

export class Simulation {
    worldModel: WorldModel[] = [];

    constructor() {}

    fetchData(step: number) {
        if (!this.worldModel[step] && step === 0) {
            this.worldModel[step] = new WorldModel(step);
        }
    }
}
