import React from 'react';
import { View, Image, Text, StyleProp, ViewStyle } from 'react-native';

type AvatarProps = {
    imageURI?: string | null;
    alt?: string;
    fallback?: string;
    /**
     * Either a nativewind tailwind background class (e.g. 'bg-red-500')
     * or a hex color string (e.g. '#f3f4f6').
     */
    fallbackColor?: string;
    /** Size in pixels. Defaults to 48. */
    size?: number;
    /** Extra tailwind classes for the root container. */
    className?: string;
    style?: StyleProp<ViewStyle>;
};

export const Avatar: React.FC<AvatarProps> = ({
    imageURI,
    alt = '',
    fallback = '',
    fallbackColor,
    size = 48,
    className,
    style,
}) => {
    const getInitials = () => {
        if (fallback) return fallback;
        if (!alt) return 'AV';
        const parts = alt.trim().split(/\s+/);
        const initials = parts.map(p => p[0]).join('').slice(0, 2).toUpperCase();
        return initials || 'AV';
    };

    const initials = getInitials();

    // If fallbackColor is a hex (starts with '#'), use inline style.
    const fallbackInlineStyle: StyleProp<ViewStyle> | undefined =
        fallbackColor && fallbackColor.startsWith('#') ? { backgroundColor: fallbackColor } : undefined;

    // If fallbackColor is a tailwind class (e.g. 'bg-gray-200'), include it in className.
    // If none provided, use a sensible default that supports dark mode.
    const fallbackClassName = fallbackColor && !fallbackColor.startsWith('#') ? fallbackColor : 'bg-gray-200 dark:bg-gray-700';

    return (
        <View
            style={[{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }, style]}
            className={`relative flex-none ${className ?? ''}`}
            accessibilityLabel={alt}
        >
            {imageURI ? (
                <Image
                    source={{ uri: imageURI }}
                    style={{ width: '100%', height: '100%', aspectRatio: 1 }}
                    resizeMode="cover"
                />
                ) : (
                <View style={fallbackInlineStyle} className={`flex-1 items-center justify-center rounded-full ${fallbackClassName}`}>
                    <Text className="text-sm font-medium text-gray-700 dark:text-white">{initials}</Text>
                </View>
            )}
        </View>
    );
};