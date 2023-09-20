import { cn } from "@/lib/utils";

interface HeadingTextProps {
  title: string;
  description: string;
  color?: string;
}

const HeadingText = ({ title, description, color }: HeadingTextProps) => {
  return (
    <div className="">
      <h2 className={cn("text-3xl font-bold ", color)}>{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default HeadingText;
