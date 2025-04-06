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
  BitBoxTableInfoModalProps,
  BitBoxTableModalProps,
  BitBoxTableRecord,
  IBitBoxTableInfoModalConfig,
  IBitBoxTableModalConfig,
} from "./types";
import styles from "./styles.module.scss";
import { Nullable } from "@/core/types";

const BitBoxTableContainer = <T extends BitBoxTableRecord>({
  handleSelect,
  handleAddRow,
  handleEditRow,
  contextMenu,
  borderContextMenu,
  records,
  onRow: foreignOnRow,
  selected: foreignSelected,
  ...props
}: BitBoxTableContainerProps<T>): ReactNode => {
  const [selected, setSelected] = useState<BitBoxTableRecord[]>(
    foreignSelected ?? [],
  );
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [contextMenuType, setContextMenuType] =
    useState<Nullable<"table" | "border">>(null);
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
  const [infoModalConfig, setInfoModalConfig] =
    useState<IBitBoxTableInfoModalConfig>({
      open: false,
    });

  const handleChangeSelected = (selected: BitBoxTableRecord[]) => {
    setSelected(selected);
    handleSelect?.(selected);
  };

  const handleRowClick = (event: MouseEvent, record: BitBoxTableRecord) => {
    event.stopPropagation();
    setIsContextMenuOpen(false);
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

  const handleClearSelected: MouseEventHandler<HTMLDivElement> = () => {
    setSelected([]);
  };

  const handleBorderContextMenu: MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    event.preventDefault();
    handleChangeSelected([]);

    if (!isContextMenuOpen) {
      document.addEventListener("click", function onClickOutside() {
        setIsContextMenuOpen(false);
        document.removeEventListener("click", onClickOutside);
      });
    }

    setContextMenuType("border");
    setIsContextMenuOpen(true);
    setContextMenuPosition({
      left: `${event.clientX}px`,
      top: `${event.clientY}px`,
    });
  };

  const handleContextMenu = (event: MouseEvent, record: BitBoxTableRecord) => {
    event.preventDefault();
    event.stopPropagation();
    if (
      (typeof contextMenu?.show === "boolean" && !contextMenu?.show) ||
      (typeof contextMenu?.show === "function" &&
        !contextMenu?.show?.(record, selected))
    ) {
      setIsContextMenuOpen(false);
      return;
    }

    if (!isContextMenuOpen) {
      document.addEventListener("click", function onClickOutside() {
        setIsContextMenuOpen(false);
        document.removeEventListener("click", onClickOutside);
      });
    }

    if (!selected.some((s) => s._id === record._id)) {
      setSelected([record]);
    }

    setContextMenuType("table");
    setIsContextMenuOpen(true);
    setContextMenuPosition({
      left: `${event.clientX}px`,
      top: `${event.clientY}px`,
    });
  };

  const onRow: TableProps["onRow"] = (record) => ({
    className: `${styles["row"]} ${selected.some((s) => s._id === record?._id) ? styles["row__selected"] : ""}`,
    onContextMenu: (event) => handleContextMenu(event, record),
    onClick: (event) => handleRowClick(event, record),
    ...foreignOnRow?.(record),
  });

  const modalProps: BitBoxTableModalProps = {
    config: modalConfig,
    setConfig: setModalConfig,
    handleAddRow,
    handleEditRow,
    selected,
  };

  const infoModalProps: BitBoxTableInfoModalProps = {
    config: infoModalConfig,
    setConfig: setInfoModalConfig,
    selected: selected[0],
  };

  const contextMenuProps: DropDownProps = {
    ...((contextMenuType === "table" ? contextMenu : borderContextMenu) ?? {}),
    menu: (contextMenuType === "table"
      ? contextMenu?.menu
      : borderContextMenu?.menu)?.({
      selected,
      modalConfig,
      infoModalConfig,
      setSelected: handleChangeSelected,
      setContextMenuOpen: setIsContextMenuOpen,
      setModalConfig,
      setInfoModalConfig,
    }) ?? { items: [] },
    overlayStyle: contextMenuPosition,
    open: isContextMenuOpen,
  };

  useEffect(() => {
    setSelected(foreignSelected ?? []);
  }, [foreignSelected]);

  useEffect(() => {
    setSelected([]);
  }, [records]);

  return (
    <BitBoxTable
      handleBorderContextMenu={handleBorderContextMenu}
      handleBorderClick={handleClearSelected}
      contextMenuProps={contextMenuProps}
      infoModalProps={infoModalProps}
      modalProps={modalProps}
      records={records}
      onRow={onRow}
      {...props}
    />
  );
};

export default BitBoxTableContainer;
