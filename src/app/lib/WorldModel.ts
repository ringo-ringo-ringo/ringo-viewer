import { Entity } from "@/app/lib/Entity";

export class WorldModel {
    step: number;
    entity: Entity[] = [];

    constructor(step: number) {
        this.step = step;
    }

    setEntity(entitysLog: any) {
        let num = 0;
        for (const entity of entitysLog) {
            this.entity[num] = new Entity(entity);
            num++;
        }
    }
}
