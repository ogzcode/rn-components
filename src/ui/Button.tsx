import React from 'react'
import { Pressable, Text, View, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '../theme/ThemeProvider'

interface ButtonProps {
    label: string
    variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning'
    outline?: boolean
    style?: StyleProp<ViewStyle>
    icon?: React.ReactNode
    onPress?: () => void
}

const VARIANT_MAP: Record<NonNullable<ButtonProps['variant']>, { bg: string; border: string; text: string; textDark: string }> = {
    default: { bg: 'bg-gray-400', border: 'border-gray-400', text: 'text-gray-700', textDark: 'text-gray-200' },
    primary: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-600', textDark: 'text-blue-300' },
    success: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-600', textDark: 'text-green-300' },
    danger: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-600', textDark: 'text-red-300' },
    warning: { bg: 'bg-amber-500', border: 'border-amber-500', text: 'text-amber-600', textDark: 'text-amber-300' }
}

export const Button = React.forwardRef<View, ButtonProps>(({
    label,
    variant = 'default',
    outline = true,
    style,
    icon = null,
    onPress
}, ref) => {
    const { isDark } = useTheme()

    const v = VARIANT_MAP[variant]

    // base classes support both outline and solid variants
    const base = 'rounded-md px-3 py-2 flex-row items-center justify-center'

    const outlineClasses = `border ${v.border} ` + (isDark ? '' : '')
    const textColorOutline = isDark ? v.textDark : v.text

    const solidClasses = `${v.bg}`

    const pressableClass = outline ? `${base} border ${v.border} bg-transparent` : `${base} ${solidClasses}`
    const textClass = outline ? `${textColorOutline} text-sm font-medium` : `text-white text-sm font-medium`

    return (
        <Pressable ref={ref} className={pressableClass} style={style as any} onPress={onPress}>
            {icon ? <View className="mr-2">{icon}</View> : null}
            <Text className={textClass}>{label}</Text>
        </Pressable>
    )
})

Button.displayName = 'Button'

export default Button