import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import useWave from "../wave/useWave";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "relative rounded-md font-medium cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-7",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-theme-4 to-theme-5 text-white border-none hover:opacity-50",
        default:
          "border bg-transparent border-gray-5/100 border-solid hover:border-theme-5 hover:text-theme-5 hover:opacity-50",
        dashed: "border bg-transparent border-dashed hover:opacity-50",
        ghost: "bg-transparent hover:bg-gray-5 hover:opacity-100 border-none",
        link: "text-theme-6 bg-transparent underline-offset-4 hover:underline border-none hover:opacity-50",
      },
      size: {
        default: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const showWave = useWave(buttonRef, "wave-effect");

  return (
    <button
      {...props}
      ref={buttonRef}
      className={cn(buttonVariants({ variant, size }), className)}
      type="button"
      onClick={(e) => {
        showWave();
        props.onClick?.(e);
      }}
    />
  );
};

export { Button, buttonVariants };
