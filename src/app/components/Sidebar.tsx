import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Sidebar({ filter, setFilter, perceptionId, perceptionFilter, setPerceptionFilter }: any) {
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

    const checkboxList = [];
    for (const key in filter) {
        checkboxList.push(key);
    }

    const perceptionCheckboxList = [];
    if (perceptionId !== null) {
        for (const key in perceptionFilter) {
            perceptionCheckboxList.push(key);
        }

        setFilter((prevFilter: any) => {
            const newFilter = prevFilter;
            for (const key in newFilter) {
                newFilter[key] = false;
            }
            return newFilter;
        });
    } else {
        setFilter((prevFilter: any) => {
            const newFilter = prevFilter;
            for (const key in newFilter) {
                newFilter[key] = true;
            }
            return newFilter;
        });
    }

    return (
        <FormGroup>
            {checkboxList.map((key) => {
                return <FormControlLabel key={key} control={<Checkbox name={key} checked={filter[key]} onClick={filterHandler} />} label={key} />;
            })}
            {perceptionCheckboxList.map((key) => {
                return <FormControlLabel key={key} control={<Checkbox name={key} checked={perceptionFilter[key]} onClick={perceptionFilterHandler} />} label={key} />;
            })}
        </FormGroup>
    );
}
