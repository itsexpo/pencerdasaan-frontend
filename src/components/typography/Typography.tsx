import * as React from "react";

import clsxm from "@/lib/clsxm";

enum TypographyVariant {
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "s1",
  "s2",
  "s3",
  "s4",
  "b1",
  "b2",
  "b3",
  "c1",
  "c2",
  "l1",
  "l2",
}

enum TypographyColor {
  "primary",
  "secondary",
  "tertiary",
  "danger",
}

type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  className?: string;
  color?: keyof typeof TypographyColor;
  /**
   * | Variant | Size Class | Font Size | Font Weight |
   * | :------ | :--------- | :-------- | :---------- |
   * | h1      | text-2xl   | 24px      | 600         |
   * | h2      | text-xl    | 20px      | 600         |
   * | h3      | text-lg    | 18px      | 600         |
   * | h4      | text-base  | 16px      | 700         |
   * | h5      | text-base  | 16px      | 600         |
   * | h6      | text-sm    | 14px      | 600         |
   * | s1      | text-lg    | 18px      | 500         |
   * | s2      | text-base  | 16px      | 500         |
   * | s3      | text-sm    | 14px      | 500         |
   * | s4      | text-xs    | 12px      | 500         |
   * | b1      | text-lg    | 18px      | 400         |
   * | b2      | text-base  | 16px      | 400         |
   * | b3      | text-xs    | 14px      | 400         |
   * | c1      | text-xs    | 12px      | 400         |
   * | c2      | -          | 11px      | 400         |
   */
  variant: keyof typeof TypographyVariant;
  children: React.ReactNode;
} & React.ComponentProps<T>;

export default function Typography<T extends React.ElementType>({
  as,
  children,
  className,
  color = "primary",
  variant,
  ...rest
}: TypographyProps<T>) {
  const Component = as || "p";
  return (
    <Component
      className={clsxm(
        //#region  //*=========== Variants ===========
        [
          variant === "h1" && ["text-2xl font-semibold"],
          variant === "h2" && ["text-xl font-semibold"],
          variant === "h3" && ["text-lg font-semibold"],
          variant === "h4" && ["text-base font-bold"],
          variant === "h5" && ["text-base font-semibold"],
          variant === "h6" && ["text-sm font-semibold"],
          variant === "s1" && ["text-lg font-medium"],
          variant === "s2" && ["text-base font-medium"],
          variant === "s3" && ["text-sm font-medium"],
          variant === "s4" && ["text-xs font-medium"],
          variant === "b1" && ["text-lg"],
          variant === "b2" && ["text-base"],
          variant === "b3" && ["text-sm font-normal"],
          variant === "c1" && ["text-xs"],
          variant === "c2" && ["text-[11px] leading-[14px]"],
        ],
        //#endregion  //*======== Variants ===========
        //#region  //*=========== Color ===========
        [
          color === "primary" && ["text-typo"],
          color === "secondary" && ["text-typo-secondary"],
          color === "tertiary" && ["text-typo-tertiary"],
          color === "danger" && ["text-danger-400"],
        ],
        //#endregion  //*======== Color ===========
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
