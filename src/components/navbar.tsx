"use client";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { classNames } from "./helperFunctions";
import LoginAside from "@/app/auth/page";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setShowOTPmodal } from "@/redux/authSlice";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  // const userExists = useSelector((state: RootState) => state.auth.userExists);
  const isloggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDropdownToggle = (
    isOpen: boolean | ((prevState: boolean) => boolean)
  ) => {
    setDropdownOpen(isOpen);
  };

  const logoutProfile = () => {
    console.log("logged out");
    router.push("/");
    localStorage.removeItem("mobile_number");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogIn");
    dispatch(setShowOTPmodal(false));
    dispatch(setIsLoggedIn(false));
  };

  // logoutProfile()

  const handleLoginClick = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <Disclosure as="nav" className="bg-header">
      {({ open, close }) => (
        <>
          {isLoginOpen && (
            <LoginAside
              isOpen={isLoginOpen}
              onClose={() => setLoginOpen(false)}
            />
          )}
          <div className="mx-auto px-2 sm:px-6 lg:px-16 py-2 z-10">
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
                <div
                  onMouseEnter={() => handleDropdownToggle(true)}
                  onMouseLeave={() => handleDropdownToggle(false)}
                  className="hidden lg:block text-lg font-semibold text-gray-100 hover:bg-gray-800 hover:text-white rounded-md px-5 py-2 relative cursor-pointer z-20"
                >
                  <span>My Account</span>
                  {isDropdownOpen && (
                    <div className="absolute w-32 top-full left-0 p-2 mt-0 bg-theme space-y-2 shadow-md rounded-md cursor-pointer">
                      <Link href="/myAccount">
                        <div
                          onClick={() => {
                            setDropdownOpen(false);
                            close();
                          }}
                          className="block px-4 text-white text-center rounded py-2 text-sm coins_background cursor-pointer shadow-md"
                        >
                          Profile
                        </div>
                      </Link>
                      <div
                        onClick={() => {
                          setDropdownOpen(false);
                          logoutProfile();
                          close();
                        }}
                        className="block px-4 text-center rounded py-2 text-sm coins_background cursor-pointer shadow-md"
                      >
                        Sign out
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <label
                  className="text-white hidden sm:inline-block ml-3"
                  onClick={handleLoginClick}
                >
                  <span>
                    <Link className="text-white " href="">
                      Login/Sign Up
                    </Link>
                  </span>
                </label>
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
                      <Link
                        className="block lg:hidden text-gray-300 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-md font-medium"
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
                              "block px-6 py-2 text-sm text-gray-700"
                            )}
                          >
                            <div
                              onClick={() => {
                                close();
                              }}
                            />
                            Profile
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-6 py-2 text-sm text-gray-700"
                            )}
                            onClick={logoutProfile}
                          >
                            Sign out
                          </Link>
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
                    console.log("clicking coins");
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
                    console.log("clicking about");
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
                    console.log("clicking contact");
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
                    console.log("clicking dashboard");
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

const styles = {
  p0: "hidden lg:block text-lg  font-semibold text-gray-100 hover:bg-gray-800 hover:text-white rounded-md px-5 py-2",
  p1: "block rounded-md px-3 py-2 text-lg  font-semibold text-white",
};

export default Navbar;
