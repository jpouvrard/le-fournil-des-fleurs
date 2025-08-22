import type { IconProps } from "@/lib/types";

const CheckIcon: React.FC<IconProps> = ({ type = "default" }) => {
    const colorVariants = {
        default: "text-gray-400",
        success: "text-green-400",
        danger: "text-red-400",
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-6 ${colorVariants[type]}`}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
    );
};

export default CheckIcon;
