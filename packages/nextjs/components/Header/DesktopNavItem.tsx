import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type DesktopNavItemProps = {
  label: string;
  href: string;
};

export const DesktopNavItem = ({ label, href }: DesktopNavItemProps) => {
  const router = useRouter();

  return (
    <li key={label} className={"text-blue text-body-reg mr-1 last:mr-0 py-1 px-4 rounded-2xl relative"}>
      <Link href={href} passHref>
        <a>{label}</a>
      </Link>
      {router.pathname === href && (
        <motion.div layoutId="activeIndicator" className="absolute inset-0 rounded-2xl border-2"></motion.div>
      )}
    </li>
  );
};
