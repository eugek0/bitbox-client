import { FC, useEffect, useState } from "react";
import { InputNumber, InputNumberProps, Select, Space } from "antd";
import { SelectProps } from "antd/lib";
import { FILE_SIZE_INPUT_OPTIONS } from "./constants";
import { Nullable } from "@/core/types";
import { FileSizeInputProps } from "./types";
import styles from "./styles.module.scss";

const MEASURES_IN_BYTES = Object.values(FILE_SIZE_INPUT_OPTIONS)
  .filter((option) => typeof option.value === "number")
  .map((option) => option.value)
  .reverse() as number[];

const FileSizeInput: FC<FileSizeInputProps> = ({
  value: foreignValue,
  onChange: foreingOnChange,
  disabled,
  className,
  ...props
}) => {
  const [measure, setMeasure] = useState<number>(1);
  const [value, setValue] =
    useState<Nullable<string | number | undefined>>(null);

  const handleChange: InputNumberProps["onChange"] = (value) => {
    foreingOnChange?.(value ? +value * measure : null);
    setValue(value);
  };

  const handleChangeMeasure: SelectProps["onChange"] = (measure) => {
    value && foreingOnChange?.(+value * measure);
    setMeasure(measure);
  };

  const handleFixValue = () => {
    if (foreignValue) {
      const measure = MEASURES_IN_BYTES.find((bytes) => bytes < +foreignValue);
      setValue(Math.trunc(+foreignValue / (measure ?? 1)));
      setMeasure(measure ?? 1);
    } else {
      setValue(foreignValue);
      setMeasure(1);
    }
  };

  useEffect(() => {
    handleFixValue();
  }, [foreignValue]);

  return (
    <Space.Compact className={className}>
      <InputNumber
        {...props}
        className={styles["size"]}
        disabled={disabled}
        onChange={handleChange}
        value={value}
      />
      <Select
        onChange={handleChangeMeasure}
        options={FILE_SIZE_INPUT_OPTIONS}
        disabled={disabled}
        value={measure}
      />
    </Space.Compact>
  );
};

export default FileSizeInput;
