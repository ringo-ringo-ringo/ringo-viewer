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

    setEntity(entitysLog: any) {
        for (const entity of entitysLog) {
            this.entity.push(new Entity(entity));
        }
    }

    changeEntity(changesList: any, deletesList: any) {
        console.log("変更リスト");
        console.log(changesList);
        console.log("削除リスト");
        console.log(deletesList);

        changesList.map((changeEntity: any) => {
            let changed: boolean = false;
            for (const oldEntity of this.entity) {
                if (changeEntity.entityid === oldEntity.entityId) {
                    console.log("一緒だぞ");
                    console.log("元々あったやつ");
                    console.log(oldEntity);
                    console.log("差分のやつ");
                    console.log(changeEntity);

                    oldEntity.changePropertie(changeEntity);

                    changed = true;
                }
            }

            if (!changed) {
                console.log("新規です");
            }
            console.log("********************************");
        });
    }

    getEntity() {
        return this.entity;
    }
}
