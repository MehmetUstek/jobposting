import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

interface HireFreelancerDialogProps {
  open: boolean;
  onClose: () => void;
  formData: { name: string; subject: string; message: string };
  formErrors: { name: boolean; subject: boolean; message: boolean };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  snackbarOpen: boolean;
  snackbarMessage: string;
  onSnackbarClose: () => void;
}

const HireFreelancerDialog: React.FC<HireFreelancerDialogProps> = ({
  open,
  onClose,
  formData,
  formErrors,
  onFormChange,
  onSubmit,
  snackbarOpen,
  snackbarMessage,
  onSnackbarClose,
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Hire Freelancer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            type="text"
            fullWidth
            name="name"
            value={formData.name}
            onChange={onFormChange}
            required
            error={formErrors.name}
            helperText={formErrors.name ? "Name is required" : ""}
          />
          <TextField
            margin="dense"
            label="Subject"
            type="text"
            fullWidth
            name="subject"
            value={formData.subject}
            onChange={onFormChange}
            required
            error={formErrors.subject}
            helperText={formErrors.subject ? "Subject is required" : ""}
          />
          <TextField
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={onFormChange}
            required
            error={formErrors.message}
            helperText={formErrors.message ? "Message is required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={onSnackbarClose}
      >
        <Alert
          onClose={onSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HireFreelancerDialog;
