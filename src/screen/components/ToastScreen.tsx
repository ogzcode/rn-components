import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useToast } from '../../ui/toast/useToast'
import { useTheme } from '../../theme/ThemeProvider'

const Button: React.FC<{ onPress: () => void; label: string }> = ({ onPress, label }) => (
  <TouchableOpacity onPress={onPress} className="w-full mb-3 py-3 rounded-md bg-blue-600">
    <Text className="text-center text-white font-medium">{label}</Text>
  </TouchableOpacity>
)

const ToastScreen: React.FC = () => {
  const { showToast } = useToast()
  const { theme, isDark, setTheme } = useTheme()

  return (
    <View className={`flex-1 p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="flex-row justify-between items-center mb-6">
        <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>Toast Examples</Text>
        <Text onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-sm text-blue-400">Toggle {isDark ? 'Light' : 'Dark'}</Text>
      </View>

      <Button onPress={() => showToast('Bilgilendirme mesajı', 'info', 3000)} label="Show Info Toast" />
      <Button onPress={() => showToast('Başarı ile tamamlandı!', 'success', 3000)} label="Show Success Toast" />
      <Button onPress={() => showToast('Bir hata veya uyarı oluştu', 'warning', 4000)} label="Show Warning Toast" />

      <Button
        onPress={() =>
          showToast(
            'Bu uzun bir mesaj örneğidir. Kullanıcıya daha fazla bilgi iletilmesi gerektiğinde böyle bir toast gösterilebilir.',
            'info',
            5000
          )
        }
        label="Show Long Toast"
      />

      <View className="mt-6">
        <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Tip: useToast hook'unu kullanarak herhangi bir yerden toast tetikleyebilirsiniz.</Text>
      </View>
    </View>
  )
}

export default ToastScreen
