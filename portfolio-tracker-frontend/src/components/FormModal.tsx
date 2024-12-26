import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextInput from "./TextInput";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width:"100%",
  bgcolor: "background.paper",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#101115",
};

type FormModalType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormInputType = {
  placeholder: string;
  label: string;
  type: "number" | "search" | "text" | "email" | "password" | "tel" | "url";
};

const FormModal = ({ open, setOpen }: FormModalType) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="w-full text-white flex flex-col items-center">
              <div className="w-full flex justify-between gap-5">
                <FormInput label="Name" placeholder="Apple Inc" type="text" />
                <FormInput label="Ticker" placeholder="AAPL" type="text" />
              </div>
              <div className="w-full flex justify-between gap-5">
                <FormInput label="Quantity" placeholder="0" type="text" />
                <FormInput label="Price" placeholder="23.5" type="text" />
              </div>
              <div className="w-full flex justify-end gap-3 mt-4">
                <Button color="inherit" style={{backgroundColor:"#b91c1c",fontWeight:"600",fontSize:12}} onClick={()=>setOpen(false)} >Cancel</Button>
                <Button color="inherit" onClick={()=>setOpen(false)} style={{backgroundColor:"#1e40af",fontWeight:"600",fontSize:12}} >Submit</Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default FormModal;

const FormInput = ({ placeholder, label, type }: FormInputType) => {
  return (
    <div className="w-[100%] mb-4 flex flex-col gap-1">
      <label className="font-semibold" htmlFor="email">
        {label}
      </label>
      <TextInput
        placeholder={placeholder}
        type={type}
        classes="bg-bgColor-custom text-white border-white border-[0.5px] border-opacity-20"
      />
    </div>
  );
};
