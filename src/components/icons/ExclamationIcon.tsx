import type { IconProps } from "@/lib/types";

const ExclamationIcon: React.FC<IconProps> = ({ type = "default" }) => {
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
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 ${colorVariants[type]}`}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
        </svg>
    );
};

export default ExclamationIcon;
