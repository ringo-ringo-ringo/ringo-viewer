import { Property } from "@/app/lib/Property";

export class Entity {
    urn: number;
    entityId: number;
    properties: { [key: string]: any } = {};

    constructor(entity: any) {
        this.urn = entity.urn;
        this.entityId = entity.entityId;

        entity.propertiesList.forEach((prop: any) => {
            let p = new Property(prop);
            this.properties[p.urn] = p;
        });
    }
}
