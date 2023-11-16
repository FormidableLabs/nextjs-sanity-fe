import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

type MobileNavMenuProps = {
  onMobileNavClick: () => void;
  navOpen: boolean;
};

export const MobileNavMenu = ({ navOpen, onMobileNavClick }: MobileNavMenuProps) => (
  <div className="sm:hidden">
    <button
      type="button"
      className="flex ml-4 text-primary"
      aria-controls="mobile-menu"
      aria-expanded="false"
      onClick={onMobileNavClick}
    >
      <span className="sr-only">Open Main Menu</span>
      {navOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
    </button>
  </div>
);
