import  React , { useState , useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function SelectCompo({ status, onStatusChange }) {
    const [selectedStatus, setSelectedStatus] = useState('');


    useEffect((e => {
        onStatusChange(selectedStatus);
    }), [selectedStatus])

    return (
        <div>
            <FormControl sx={{ m: 0, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Status du client</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    input={<OutlinedInput label="Status du client" />}
                    MenuProps={MenuProps}
                    renderValue={(selected) => selected}
                >
                    {status.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selectedStatus === name} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
