import { WorldModel } from "@/app/lib/WorldModel";

export class Simulation {
    worldModel: WorldModel[] = [];
    LogPath: string | null;

    constructor(simulation?: Simulation) {
        if (simulation) {
            this.worldModel = simulation.getWorldModels();
            this.LogPath = simulation.getLogPath();
        } else {
            this.LogPath = null;
        }
    }

    setWorldModel(step: number, log: any) {
        if (!this.worldModel[step] && step === 0 && this.LogPath) {
            this.worldModel[step] = new WorldModel(step);
            this.worldModel[step].setEntity(log.initialcondition.entitiesList);
        } else if (!this.worldModel[step] && step > 0 && this.LogPath) {
            this.worldModel[step] = new WorldModel(step, this.worldModel[step - 1].getEntity());
            console.log(`インんスタンスしたばっかのステップ${step}のワールドモデル`);
            console.log(this.worldModel[step]);

            this.worldModel[step].changeEntity(log.update.changes.changesList, log.update.changes.deletesList);
        }
    }

    setLogPath(path: string) {
        this.LogPath = path;
    }

    getLogPath() {
        return this.LogPath;
    }

    getWorldModel(step: number) {
        return this.worldModel[step];
    }

    getWorldModels() {
        return this.worldModel;
    }
}
