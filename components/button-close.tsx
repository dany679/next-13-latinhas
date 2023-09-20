import { XCircle } from "lucide-react";

const ButtonClose = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className=" flex w-full justify-end mr-5 ">
      <button typeof="button" onClick={onClick}>
        <XCircle className=" relative right-2 top-2 cursor-pointer w-6 h-6" />
      </button>
    </div>
  );
};

export default ButtonClose;
