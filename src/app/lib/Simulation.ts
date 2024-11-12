import { WorldModel } from "@/app/lib/WorldModel";
import { Entity } from "./Entity";
import { URN_MAP } from "./URN";

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
            this.worldModel[step].setEntitys(log.initialcondition.entitiesList);
        } else if (!this.worldModel[step] && this.worldModel[step - 1] && step > 0 && this.LogPath) {
            const cloneEntities = this.worldModel[step - 1].getEntity().map((e) => e.clone());
            this.worldModel[step] = new WorldModel(step, cloneEntities);
            this.worldModel[step].changeEntity(log.update.changes.changesList, log.update.changes.deletesList);
        }
    }

    changePerception(step: number, log: any, id: number) {
        if (step !== 0 && this.worldModel[step] && this.LogPath) {
            const lastPerception = this.worldModel[step - 1].getPerception(id);
            const clonePerception: Entity[] = [];
            for (const entity of lastPerception) {
                clonePerception.push(entity);
            }
            this.worldModel[step].initPerception(id, clonePerception);
            this.worldModel[step].changePerception(log, id);
        }
    }

    initPerseption(step: number, id: number) {
        if (step === 0) {
            this.worldModel[step].initPerception(id, this.getInitPerceptionMapEntity());
        } else {
            console.error("0ステップじゃないぞ");
        }
    }

    getInitPerceptionMapEntity() {
        const entitys = this.worldModel[0].getEntity();
        const initPerceptionMapEntity: Entity[] = [];

        entitys.map((entity) => {
            if (URN_MAP[entity.urn] === "ROAD" || URN_MAP[entity.urn] === "BUILDING" || URN_MAP[entity.urn] === "REFUGE" || URN_MAP[entity.urn] === "HYDRANT" || URN_MAP[entity.urn] === "GAS_STATION" || URN_MAP[entity.urn] === "FIRE_STATION" || URN_MAP[entity.urn] === "AMBULANCE_CENTRE" || URN_MAP[entity.urn] === "POLICE_OFFICE") {
                initPerceptionMapEntity.push(entity);
            }
        });

        return initPerceptionMapEntity;
    }

    getPerception(step: number, id: number) {
        return this.worldModel[step].getPerception(id);
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
