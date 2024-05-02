import React, { useState } from "react";
import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Snackbar,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

interface AlertComponentProps {
  message: string;
  severity?:
    | OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
    | undefined;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  message,
  severity,
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ width: "90%" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "800px", zIndex: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
