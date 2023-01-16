import * as React from "react";

import Logo from "@/components/Logo";
import Navigation from "@/layouts/dashboard/Navigation";
import UserAction from "@/layouts/dashboard/UserAction";

export default function DesktopNavigation() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:bg-background-liteCream lg:pt-5 lg:pb-4">
      <div className="flex flex-shrink-0 items-center gap-2 px-6">
        <Logo />
      </div>

      {/* Sidebar component */}
      <div className="mt-6 flex h-0 flex-1 flex-col overflow-y-auto">
        <UserAction />

        {/* Navigation */}
        <Navigation className="mt-6" />
      </div>
    </div>
  );
}
