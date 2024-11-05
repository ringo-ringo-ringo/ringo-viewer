import { Entity } from "@/app/lib/Entity";

export class WorldModel {
    step: number;
    entity: Entity[] = [];

    constructor(step: number) {
        this.step = step;
    }

    setEntity(entitysLog: any) {
        for (const entity of entitysLog) {
            this.entity.push(new Entity(entity));
        }
    }

    getEntity() {
        return this.entity;
    }
}
