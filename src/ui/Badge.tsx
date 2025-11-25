import React from "react";
import { FC } from "react";
import { View, Text } from "react-native";

interface BadgeProps {
    children?: React.ReactNode;
    label?: string;
    variant?: "default" | "info" | "success" | "danger" | "warning";
    className?: string;
    style?: any;
    outline?: boolean;
}

export const Badge: FC<BadgeProps> = ({ children, label, variant = "default", className = "", style, outline = false }) => {
    const base = "rounded-full px-2 py-1 items-center justify-center";

    const variants: Record<string, string> = {
        default: "bg-blue-500 dark:bg-blue-600",
        info: "bg-purple-500 dark:bg-purple-600",
        success: "bg-teal-500 dark:bg-teal-600",
        danger: "bg-red-500 dark:bg-red-600",
        warning: "bg-orange-500 dark:bg-orange-600"
    };

    const outlineVariants: Record<string, string> = {
        default: "bg-transparent border-2 border-blue-500 dark:border-blue-400",
        info: "bg-transparent border-2 border-purple-500 dark:border-purple-400",
        success: "bg-transparent border-2 border-teal-500 dark:border-teal-400",
        danger: "bg-transparent border-2 border-red-500 dark:border-red-400",
        warning: "bg-transparent border-2 border-orange-500 dark:border-orange-400"
    };

    const textVariants: Record<string, string> = {
        default: "text-white dark:text-white",
        info: "text-white dark:text-white",
        success: "text-white dark:text-white",
        danger: "text-white dark:text-white",
        warning: "text-black dark:text-black"
    };

    const outlineTextVariants: Record<string, string> = {
        default: "text-blue-500 dark:text-blue-400",
        info: "text-purple-500 dark:text-purple-400",
        success: "text-teal-500 dark:text-teal-400",
        danger: "text-red-500 dark:text-red-400",
        warning: "text-orange-500 dark:text-orange-400"
    };

    const chosenVariant = outline ? (outlineVariants[variant] ?? outlineVariants.default) : (variants[variant] ?? variants.default);
    const chosenText = outline ? (outlineTextVariants[variant] ?? outlineTextVariants.default) : (textVariants[variant] ?? textVariants.default);
    const classes = `${base} ${chosenVariant} ${className}`.trim();

    return (
        <View className={classes} style={style}>
            {label ? (
                <Text className={`text-xs font-medium ${chosenText}`}>{label}</Text>
            ) : (
                children
            )}
        </View>
    );
};

export default Badge;
