import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useMobileNav } from ".";

export const MobileNavMenu = () => {
  const { onMobileNavClick, isNavOpen } = useMobileNav();

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="flex ml-4 text-primary"
        aria-controls="mobile-menu"
        aria-expanded="false"
        onClick={onMobileNavClick}
      >
        <span className="sr-only">Open Main Menu</span>
        {isNavOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
      </button>
    </div>
  );
};
