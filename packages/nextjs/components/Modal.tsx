import { Fragment, PropsWithChildren, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";

type ModalProps = PropsWithChildren & {
  className?: string;
  showBackdrop?: boolean;
  isOpen?: boolean;
  onClose: (value: boolean) => void;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  showBackdrop = false,
  isOpen = false,
  className = "",
  onClose,
}) => {
  const styles = classNames("bg-white mx-auto", className);

  const handleOnClose = (value = false) => {
    if (onClose) onClose(value);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog className="relative z-20" onClose={handleOnClose}>
        {showBackdrop && (
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" aria-hidden="true" />
          </Transition.Child>
        )}

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex h-full w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={styles}>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
