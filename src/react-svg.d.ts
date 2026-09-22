import "react";

declare module "react" {
  interface SVGProps<T> {
    transformOrigin?: string;
  }
}
