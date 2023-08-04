import { Modal } from "../organisms/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleOptionClick?: (option: string) => void;
};

export const AboutModal = ({ isOpen, onClose, handleOptionClick }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      outerCloseBtn
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-gray-800">What&apos;s Fer&apos;s Tech Stack?</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold text-gray-800">What&apos;s Fer&apos;s favorite programming language?</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold text-gray-800">What&apos;s Fer&apos;s programming time experience?</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold text-gray-800">What&apos;s Fer&apos;s education?</div>
        </div>
      </div>
    </Modal>
  );
};
