import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { SizeType } from "antd/es/config-provider/SizeContext";

export interface LogotypeProps extends Omit<AntdIconProps, "size"> {
  size?: SizeType;
}
