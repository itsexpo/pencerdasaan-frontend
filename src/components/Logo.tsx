import * as React from "react";

import NextImage from "@/components/NextImage";
import clsxm from "@/lib/clsxm";

type LogoProps = { className?: string };

export default function Logo({ className }: LogoProps) {
  return (
    <NextImage
      className={clsxm("w-44 md:w-72", className)}
      src="/images/ilits-logo.png"
      width="100"
      height="40"
      alt="logo"
    />
  );
}
