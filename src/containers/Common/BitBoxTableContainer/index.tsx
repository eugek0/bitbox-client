import {
  CSSProperties,
  DragEventHandler,
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
  handleDrop: foreignHandleDrop,
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
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
    null,
  );
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
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    foreignHandleDrop?.(event);
    setIsDragOver(false);
  };

  const handleChangeSelected = (selected: BitBoxTableRecord[]) => {
    setSelected(selected);
    handleSelect?.(selected);
  };

  const handleRowClick = (event: MouseEvent, record: BitBoxTableRecord) => {
    event.stopPropagation();
    setIsContextMenuOpen(false);

    const currentIndex = records.findIndex((item) => item._id === record._id);

    if (event.shiftKey && selected.length > 0 && lastSelectedIndex !== null) {
      const start = Math.min(lastSelectedIndex, currentIndex);
      const end = Math.max(lastSelectedIndex, currentIndex);
      const range = records.slice(start, end + 1);
      handleChangeSelected(range);
    } else if (event.altKey) {
      const isAlreadySelected = selected.some((s) => s._id === record._id);
      const newSelected = isAlreadySelected
        ? selected.filter((s) => s._id !== record._id)
        : [...selected, record];
      handleChangeSelected(newSelected);
      setLastSelectedIndex(currentIndex);
    } else {
      handleChangeSelected([record]);
      setLastSelectedIndex(currentIndex);
    }
  };

  const handleClearSelected: MouseEventHandler<HTMLDivElement> = () => {
    handleChangeSelected([]);
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
      handleChangeSelected([record]);
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
      handleDragEnter={handleDragEnter}
      handleDragLeave={handleDragLeave}
      infoModalProps={infoModalProps}
      handleDrop={handleDrop}
      isDragOver={isDragOver}
      modalProps={modalProps}
      records={records}
      onRow={onRow}
      {...props}
    />
  );
};

export default BitBoxTableContainer;
