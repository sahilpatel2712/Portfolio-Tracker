import { FormModalType } from "./FormModal";
import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-51.5%, -50%)",
  maxWidth: 600,
  width: "calc(100% - 16px)",
  margin: "8px",
  bgcolor: "background.paper",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#101115",
};

const DeleteConformModal = ({
  open,
  setOpen,
}: Pick<FormModalType, "open" | "setOpen">) => {
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
              <p className="text-4xl font-medium">Delete Stock</p>
              <p className="text-lg font-medium my-5">
                Are you sure you want to remove your stock?
              </p>
              <div className="w-full flex justify-end gap-3 mt-4">
                <Button
                  color="inherit"
                  style={{
                    backgroundColor: "#b91c1c",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="inherit"
                  onClick={() => setOpen(false)}
                  style={{
                    backgroundColor: "#1e40af",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteConformModal;
