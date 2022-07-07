import Link from "next/link";

interface Props {
  children: React.ReactNode;
  to: string;
  className?: string;
  imageUrl?: string | null;
}

export const Card: React.FC<Props> = ({ to, children, imageUrl, className = "" }) => {
  return (
    <Link href={to}>
      <a className={`shadow-md border flex flex-col items-center justify-center ${className}`}>
        <img src={imageUrl ?? ""} alt="TODO: Add Alt" className={`h-52 w-52`} />
        <h2 className="text-xl font-bold my-2">{children}</h2>
      </a>
    </Link>
  );
};
