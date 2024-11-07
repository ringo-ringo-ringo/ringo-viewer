"use client";

import React, { ReactElement, useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import { CreateLayer } from "@/app/lib/CreateLayer";
import { stringify } from "querystring";

export default function Viewer({ simulation, step }: any) {
    const [layer, setLayer] = useState<any>([]);

    useEffect(() => {
        if (simulation && simulation.getWorldModel(step)) {
            const createLayer = new CreateLayer();
            createLayer.createLayer(step, simulation);

            const layer = [createLayer.getBuildingsLayer(), createLayer.getRoadsLayer(), createLayer.getPoliceOfficesLayer(), createLayer.getRefugesLayer(), createLayer.getHydrantsLayer(), createLayer.getGasStationsLayer(), createLayer.getFireStationsLayer(), createLayer.getAmbulanceCentresLayer(), createLayer.getBlockadesLayer(), createLayer.getCiviliansLayer(), createLayer.getFireBrigadesLayer(), createLayer.getAmbulanceTeamsLayer(), createLayer.getPoliceForcesLayer()];

            setLayer(layer);
        }
    }, [simulation, step]);

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
                getTooltip={({ object }) => {
                    if (!object) return null;

                    let text = "";

                    for (const key in object) {
                        if (object.hasOwnProperty(key)) {
                            const value = object[key];
                            text += JSON.stringify(key) + " : " + JSON.stringify(value.value) + "\n";
                        }
                    }

                    return { text };
                }}
            />
        </>
    );
}
