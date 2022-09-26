import Link from "next/link";

type DesktopNavItemProps = {
  label: string;
  href: string;
};

export const DesktopNavItem = ({ label, href }: DesktopNavItemProps) => (
  <li key={label} className="text-blue text-body-reg mr-4 last:mr-0">
    <Link href={href}>
      <a>{label}</a>
    </Link>
  </li>
);
