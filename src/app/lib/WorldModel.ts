import { Entity } from "@/app/lib/Entity";

export class WorldModel {
    step: number;
    entity: Entity[] = [];

    constructor(step: number, entity?: Entity[]) {
        this.step = step;

        if (entity) {
            this.entity = entity;
        }
    }

    setEntitys(entitysLog: any) {
        for (const entity of entitysLog) {
            this.entity.push(new Entity(entity));
        }
    }

    setEntity(entity: Entity) {
        this.entity.push(new Entity(entity));
    }

    changeEntity(changesList: any, deletesList: any) {
        changesList.map((changeEntity: any) => {
            let changed: boolean = false;
            for (const oldEntity of this.entity) {
                if (changeEntity.entityid === oldEntity.entityId) {
                    oldEntity.changePropertie(changeEntity);

                    changed = true;
                }
            }

            if (!changed) {
                this.setEntity(changeEntity);
            }
        });
    }

    getEntity() {
        return this.entity;
    }
}
