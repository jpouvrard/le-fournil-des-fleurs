import type { SVGProps } from "react";

export type IconProps = {
    type?: "default" | "success" | "danger";
} & Omit<SVGProps<SVGElement>, "type">;
