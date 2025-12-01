import React from 'react';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { Text, TouchableOpacity, View, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  title?: string
  description?: string
  triggerLabel?: string
  onSubmit?: () => void
  children?: React.ReactNode
}

const Dialog: React.FC<Props> = ({
  title = 'Dialog Title',
  description = 'Dialog description.',
  triggerLabel = 'Show Dialog',
  onSubmit = () => {},
  children,
}) => {
  const { isDark } = useTheme()

  const contentBg = isDark ? 'bg-gray-800' : 'bg-white'
  const titleText = isDark ? 'text-gray-100' : 'text-gray-900'
  const descText = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <TouchableOpacity className="px-3 py-2">
          <Text className="text-blue-500 text-base">{triggerLabel}</Text>
        </TouchableOpacity>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay asChild>
          <View className="absolute inset-0 justify-center items-center">
            <DialogPrimitive.Close asChild>
              <Pressable className="absolute inset-0 bg-black/50" />
            </DialogPrimitive.Close>

            <DialogPrimitive.Content asChild>
              <View className={`w-4/5 rounded-lg p-5 shadow-lg ${contentBg}`}> 
                <DialogPrimitive.Title asChild>
                  <Text className={`text-lg font-semibold mb-2 ${titleText}`}>{title}</Text>
                </DialogPrimitive.Title>

                <DialogPrimitive.Description asChild>
                  <Text className={`mb-4 ${descText}`}>{description}</Text>
                </DialogPrimitive.Description>

                <View className="mb-4">{children}</View>

                <View className="flex-row justify-end">
                  <DialogPrimitive.Close asChild>
                    <TouchableOpacity
                      onPress={onSubmit}
                      className="bg-blue-600 px-4 py-2 rounded-md shadow-sm"
                    >
                      <Text className="text-white font-semibold">Submit</Text>
                    </TouchableOpacity>
                  </DialogPrimitive.Close>
                </View>
              </View>
            </DialogPrimitive.Content>
          </View>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export default Dialog
