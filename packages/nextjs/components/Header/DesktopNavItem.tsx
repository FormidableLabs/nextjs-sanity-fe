import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

type DesktopNavItemProps = {
  label: string;
  href: string;
};

export const DesktopNavItem = ({ label, href }: DesktopNavItemProps) => {
  const router = useRouter();

  return (
    <li
      key={label}
      className={classNames(
        "text-primary text-body-reg mr-1 last:mr-0 py-1 px-4 rounded-2xl relative border-2 transition transition-colors duration-300",
        router.pathname === href ? "border-primary" : "border-[transparent]"
      )}
    >
      <Link href={href} passHref>
        <a>{label}</a>
      </Link>
    </li>
  );
};
