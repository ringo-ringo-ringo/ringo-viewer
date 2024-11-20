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

        deletesList.map((deleteId: number) => {
            const newEntitys = this.entity.filter((entity: Entity) => entity.entityId !== deleteId);
            this.entity = newEntitys;
        });
    }

    changePerception(log: any, id: number) {
        this.entity.map((entity) => {
            if (entity.getEntityId() === id) {
                entity.changePerception(log.perception.visible.changesList, log.perception.visible.deletesList);
            }
        });
    }

    initPerception(id: number, perception?: Entity[]) {
        this.entity.map((entity) => {
            if (entity.getEntityId() === id) {
                entity.initPerception(perception);
            }
        });
    }

    getPerception(id: number): any {
        for (const entity of this.entity) {
            if (entity.getEntityId() === id) {
                return entity.getPerception();
            }
        }
    }

    getCommunications(id: number): any {
        for (const entity of this.entity) {
            if (entity.getEntityId() === id) {
                return entity.getCommunication();
            }
        }
    }

    setCommunication(entityID: number, log: any) {
        this.entity.map((entity) => {
            if (entity.getEntityId() === entityID) {
                entity.setCommunication(log);
            }
        });
    }

    getEntity() {
        return this.entity;
    }

    getOneEntityById(id: number) {
        this.entity.map((entity) => {
            if (entity.getEntityId() === id) {
                return entity;
            }
        });

        return null;
    }
}
