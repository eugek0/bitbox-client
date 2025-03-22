import {
  CSSProperties,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { DropDownProps, TableProps } from "antd";
import BitBoxTable from "@/components/Common/BitBoxTable";
import {
  BitBoxTableContainerProps,
  BitBoxTableModalProps,
  BitBoxTableRecord,
  IBitBoxTableModalConfig,
} from "./types";
import styles from "./styles.module.scss";

const BitBoxTableContainer = <T extends BitBoxTableRecord>({
  handleSelect,
  handleAddRow,
  contextMenu,
  onRow: foreignOnRow,
  selected: foreignSelected,
  ...props
}: BitBoxTableContainerProps<T>): ReactNode => {
  const [selected, setSelected] = useState<BitBoxTableRecord[]>(
    foreignSelected ?? [],
  );
  const [isContextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<CSSProperties>(
    {
      left: "",
      top: "",
    },
  );
  const [modalConfig, setModalConfig] = useState<IBitBoxTableModalConfig>({
    open: false,
    mode: null,
  });

  const handleChangeSelected = (selected: BitBoxTableRecord[]) => {
    setSelected(selected);
    handleSelect?.(selected);
  };

  const handleRowClick = (event: MouseEvent, record: BitBoxTableRecord) => {
    if (event.altKey) {
      if (selected.some((s) => s._id === record._id)) {
        handleChangeSelected(selected.filter((s) => s._id !== record._id));
      } else {
        handleChangeSelected([...selected, record]);
      }
    } else {
      setSelected([record]);
    }
  };

  const handleContextMenu = (event: MouseEvent, record: BitBoxTableRecord) => {
    event.preventDefault();
    if (!isContextMenuOpen) {
      document.addEventListener("click", function onClickOutside() {
        setContextMenuOpen(false);
        document.removeEventListener("click", onClickOutside);
      });
    }

    if (!selected.some((s) => s._id === record._id)) {
      setSelected([record]);
    }

    setContextMenuOpen(true);
    setContextMenuPosition({
      left: `${event.clientX}px`,
      top: `${event.clientY}px`,
    });
  };

  const onRow: TableProps["onRow"] = (record) => ({
    className: `${styles["row"]} ${selected.some((s) => s._id === record?._id) ? styles["row__selected"] : ""}`,
    onContextMenu: (event) => handleContextMenu(event, record),
    onClick: (event) => handleRowClick(event, record),
    ...onRow,
  });

  const modalProps: BitBoxTableModalProps = {
    config: modalConfig,
    setConfig: setModalConfig,
    handleAddRow,
  };

  const contextMenuProps: DropDownProps = {
    ...(contextMenu ?? {}),
    menu: contextMenu?.menu?.({
      selected,
      modalConfig,
      setContextMenuOpen,
      setModalConfig,
    }),
    overlayStyle: contextMenuPosition,
    open: isContextMenuOpen,
  };

  useEffect(() => {
    setSelected(foreignSelected ?? []);
  }, [foreignSelected]);

  return (
    <BitBoxTable
      contextMenuProps={contextMenuProps}
      modalProps={modalProps}
      onRow={onRow}
      {...props}
    />
  );
};

export default BitBoxTableContainer;
