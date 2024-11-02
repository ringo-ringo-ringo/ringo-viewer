import {Entity} from '@/app/lib/Entity'

export class WorldModel {
    
    time: number;
    entity: Entity[] = [];

    constructor(time: number) {
        this.time = time;
    }
}
