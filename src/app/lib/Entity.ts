import { Property } from "@/app/lib/Property";
import { URN_MAP, URN_MAP_R } from "@/app/lib/URN";

export class Entity {
    urn: number;
    entityId: number;
    properties: { [key: string]: any } = {};

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

    getPropertys() {
        return this.properties;
    }
}
