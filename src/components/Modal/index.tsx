import { ModalProps } from "./types";
import { ModalBackdrop, ModalContent } from "./styles";

const ModalComponent = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ModalBackdrop isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ModalComponent;
