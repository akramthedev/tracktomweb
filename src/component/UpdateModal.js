import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';

const EditModal = ({ open, handleClose, handleSave, editData, setEditData }) => {
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEditData({
      ...editData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Serre</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Nom de Serre"
          type="text"
          fullWidth
          value={editData.name}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="non_travaille"
              checked={editData.non_travaille}
              onChange={handleChange}
            />
          }
          label="Non travaille"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSave();
            handleClose();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
