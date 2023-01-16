import * as React from "react";
import { IconType } from "react-icons";

import UnstyledLink, {
  UnstyledLinkProps,
} from "@/components/links/UnstyledLink";
import clsxm from "@/lib/clsxm";

enum ButtonSize {
  "sm",
  "base",
}

enum ButtonVariant {
  "primary",
}

type ButtonLinkProps = {
  size?: keyof typeof ButtonSize;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
  variant?: keyof typeof ButtonVariant;
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "base",
      leftIconClassName,
      rightIconClassName,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      ...rest
    },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          "inline-flex items-center justify-center rounded-lg",
          "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
          "transition-colors duration-75",
          //#region  //*=========== Size ===========
          [
            size === "base" && [
              "min-h-[34px] py-1.5 px-2.5 font-bold md:min-h-[42px] md:py-2 md:px-3",
              "text-sm md:text-base",
            ],
            size === "sm" && [
              "min-h-[30px] py-1 px-1.5 font-semibold md:min-h-[34px] md:py-1.5 md:px-2",
              "text-xs md:text-sm",
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === "primary" && [
              "bg-blue-400 text-white",
              "hover:bg-primary-600",
              "active:bg-primary-700",
              "shadow-p-100 hover:shadow-p-200",
            ],
          ],
          //#endregion  //*======== Variants ===========
          className
        )}
      >
        {/* Left Icon */}
        {LeftIcon && (
          <div className="mr-1">
            <LeftIcon className={clsxm(leftIconClassName)} />
          </div>
        )}
        {children}
        {RightIcon && (
          <div className="ml-1">
            <RightIcon className={clsxm(rightIconClassName)} />
          </div>
        )}
      </UnstyledLink>
    );
  }
);

export default ButtonLink;
