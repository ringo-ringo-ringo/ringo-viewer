"use client";

import React, { ReactElement, useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import { CreateLayer } from "@/app/lib/CreateLayer";
import { stringify } from "querystring";

export default function Viewer({ simulation, step, setAttentionData, filter }: any) {
    const [layer, setLayer] = useState<any>([]);

    useEffect(() => {
        if (simulation && simulation.getWorldModel(step)) {
            const createLayer = new CreateLayer();
            createLayer.createLayer(step, simulation);

            // const layer = [createLayer.getBuildingsLayer(), createLayer.getRoadsLayer(), createLayer.getPoliceOfficesLayer(), createLayer.getRefugesLayer(), createLayer.getHydrantsLayer(), createLayer.getGasStationsLayer(), createLayer.getFireStationsLayer(), createLayer.getAmbulanceCentresLayer(), createLayer.getBlockadesLayer(), createLayer.getCiviliansLayer(), createLayer.getFireBrigadesLayer(), createLayer.getAmbulanceTeamsLayer(), createLayer.getPoliceForcesLayer(), createLayer.getPositionHistoryLayer()];

            const layer = [];
            
            if (filter.BUILDING) layer.push(createLayer.getBuildingsLayer());
            if (filter.ROAD) layer.push(createLayer.getRoadsLayer());
            if (filter.POLICE_OFFICE) layer.push(createLayer.getPoliceOfficesLayer());
            if (filter.REFUGE) layer.push(createLayer.getRefugesLayer());
            if (filter.HYDRANT) layer.push(createLayer.getHydrantsLayer());
            if (filter.GAS_STATION) layer.push(createLayer.getGasStationsLayer());
            if (filter.FIRE_STATION) layer.push(createLayer.getFireStationsLayer());
            if (filter.AMBULANCE_CENTRE) layer.push(createLayer.getAmbulanceCentresLayer());
            if (filter.BLOCKADE) layer.push(createLayer.getBlockadesLayer());
            if (filter.CIVILIAN) layer.push(createLayer.getCiviliansLayer());
            if (filter.FIRE_BRIGADE) layer.push(createLayer.getFireBrigadesLayer());
            if (filter.AMBULANCE_TEAM) layer.push(createLayer.getAmbulanceTeamsLayer());
            if (filter.POLICE_FORCE) layer.push(createLayer.getPoliceForcesLayer());
            if (filter.POSITION_HISTORY) layer.push(createLayer.getPositionHistoryLayer());

            setLayer(layer);
        }
    }, [simulation, step, filter]);

    const deckglClickHandler = (e: any) => {
        setAttentionData(e.object);
    };

    return (
        <>
            <DeckGL
                initialViewState={{
                    longitude: 2,
                    latitude: 2,
                    zoom: 6,
                }}
                controller
                layers={layer}
                onClick={deckglClickHandler}
                getTooltip={({ object }) => {
                    //ここ適当!!直して!

                    if (!object) return null;

                    let text = "";

                    text += "entity : " + object.entity + "\n";

                    text += "entityId : " + object.entityId + "\n";

                    for (const key in object) {
                        if (key && object.hasOwnProperty(key)) {
                            const value = object[key];
                            if (value.value) {
                                text += JSON.stringify(key) + " : " + JSON.stringify(value.value) + "\n";
                            }
                        }
                    }

                    return { text };
                }}
            />
        </>
    );
}
