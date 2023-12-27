"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { classNames } from "./helperFunctions";

const Navbar = () => {
  // const handleAuth = useAuth();
  // const isLoggedIn = useAppSelector(getAuth);
  const isloggedIn = true;

  return (
    <Disclosure as="nav" className="bg-header">
      {({ open, close }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-16 py-2">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-16"
                    src={new URL(
                      "../../public/Logo.png",
                      import.meta.url
                    ).toString()}
                    alt="Your Company"
                  />
                </div>
              </div>
              <Link className={styles.p0} href="/">
                Home
              </Link>
              <Link className={styles.p0} href="/coins">
                Coins
              </Link>
              <Link className={styles.p0} href="/about">
                About
              </Link>
              <Link className={styles.p0} href="/contact">
                Contact Us
              </Link>
              <Link className={styles.p0} href="/dashboard">
                Dashboard
              </Link>
              {isloggedIn ? (
                <Link className={styles.p0} href="/myAccount">
                  My Account
                </Link>
              ) : (
                <Link className={styles.p0} href="/">
                  Login/Sign Up
                </Link>
              )}

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4"></div>
                </div>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {/* <Link
                        className="hidden sm:block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium"
                        href="#"
                      >
                        Login/Sign Up
                      </Link> */}

                      <Link
                        className="block lg:hidden text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium"
                        href="#"
                      >
                        <UserCircleIcon className="h-8" />
                      </Link>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/myAccount"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/* Mobile dropdown */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link href="/">
                <div
                  onClick={() => {
                    close();
                  }}
                  className={styles.p1}
                >
                  Home
                </div>
              </Link>
              <Link href="/coins">
                <div
                  onClick={() => {
                    close();
                    console.log('clicking coins')

                  }}
                  className={styles.p1}
                >
                  Coins
                </div>
              </Link>
              <Link href="/about">
                <div
                  onClick={() => {
                    close();
                    console.log('clicking about')

                  }}
                  className={styles.p1}
                >
                  About
                </div>
              </Link>
              <Link href="/contact">
                <div
                  onClick={() => {
                    close();
                    console.log('clicking contact')
                  }}
                  className={styles.p1}
                >
                  Contact
                </div>
              </Link>
              <Link href="/dashboard">
                <div
                  onClick={() => {
                    close();
                    console.log('clicking dashboard')
                  }}
                  className={styles.p1}
                >
                  Dashboard
                </div>
              </Link>
              {isloggedIn ? (
                <Link href="/myAccount">
                  <div
                    onClick={() => {
                      close();
                    }}
                    className={styles.p1}
                  >
                    My Account
                  </div>
                </Link>
              ) : (
                <Link href="/">
                  <div
                    onClick={() => {
                      close();
                    }}
                    className={styles.p1}
                  >
                    Login/Sign Up
                  </div>
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

const styles = {
  p0: "hidden lg:block text-lg  font-semibold text-gray-100 hover:bg-gray-700 hover:text-white rounded-md px-5 py-2",
  p1: "block rounded-md px-3 py-2 text-lg  font-semibold text-white",
};
