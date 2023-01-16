import { Dialog, Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import * as React from "react";
import { FiChevronDown, FiLogOut, FiX } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";

import Button from "@/components/buttons/Button";
import UnstyledLink from "@/components/links/UnstyledLink";
import Logo from "@/components/Logo";
import NextImage from "@/components/NextImage";
import Typography from "@/components/typography/Typography";
import Navigation from "@/layouts/dashboard/Navigation";
import clsxm from "@/lib/clsxm";
import useAuthStore from "@/store/useAuthStore";
import useDialogStore from "@/store/useDialogStore";

export default function MobileNavigation() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const open = useDialogStore.useOpen();
  const user = useAuthStore.useUser();
  const logout = useAuthStore.useLogout();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex h-20 flex-shrink-0 justify-between bg-background-liteCream lg:hidden">
        <button
          type="button"
          className="text-typo-icons px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-main lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <HiOutlineMenu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex items-center px-2">
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="group max-w-[200px] rounded-md bg-background-cream/60 px-2 py-1.5 text-left text-sm font-medium text-gray-700 hover:bg-background-cream focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2 focus:ring-offset-gray-100">
                <span className="sr-only">Open user menu</span>

                <div className="flex w-full items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center justify-between space-x-3">
                    <NextImage
                      className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full"
                      src="/images/ilits-logo-square.png"
                      width={256}
                      height={256}
                      alt="avatar"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Typography variant="s2">{user?.name}</Typography>
                      <Typography
                        variant="b3"
                        color="secondary"
                        className={clsxm(!open && "truncate")}
                      >
                        {user?.role}
                      </Typography>
                    </div>
                  </div>
                  <FiChevronDown
                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-background-liteCream shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-3">
                  <Typography variant="body" className="text-neutral-1000">
                    {user?.name}
                  </Typography>
                  <Typography
                    variant="body"
                    color="secondary"
                    className={clsxm(!open && "truncate", "text-yellow-500")}
                  >
                    {user?.role}
                  </Typography>
                </div>
                {/* //! Don't forget to adjust UserAction component */}
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <UnstyledLink
                        href="#"
                        className={clsx(
                          active
                            ? "text-typo bg-gray-100 text-primary-main"
                            : "text-typo-secondary text-primary-main",
                          "px-4 py-2 text-sm",
                          "flex items-center gap-1.5"
                        )}
                      >
                        Ganti Password
                      </UnstyledLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={clsx(
                          active
                            ? "bg-gray-100 text-danger-main"
                            : "text-danger-main",
                          "w-full px-4 py-2 text-left text-sm",
                          "flex items-center gap-1.5"
                        )}
                      >
                        <FiLogOut />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Navigation Dialog */}
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-background-liteCream bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="bg-secondary-300 relative flex w-full max-w-[85%] flex-1 flex-col pt-5 pb-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <Button
                    variant="danger"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <FiX />
                  </Button>
                </div>
              </Transition.Child>
              <div className="flex flex-shrink-0 items-center justify-center gap-2 px-4">
                <Logo />
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <Navigation />
              </div>
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
