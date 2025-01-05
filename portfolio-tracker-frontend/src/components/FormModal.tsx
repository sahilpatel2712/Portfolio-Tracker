import React from "react";
import { useNavigate } from "react-router";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextInput from "./TextInput";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/material";
import Select, { SingleValue } from "react-select";
import { stockFormSchema, StockFormType } from "../schema/stockFormValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { isValidObject } from "../utils/objectsValidation";
import { useAppDispatch } from "../redux/hooks";
import { FormValueType } from "../pages/Non-Auth/Portfolio";
import { addStock, updatePortfolio } from "../redux/portfolio/portfolioSlice";
import { searchStock } from "../api/stocksApi";

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

export type OptionType = {
  description: string;
  symbol: string;
};
export type FormModalType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formValues?: FormValueType | null;
};
type SearchSelectPropsType = Pick<
  FormInputType,
  "placeholder" | "error" | "label"
> & {
  name: "stockName" | "ticker" | "quantity" | "averagePrice";
  getValues: UseFormGetValues<StockFormType>;
  setValue: UseFormSetValue<StockFormType>;
  watch: UseFormWatch<StockFormType>;
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
    setValue,
    getValues,
    formState: { errors },
    reset,
    watch,
  } = useForm<StockFormType>({
    resolver: zodResolver(stockFormSchema),
    defaultValues: defaultFormValue,
  });

  const onSubmit = async (value: StockFormType) => {
    if (formValues?.id) {
      dispatch(updatePortfolio(value, formValues?.id || "", handleNavigate));
    } else {
      dispatch(addStock(value, handleNavigate));
    }
    reset(defaultFormValue);
    setOpen(false);
  };
  const handleNavigate = (path: string) => {
    navigate(path);
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
                  <SearchSelect
                    label="Stock Name"
                    placeholder="Apple Inc"
                    error={errors.stockName?.message}
                    name="stockName"
                    getValues={getValues}
                    watch={watch}
                    setValue={setValue}
                  />
                  <SearchSelect
                    label="Ticker"
                    placeholder="AAPL"
                    error={errors.ticker?.message}
                    name="ticker"
                    getValues={getValues}
                    watch={watch}
                    setValue={setValue}
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
                    type="text"
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

const SearchSelect = ({
  placeholder,
  label,
  error,
  name,
  getValues,
  watch,
  setValue,
}: SearchSelectPropsType) => {
  const [options, setOptions] = React.useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [inputText, setInputText] = React.useState<string>("");
  const searchTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleSearch = (searchText: string) => {
    setInputText(searchText);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(async () => {
      if (searchText.trim()) {
        setIsLoading(true);

        const response = await searchStock(searchText, false, (path: string) =>
          navigate(path)
        );
        const stocks = response?.data.payload.searchedStocks || [];
        setOptions(()=>stocks);

        setIsLoading(false);
      }
    }, 300);
  };

  const handleSelect = (value: SingleValue<OptionType>) => {
    setValue("stockName", value?.description || "");
    setValue("ticker", value?.symbol || "");
  };
  watch(name);
  return (
    <div className="w-[100%] mb-4 flex flex-col gap-1">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>

      <Select
        options={options}
        value={{
          description: getValues("stockName"),
          symbol: getValues("ticker"),
        }}
        isSearchable={true}
        hideSelectedOptions={true}
        inputValue={inputText}
        getOptionLabel={(e) =>
          name === "ticker" ? e.symbol : `${e.description} ${e.symbol}`
        }
        getOptionValue={(e) => (name === "ticker" ? e.symbol : e.description)}
        placeholder={placeholder}
        onChange={handleSelect}
        onInputChange={handleSearch}
        isLoading={isLoading}
        components={{
          DropdownIndicator: () => null,
        }}
        className="w-full shadow rounded-md focus:outline-none focus:shadow-none focus:ring-0 !bg-bgColor-custom !text-white !border-white !border-[0.5px] !border-opacity-20"
        styles={{
          control: (baseStyle) => ({
            ...baseStyle,
            backgroundColor: "#1e1e1e",
            border: "none",
          }),
        }}
        classNames={{
          indicatorSeparator: () => "hidden",
          menuList: () => "bg-bgColor-custom",
          singleValue: () => "!text-white",
          option: () => "hover:!bg-bgColor !bg-transparent",
          input: () => "!text-white",
        }}
      />

      {error && (
        <p className="m-0 text-red-500 font-bold text-[13px] ms-2 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
