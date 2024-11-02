import { WorldModel } from "@/app/lib/WorldModel";

export class Simulation {
    worldModel: WorldModel[] = [];
    LogPath: string = "";

    constructor() {}

    fetchData(step: number) {
        if (!this.worldModel[step] && step === 0) {
            this.worldModel[step] = new WorldModel(step);
        }
    }

    setLogPath(path : string) {
        this.LogPath = path;
        console.log(this.LogPath);
    }
}
