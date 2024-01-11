"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { SideNavItem } from "@/types";
import { Icon } from "@iconify/react";
import Image from "next/image";

export function SideNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const SIDENAV_ITEMS: SideNavItem[] = [
    {
      label: "Inicio",
      href: `/${params.storeId}`,
      icon: <Icon icon="lucide:home" width="24" height="24" />,
      active: pathname === `/${params.storeId}`,
    },
    {
      label: "Projectos",
      href: `/${params.storeId}/projects`,
      icon: <Icon icon="lucide:folder" width="24" height="24" />,
      active: pathname === `/${params.storeId}/projects`,
      submenu: false,
    },
    {
      label: "Posts",
      href: `/${params.storeId}/posts`,
      icon: <Icon icon="lucide:mail" width="24" height="24" />,
      active: pathname === `/${params.storeId}/posts`,
    },

    {
      label: "Configuración",
      href: `/${params.storeId}/settings`,
      icon: <Icon icon="lucide:settings" width="24" height="24" />,
      active: pathname === `/${params.storeId}/settings`,
      submenu: false,
    },
  ];

  return (
    <div className="md:w-60 bg-gray-100 h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-16 w-full"
        >
          <Image
            src="https://res.cloudinary.com/dik7oba8h/image/upload/v1702910227/Light_1_fzlg4v.svg"
            alt="Logo"
            width={60}
            height={60}
          />
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.href) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.label}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.href}
                    className={`${
                      subItem.href === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-lime-500 ${
            item.href === pathname ? "bg-lime-500" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.label}</span>
        </Link>
      )}
    </div>
  );
};
