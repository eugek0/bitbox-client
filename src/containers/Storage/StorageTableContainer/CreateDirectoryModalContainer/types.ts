export interface CreateDirectoryModalContainerProps {
  open: boolean;
  handleCloseModal: () => void;
  handleOkModal: (values: Record<string, any>) => void;
}
