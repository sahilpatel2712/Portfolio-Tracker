import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextInput from "./TextInput";
import { Button } from "@mui/material";
import { stockFormSchema, StockFormType } from "../schema/stockFormValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { isValidObject } from "../utils/objectsValidation";
import { useAppDispatch } from "../redux/hooks";
import { FormValueType } from "../pages/Non-Auth/Portfolio";
import { updatePortfolio } from "../redux/portfolio/portfolioSlice";
import { useNavigate } from "react-router";

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

export type FormModalType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formValues?: FormValueType | null;
};

type FormInputType = {
  placeholder: string;
  label: string;
  type: "number" | "search" | "text" | "email" | "password" | "tel" | "url";
  error?: string;
  registerProps: UseFormRegisterReturn;
};

const defaultFormValue = {
  stockName: "",
  ticker: "",
  quantity: 0,
  averagePrice: 0,
};

const FormModal = ({ open, setOpen, formValues }: FormModalType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StockFormType>({
    resolver: zodResolver(stockFormSchema),
    defaultValues: defaultFormValue,
  });

  const onSubmit = async (value: StockFormType) => {
    dispatch(
      updatePortfolio(value, formValues?.id || "", (path: string) => {
        navigate(path);
      })
    );
    reset(defaultFormValue);
    setOpen(false);
  };
  const handleClose = () => {
    reset(defaultFormValue);
    setOpen(false);
  };

  React.useEffect(() => {
    if (isValidObject(formValues)) {
      const obj = {
        averagePrice: Number(formValues?.averagePrice) || 0,
        stockName: formValues?.stockName || "",
        ticker: formValues?.ticker || "",
        quantity: Number(formValues?.quantity) || 0,
      };
      reset(obj);
    }
  }, [formValues]);

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full text-white flex flex-col items-center">
                <div className="w-full flex justify-between gap-5">
                  <FormInput
                    label="Name"
                    placeholder="Apple Inc"
                    type="text"
                    error={errors.stockName?.message}
                    registerProps={register("stockName")}
                  />
                  <FormInput
                    label="Ticker"
                    placeholder="AAPL"
                    type="text"
                    error={errors.ticker?.message}
                    registerProps={register("ticker")}
                  />
                </div>
                <div className="w-full flex justify-between gap-5">
                  <FormInput
                    label="Quantity"
                    placeholder="0"
                    type="number"
                    error={errors.quantity?.message}
                    registerProps={register("quantity", {
                      valueAsNumber: true,
                    })}
                  />
                  <FormInput
                    label="Price"
                    placeholder="23.5"
                    type="number"
                    error={errors.averagePrice?.message}
                    registerProps={register("averagePrice", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="w-full flex justify-end gap-3 mt-4">
                  <Button
                    color="inherit"
                    style={{
                      backgroundColor: "#b91c1c",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="inherit"
                    type="submit"
                    style={{
                      backgroundColor: "#1e40af",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default FormModal;

const FormInput = ({
  placeholder,
  label,
  type,
  error,
  registerProps,
}: FormInputType) => {
  return (
    <div className="w-[100%] mb-4 flex flex-col gap-1">
      <label className="font-semibold" htmlFor={registerProps.name}>
        {label}
      </label>
      <TextInput
        placeholder={placeholder}
        type={type}
        error={error}
        classes="bg-bgColor-custom text-white border-white border-[0.5px] border-opacity-20"
        {...registerProps}
      />
    </div>
  );
};
