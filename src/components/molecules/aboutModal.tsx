import { Modal } from "../organisms/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleOptionClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, question: string) => void;
};

const QUESTIONS = [
  "What's Fer's Tech Stack?",
  "What's Fer's favorite programming language?",
  "What's Fer's coding time experience?",
  "What's Fer's education?",
];

export const AboutModal = ({ isOpen, onClose, handleOptionClick }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      innerCloseBtn
      bgColor="bg-blue-800 dark:bg-gray-900"
    >
      <div className="flex flex-col gap-4">
        {QUESTIONS.map((question) => (
          <div
            key={question}
            className="flex flex-col gap-2"
          >
            <div
              className="font-bold text-white hover:text-gray-200 cursor-pointer"
              onClick={(e) => handleOptionClick?.(e, question)}
            >
              {question}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
