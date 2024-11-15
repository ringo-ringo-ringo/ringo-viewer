/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";

export default function Sidebar({ filter, setFilter, perceptionId, perceptionFilter, setPerceptionFilter }: any) {
    const body = css`
        position: absolute;
        top: 100px;
        left: 10px;
        max-height: calc(100% - 120px);
        background-color: gray;
        overflow: scroll;
    `;

    const [tabValue, setTabValue] = useState("1");

    const filterHandler = (e: any) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.checked,
        });
    };

    const perceptionFilterHandler = (e: any) => {
        setPerceptionFilter({
            ...perceptionFilter,
            [e.target.name]: e.target.checked,
        });
    };

    const tabHandler = (e: any, newValue: string) => {
        setTabValue(newValue);
    };

    const checkboxList = [];
    for (const key in filter) {
        checkboxList.push(key);
    }

    const perceptionCheckboxList = [];
    if (perceptionId !== null) {
        for (const key in perceptionFilter) {
            perceptionCheckboxList.push(key);
        }
    } else {
    }

    return (
        <div css={body}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={tabHandler} aria-label="lab API tabs example">
                        <Tab label="world" value="1" />
                        <Tab label="perception" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <FormGroup>
                        {checkboxList.map((key) => {
                            return <FormControlLabel key={key} control={<Checkbox name={key} checked={filter[key]} onClick={filterHandler} />} label={key} />;
                        })}
                    </FormGroup>
                </TabPanel>
                <TabPanel value="2">
                    <FormGroup>
                        {perceptionCheckboxList.map((key) => {
                            return <FormControlLabel key={key} control={<Checkbox name={key} checked={perceptionFilter[key]} onClick={perceptionFilterHandler} />} label={key} />;
                        })}
                    </FormGroup>
                </TabPanel>
            </TabContext>
        </div>
    );
}
