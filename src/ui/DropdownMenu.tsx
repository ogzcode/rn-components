import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu'
import * as React from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '../theme/ThemeProvider'

type BaseItem = {
  key: string
  type?: 'item' | 'separator' | 'label' | 'submenu'
  label?: React.ReactNode
  disabled?: boolean
  // item action
  onPress?: () => void
}

type SubmenuItem = BaseItem & { type: 'submenu'; items: DropdownItem[] }
type SimpleItem = BaseItem & { type?: 'item' }

type DropdownItem = SimpleItem | SubmenuItem | BaseItem

type Props = {
  trigger?: React.ReactNode
  items?: DropdownItem[]
  contentClassName?: string
  side?: 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  alignOffset?: number
}

export default function DropdownMenu({ trigger, items, contentClassName = '', side, align, sideOffset, alignOffset }: Props) {
  const { isDark } = useTheme()

  const contentBg = isDark ? 'bg-gray-800' : 'bg-white'
  const contentText = isDark ? 'text-gray-100' : 'text-gray-900'

  // default demo items when none provided - preserves previous behavior
  const demoItems: DropdownItem[] = React.useMemo(() => [
    { key: 'back', label: 'Back' },
    { key: 'forward', label: 'Forward' },
    { key: 'reload', label: 'Reload' },
    { key: 'sep1', type: 'separator' },
    { key: 'submenu', type: 'submenu', label: 'More Tools', items: [
      { key: 'save', label: 'Save Page As...' },
      { key: 'shortcut', label: 'Create Shortcut...' },
      { key: 'sep2', type: 'separator' },
      { key: 'devtools', label: 'Developer Tools' }
    ] },
    { key: 'sep3', type: 'separator' },
    { key: 'label-people', type: 'label', label: 'People' },
    { key: 'radio-pedro', label: 'Elmer Fudd' },
    { key: 'radio-colm', label: 'Foghorn Leghorn' }
  ], [])

  const list = items && items.length ? items : demoItems

  const renderItem = (it: DropdownItem) => {
    if (it.type === 'separator') return <DropdownMenuPrimitive.Separator key={it.key} className="h-px bg-gray-200 my-2" />
    if (it.type === 'label') return <DropdownMenuPrimitive.Label key={it.key} className={`font-bold text-sm my-2 ${contentText}`}>{it.label}</DropdownMenuPrimitive.Label>

    if (it.type === 'submenu') {
      const sub = it as SubmenuItem
      return (
        <DropdownMenuPrimitive.Sub key={it.key}>
          <DropdownMenuPrimitive.SubTrigger className={`flex-row items-center px-4 py-2 bg-gray-50 dark:bg-gray-700 ${contentText}`}>
            <Text>{it.label}</Text>
          </DropdownMenuPrimitive.SubTrigger>
          <DropdownMenuPrimitive.SubContent className={`absolute left-full top-0 p-2 rounded-md shadow-md ${contentBg}`}>
            {sub.items.map(si => renderItem(si))}
          </DropdownMenuPrimitive.SubContent>
        </DropdownMenuPrimitive.Sub>
      )
    }

    // default item
    return (
      <DropdownMenuPrimitive.Item key={it.key} onPress={it.onPress} className={`flex-row items-center px-4 py-2 ${contentText}`}>
        <Text>{it.label}</Text>
      </DropdownMenuPrimitive.Item>
    )
  }

  return (
    <DropdownMenuPrimitive.Root>
      {trigger ? (
        // when using a custom trigger element, pass it as a child so the primitive
        // will attach press handlers correctly
        <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      ) : (
        <DropdownMenuPrimitive.Trigger className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md items-center justify-center">
          <Text className="text-sm">Open Dropdown Menu</Text>
        </DropdownMenuPrimitive.Trigger>
      )}

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Overlay className="absolute inset-0 bg-black/50">
          <DropdownMenuPrimitive.Content
            className={`p-2 rounded-md shadow-md ${contentBg} ${contentClassName}`}
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
          >
            {list.map(renderItem)}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Overlay>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
