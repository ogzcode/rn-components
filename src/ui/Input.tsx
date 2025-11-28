import { TextInput, TextInputProps } from "react-native";
import { useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { useColorScheme } from "nativewind";

type InputProps = Omit<TextInputProps, 'className'> & {
    className?: string;
};

export const Input = ({ className, placeholderTextColor, ...props }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const { isDark } = useTheme();

    const inputClassName = [
        'h-12 rounded-md border border-gray-300 dark:border-slate-600 px-3 text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
        isFocused ? 'border-blue-500 dark:border-blue-400' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <TextInput
            cursorColor={isDark ? '#60A5FA' : '#3B82F6'}
            placeholderTextColor={placeholderTextColor || (isDark ? '#9CA3AF' : '#6B7280')}
            className={inputClassName}
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
}