import { Property } from "@/app/lib/Property";
import { URN_MAP, URN_MAP_R } from "@/app/lib/URN";

export class Entity {
    urn: number;
    entityId: number;
    properties: { [key: string]: any } = {};
    perception: Entity[] | null = null;

    constructor(entity: any) {
        this.urn = entity.urn;
        this.entityId = entity.entityid;

        entity.propertiesList.forEach((prop: any) => {
            const p = new Property(prop);
            // this.properties[p.urn] = p;
            this.properties[URN_MAP[p.urn]] = p;
        });
    }

    changePropertie(log: any) {
        if (this.urn === log.urn && this.entityId === log.entityid) {
            log.propertiesList.map((property: any) => {
                const p = new Property(property);
                this.properties[URN_MAP[property.urn]] = p;
            });
        } else {
            console.error("わたされたログは違うぞ");
        }
    }

    clone() {
        const cloneProperties: { [key: string]: any } = {};

        for (const key in this.properties) {
            cloneProperties[key] = new Property(this.properties[key]);
        }

        return new Entity({
            urn: this.urn,
            entityid: this.entityId,
            propertiesList: Object.values(cloneProperties),
        });
    }

    changePerception(changeLog: any, deleteLog: any) {
        console.log(changeLog, deleteLog);
        if (this.perception) {
            for (const entity of changeLog) {
                let changed: boolean = false;

                for (const perception of this.perception) {
                    if (entity.entityid === perception.entityId) {
                        perception.changePropertie(entity);

                        changed = true;
                    }
                }

                if (!changed) {
                    this.perception.push(new Entity(entity));
                }
            }

            //ここに削除の処理
            if (deleteLog.length > 0) {
                console.error("デリートきたぞ");
            }

            console.log("これ");
            console.log(this.perception);
            console.log("人間はこれ");
            this.perception.map((entity) => {
                if (URN_MAP[entity.urn] === "CIVILIAN" || URN_MAP[entity.urn] === "FIRE_BRIGADE" || URN_MAP[entity.urn] === "AMBULANCE_TEAM" || URN_MAP[entity.urn] === "POLICE_FORCE") {
                    console.log(entity);
                }
            });
        }
    }

    initPerception(perception?: Entity[]) {
        if (perception) {
            this.perception = perception;
        } else {
            this.perception = [];
        }
    }

    getPerception() {
        return this.perception;
    }

    getPropertys() {
        return this.properties;
    }

    getEntityId() {
        return this.entityId;
    }
}
