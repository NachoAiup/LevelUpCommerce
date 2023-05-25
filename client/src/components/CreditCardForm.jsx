import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const monthsArr = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const CreditCardForm = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    fetch("http://localhost:5000/payment", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
    setOpen(true);
  };

  return (
    <Paper
      elevation={8}
      sx={{ width: "30vw", height: "50vh", padding: "20px" }}
    >
      <Typography variant="h5" margin={1} mb={2}>
        PAYMENT DETAILS
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          id="cardNumber"
          type="number"
          name="cardNumber"
          label="CREDIT CARD NUMBER"
          defaultValue=""
          required
        ></TextField>
        <Typography variant="h6" sx={{ textAlign: "left", margin: "10px" }}>
          EXPIRY DATE
        </Typography>
        <FormControl
          sx={{ display: "flex", flexDirection: "row", gap: "20px" }}
        >
          <InputLabel id="month-label">Month</InputLabel>
          <Select
            sx={{ width: "100px", alignSelf: "start" }}
            variant="outlined"
            id="month"
            defaultValue=""
            name="month"
            labelId="month-label"
            label="month"
            required
          >
            {monthsArr.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
          <TextField
            sx={{ width: "100px" }}
            id="year"
            name="year"
            type="number"
            defaultValue=""
            label="Year"
            required
          ></TextField>
        </FormControl>
        <Typography variant="h6" sx={{ textAlign: "left", margin: "10px" }}>
          CVV
        </Typography>
        <FormControl
          sx={{ display: "flex", flexDirection: "row", gap: "30px" }}
        >
          <TextField
            sx={{ width: "100px" }}
            id="cvv"
            name="cvv"
            type="number"
            defaultValue=""
            required
          ></TextField>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: "20px" }}
        >
          PAY
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={message === "Payment accepted!" ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreditCardForm;
