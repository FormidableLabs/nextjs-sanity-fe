import Link from "next/link";

interface Props {
  children: React.ReactNode;
  to: string;
  className?: string;
}

export const Card: React.FC<Props> = ({ to, children, className = "" }) => {
  return (
    <Link href={to}>
      <a
        className={`h-52 w-52 shadow-md border flex items-center justify-center font-bold bg-no-repeat ${className}`}
        style={{ background: "url('https://via.placeholder.com/208')" }}
      >
        {children}
      </a>
    </Link>
  );
};
