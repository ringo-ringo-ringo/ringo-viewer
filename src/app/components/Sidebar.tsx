import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Sidebar({ filter, setFilter }: any) {
    const filterHandler = (e: any) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.checked,
        });
    };

    const checkboxList = [];
    for (const key in filter) {
        checkboxList.push(key);
    }

    return (
        <FormGroup>
            {checkboxList.map((key) => {
                return <FormControlLabel key={key} control={<Checkbox name={key} checked={filter[key]} onClick={filterHandler} />} label={key} />;
            })}
        </FormGroup>
    );
}
