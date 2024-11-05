"use client";

import React, { ReactElement, useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import { CreateLayer } from "@/app/lib/CreateLayer";

export default function Viewer({ simulation, step }: any) {
    const [layer, setLayer] = useState<any>([]);

    useEffect(() => {
        if (simulation && simulation.getWorldModel(step)) {
            const createLayer = new CreateLayer();
            createLayer.createLayer(step, simulation);

            const layer = [createLayer.getBuildingsLayer(), createLayer.getRoadsLayer(), createLayer.getRefugesLayer(), createLayer.getHydrantsLayer(), createLayer.getGasStationsLayer(), createLayer.getFireStationsLayer(), createLayer.getAmbulanceCentresLayer(), createLayer.getCiviliansLayer(), createLayer.getFireBrigadesLayer(), createLayer.getAmbulanceTeamsLayer(), createLayer.getPoliceForcesLayer()];

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
                // getTooltip={({ object }) => {
                //     return object && JSON.stringify(object.other, null, 2);
                // }}
            />
        </>
    );
}
