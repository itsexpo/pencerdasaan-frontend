import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import * as React from "react";
import { IconType } from "react-icons";
import { FiChevronDown, FiFileText } from "react-icons/fi";

import UnstyledLink from "@/components/links/UnstyledLink";
import clsxm from "@/lib/clsxm";
import useAuthStore from "@/store/useAuthStore";
import { PermissionList } from "@/types/entities/permission-list";

export type Navigation = {
  name: string;
  href: string;
  icon: IconType;
  /**
   * Use this when the route is also used as a nested route
   * @example Use exactMatch for '/dashboard' to avoid both navigation links active when visiting '/dashboard/edit'
   */
  exactMatch?: boolean;
  children?: Navigation[];
  permissions?: PermissionList;
};

type NavigationProps = React.ComponentPropsWithoutRef<"nav">;

const navigations: Navigation[] = [
  {
    name: "Dashboard",
    href: "/my",
    icon: FiFileText,
    permissions: ["login_user.store"],
  },
  {
    name: "Contoh Nested Dashboard",
    href: "#",
    icon: FiFileText,
    children: [
      {
        name: "Status",
        href: "/my/open-campus",
        icon: FiFileText,
        permissions: ["admin.delete", "admin.store"],
      },
      {
        name: "Daftar",
        href: "/my/open-campus/daftar",
        icon: FiFileText,
        permissions: ["login_user.store"],
      },
    ],
  },
];

export default function Navigation({ className, ...rest }: NavigationProps) {
  return (
    <nav className={clsxm("px-2 md:px-3", className)} {...rest}>
      <div className="space-y-1.5">
        {navigations.map((nav) =>
          nav.children ? (
            <NestedNavigation navigation={nav} key={nav.name} />
          ) : (
            <NavigationLink key={nav.name} navigation={nav} />
          )
        )}
      </div>
    </nav>
  );
}

function NestedNavigation({
  navigation: navChildren,
}: {
  navigation: Navigation;
}) {
  const router = useRouter();

  // Recursively check if any children is active
  function checkActive(nav?: Navigation[]): boolean {
    if (!nav) return false;

    return nav.some((n) => {
      if (!n.children) {
        const isActive = n.exactMatch
          ? router.pathname === n.href
          : router.pathname.startsWith(n.href);

        return isActive;
      }

      return checkActive(n.children);
    });
  }

  return (
    <Disclosure as="div" defaultOpen={checkActive(navChildren.children)}>
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={clsx(
              "hover:bg-orange-300/40",
              "text-typo-secondary",
              "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium",
              "focus-visible:ring-offset-secondary-500 focus:outline-none focus-visible:ring-2  focus-visible:ring-green-500"
            )}
          >
            <navChildren.icon
              className={clsx(
                "mr-1.5 flex-shrink-0",
                "text-typo-secondary text-lg",
                open && "mt-[1px] self-start"
              )}
              aria-hidden="true"
            />
            <span className={clsx("text-left", !open && "truncate")}>
              {navChildren.name}
            </span>
            <FiChevronDown
              className={clsx(
                "flex-shrink-0",
                "text-typo-icons ml-auto text-lg",
                open && "mt-[1px] rotate-180 self-start"
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="ml-5 mt-0.5">
            {navChildren.children?.map((nav) =>
              nav.children ? (
                <NestedNavigation key={nav.name} navigation={nav} />
              ) : (
                <NavigationLink key={nav.name} navigation={nav} />
              )
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function NavigationLink({
  navigation,
  className,
}: {
  navigation: Navigation;
  className?: string;
}) {
  const router = useRouter();
  const isActive = navigation.exactMatch
    ? router.pathname === navigation.href
    : router.pathname.startsWith(navigation.href);

  // check if user has permission to access the route
  const user = useAuthStore.useUser();
  const hasPermission = navigation.permissions
    ? navigation.permissions?.some((p) => user?.permissions.includes(p))
    : true;

  if (!hasPermission) return null;

  return (
    <UnstyledLink
      href={navigation.href}
      className={clsxm(
        isActive ? "bg-orange-500 text-neutral-100" : "hover:bg-orange-500/40",
        "group my-0.5 flex items-center rounded-md px-2 py-4 text-sm font-medium",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <navigation.icon
        className={clsx("mr-1.5 flex-shrink-0", "text-typo-secondary text-lg")}
        aria-hidden="true"
      />
      <span className="truncate">{navigation.name}</span>
    </UnstyledLink>
  );
}
