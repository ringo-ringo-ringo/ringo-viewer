import { Simulation } from "@/app/lib/Simulation";
import { WorldModel } from "@/app/lib/WorldModel";
import { URN_MAP, URN_MAP_R } from "@/app/lib/URN";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";

interface BuildLayer {
    apex: number[][];
    backgroundColor: number[];
}

interface HumanLayer {
    position: number[];
    backgroundColor: number[];
}

export class CreateLayer {
    BuildingsLayer: BuildLayer[] = [];
    RoadsLayer: BuildLayer[] = [];
    RefugesLayer: BuildLayer[] = [];
    HydrantsLayer: BuildLayer[] = [];
    GasStationsLayer: BuildLayer[] = [];
    FireStationsLayer: BuildLayer[] = [];
    AmbulanceCentresLayer: BuildLayer[] = [];
    PoliceOfficesLayer: BuildLayer[] = [];
    CiviliansLayer: HumanLayer[] = [];
    FireBrigadesLayer: HumanLayer[] = [];
    AmbulanceTeamsLayer: HumanLayer[] = [];
    PoliceForcesLayer: HumanLayer[] = [];
    BlockadesLayer: BuildLayer[] = [];

    constructor() {}

    createLayer(step: number, simulation: Simulation) {
        const worldModel: WorldModel = simulation.getWorldModel(step);
        const entitys = worldModel.getEntity();

        entitys.map((entity) => {
            if (URN_MAP[entity.urn] === "BUILDING") {
                let first: boolean = true;
                const edges: Array<number[]> = [];
                const properties = entity.getPropertys();

                properties.EDGES.value.edgesList.map((edge: any) => {
                    if (first) {
                        edges.push([edge.startx / 20000, edge.starty / 20000]);
                        first = false;
                    }
                    edges.push([edge.endx / 20000, edge.endy / 20000]);
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [150, 150, 150],
                    ...properties,
                };

                this.BuildingsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "ROAD") {
                let first: boolean = true;
                const edges: Array<number[]> = [];
                const properties = entity.getPropertys();

                properties.EDGES.value.edgesList.map((edge: any) => {
                    if (first) {
                        edges.push([edge.startx / 20000, edge.starty / 20000]);
                        first = false;
                    }
                    edges.push([edge.endx / 20000, edge.endy / 20000]);
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [200, 200, 200],
                    ...properties,
                };

                this.RoadsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "REFUGE") {
                let first: boolean = true;
                const edges: Array<number[]> = [];
                const properties = entity.getPropertys();

                properties.EDGES.value.edgesList.map((edge: any) => {
                    if (first) {
                        edges.push([edge.startx / 20000, edge.starty / 20000]);
                        first = false;
                    }
                    edges.push([edge.endx / 20000, edge.endy / 20000]);
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [250, 0, 0],
                    ...properties,
                };

                this.RefugesLayer.push(data);
            } else if (URN_MAP[entity.urn] === "HYDRANT") {
                let first: boolean = true;
                const edges: Array<number[]> = [];
                const properties = entity.getPropertys();

                properties.EDGES.value.edgesList.map((edge: any) => {
                    if (first) {
                        edges.push([edge.startx / 20000, edge.starty / 20000]);
                        first = false;
                    }
                    edges.push([edge.endx / 20000, edge.endy / 20000]);
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [0, 250, 0],
                    ...properties,
                };

                this.HydrantsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "GAS_STATION") {
                let first: boolean = true;
                const edges: Array<number[]> = [];
                const properties = entity.getPropertys();

                properties.EDGES.value.edgesList.map((edge: any) => {
                    if (first) {
                        edges.push([edge.startx / 20000, edge.starty / 20000]);
                        first = false;
                    }
                    edges.push([edge.endx / 20000, edge.endy / 20000]);
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [0, 0, 250],
                    ...properties,
                };

                this.GasStationsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "FIRE_STATION") {
                let first: boolean = true;
                const edges: Array<number[]> = [];
                const properties = entity.getPropertys();

                properties.EDGES.value.edgesList.map((edge: any) => {
                    if (first) {
                        edges.push([edge.startx / 20000, edge.starty / 20000]);
                        first = false;
                    }
                    edges.push([edge.endx / 20000, edge.endy / 20000]);
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [250, 250, 0],
                    ...properties,
                };

                this.FireStationsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "AMBULANCE_CENTRE") {
                let first: boolean = true;
                const edges: Array<number[]> = [];
                const properties = entity.getPropertys();

                properties.EDGES.value.edgesList.map((edge: any) => {
                    if (first) {
                        edges.push([edge.startx / 20000, edge.starty / 20000]);
                        first = false;
                    }
                    edges.push([edge.endx / 20000, edge.endy / 20000]);
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [250, 0, 250],
                    ...properties,
                };

                this.AmbulanceCentresLayer.push(data);
            } else if (URN_MAP[entity.urn] === "POLICE_OFFICE") {
                let first: boolean = true;
                const edges: Array<number[]> = [];
                const properties = entity.getPropertys();

                properties.EDGES.value.edgesList.map((edge: any) => {
                    if (first) {
                        edges.push([edge.startx / 20000, edge.starty / 20000]);
                        first = false;
                    }
                    edges.push([edge.endx / 20000, edge.endy / 20000]);
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [0, 250, 250],
                    ...properties,
                };

                this.PoliceOfficesLayer.push(data);
            } else if (URN_MAP[entity.urn] === "CIVILIAN") {
                const properties = entity.getPropertys();

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 255;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    position: [x / 20000, y / 20000],
                    backgroundColor: [0, color, 0],
                    ...properties,
                };

                this.CiviliansLayer.push(data);
            } else if (URN_MAP[entity.urn] === "FIRE_BRIGADE") {
                const properties = entity.getPropertys();

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 255;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    position: [x / 20000, y / 20000],
                    backgroundColor: [color, 0, 0],
                    ...properties,
                };

                this.FireBrigadesLayer.push(data);
            } else if (URN_MAP[entity.urn] === "AMBULANCE_TEAM") {
                const properties = entity.getPropertys();

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 255;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    position: [x / 20000, y / 20000],
                    backgroundColor: [color, color, color],
                    ...properties,
                };

                this.AmbulanceTeamsLayer.push(data);
            } else if (URN_MAP[entity.urn] === "POLICE_FORCE") {
                const properties = entity.getPropertys();

                const x: number = properties.X.value;
                const y: number = properties.Y.value;

                let color = 255;
                if (properties.HP.value) {
                    color = 255 * (properties.HP.value / 10000);
                }

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    position: [x / 20000, y / 20000],
                    backgroundColor: [0, 0, color],
                    ...properties,
                };

                this.PoliceForcesLayer.push(data);
            } else if (URN_MAP[entity.urn] === "BLOCKADE") {
                const properties = entity.getPropertys();

                const apexes = properties.APEXES.value;

                let count: number = 0;
                const edges: Array<number[]> = [];
                let x: number | null = null;
                let y: number | null = null;
                apexes.map((apex: number) => {
                    if (count % 2 === 0) {
                        x = apex;
                    } else {
                        y = apex;
                        if (x && y) {
                            edges.push([x / 20000, y / 20000]);
                        } else {
                            console.error("中に入ってる値がnullだぞ");
                        }
                    }
                    count++;
                });

                const data = {
                    entity: URN_MAP[entity.urn],
                    entityId: entity.entityId,
                    apex: edges,
                    backgroundColor: [25, 25, 25],
                    ...properties,
                };

                this.BlockadesLayer.push(data);
            } else {
                console.log("未使用のエンティティ発見 : " + URN_MAP[entity.urn]);
                console.log(entity);
            }
        });
    }

    createPolygoneLayer(id: string, data: Array<any>) {
        return new PolygonLayer({
            data: data,
            id: id,
            filled: true,
            // extruded: true,
            stroked: true,
            elevationScale: 20,
            getPolygon: (d) => d.apex,
            getFillColor: (d) => d.backgroundColor,
            getLineColor: (d) => [150, 150, 150],
            lineWidthMinPixels: 1,
            pickable: true,
        });
    }

    createIconLayer(id: string, data: Array<any>) {
        return new IconLayer({
            data: data,
            id: id,
            iconAtlas: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
            iconMapping: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
            getIcon: (d) => "marker",
            getPosition: (d) => d.position,
            getColor: (d) => d.backgroundColor,
            getSize: 30,
            pickable: true,
        });
    }

    getBuildingsLayer() {
        const layer = this.createPolygoneLayer("buildings", this.BuildingsLayer);
        return layer;
    }

    getRoadsLayer() {
        const layer = this.createPolygoneLayer("roads", this.RoadsLayer);
        return layer;
    }

    getRefugesLayer() {
        const layer = this.createPolygoneLayer("refuges", this.RefugesLayer);
        return layer;
    }

    getHydrantsLayer() {
        const layer = this.createPolygoneLayer("Hydrants", this.HydrantsLayer);
        return layer;
    }

    getGasStationsLayer() {
        const layer = this.createPolygoneLayer("gas-station", this.GasStationsLayer);
        return layer;
    }

    getFireStationsLayer() {
        const layer = this.createPolygoneLayer("fire-station", this.FireStationsLayer);
        return layer;
    }

    getAmbulanceCentresLayer() {
        const layer = this.createPolygoneLayer("ambulance-centre", this.AmbulanceCentresLayer);
        return layer;
    }

    getPoliceOfficesLayer() {
        const layer = this.createPolygoneLayer("police-office", this.PoliceOfficesLayer);
        return layer;
    }

    getBlockadesLayer() {
        const layer = this.createPolygoneLayer("blockade", this.BlockadesLayer);
        return layer;
    }

    getCiviliansLayer() {
        const layer = this.createIconLayer("civilian", this.CiviliansLayer);
        return layer;
    }

    getFireBrigadesLayer() {
        const layer = this.createIconLayer("fire-brigade", this.FireBrigadesLayer);
        return layer;
    }

    getAmbulanceTeamsLayer() {
        const layer = this.createIconLayer("ambulance-team", this.AmbulanceTeamsLayer);
        return layer;
    }

    getPoliceForcesLayer() {
        const layer = this.createIconLayer("police-force", this.PoliceForcesLayer);
        return layer;
    }
}
