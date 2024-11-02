import { Entity } from "@/app/lib/Entity";

export class WorldModel {
    step: number;
    entity: Entity[] = [];

    constructor(step: number) {
        this.step = step;
    }
}
