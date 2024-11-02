import { WorldModel } from "@/app/lib/WorldModel";

export class Simulation {
    worldModel: WorldModel[] = [];

    constructor() {}
    
    loadWorld(step: number) {
        if (!this.worldModel[step]) {
            this.worldModel[step] = new WorldModel(step);
        }
    }
}
