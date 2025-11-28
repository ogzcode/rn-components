import React from 'react'
import { Check } from 'lucide-react-native'
import * as CheckboxPrimitive from '@rn-primitives/checkbox'
import { useTheme } from '../theme/ThemeProvider'

type Props = {
    checked?: boolean
    onChange?: (v: boolean) => void
    style?: any
    disabled?: boolean
    severity?: 'default' | 'info' | 'success' | 'warning' | 'error'
}

const CHECKED_CLASSES: Record<NonNullable<Props['severity']>, string> = {
    default: 'bg-gray-700 border-gray-700',
    info: 'bg-blue-500 border-blue-500',
    success: 'bg-green-500 border-green-500',
    warning: 'bg-amber-500 border-amber-500',
    error: 'bg-red-500 border-red-500'
}

export const Checkbox: React.FC<Props> = ({
    checked = false,
    onChange = () => {},
    style = {},
    disabled = false,
    severity = 'default'
}) => {
    const { isDark } = useTheme()

    const base = 'w-6 h-6 rounded-sm flex items-center justify-center'

    let className = ''
    if (disabled) {
        className = `${base} border border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-600 opacity-60`
    } else if (checked) {
        className = `${base} ${CHECKED_CLASSES[severity]} border ${CHECKED_CLASSES[severity].split(' ')[1]}`
    } else {
        className = `${base} border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700`
    }

    // allow passing additional style via `style` prop
    return (
        <CheckboxPrimitive.Root
            className={className}
            style={style}
            checked={checked}
            onCheckedChange={(v: any) => onChange(Boolean(v))}
            disabled={disabled}
        >
            <CheckboxPrimitive.Indicator className="items-center justify-center">
                {checked && <Check size={16} color="#FFFFFF" />}
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
}

export default Checkbox