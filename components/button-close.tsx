import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const ButtonClose = ({
  onClick,
  className,
  classNameButton,
}: {
  onClick: () => void;
  className?: string;
  classNameButton?: string;
}) => {
  return (
    <div className={cn(" flex w-full justify-end mr-5 ", className)}>
      <button typeof="button" onClick={onClick}>
        <X
          className={cn(
            " relative right-2 top-2 cursor-pointer w-4 h-4",
            classNameButton
          )}
        />
      </button>
    </div>
  );
};

export default ButtonClose;
