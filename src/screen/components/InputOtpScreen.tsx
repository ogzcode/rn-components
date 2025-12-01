import React, { useState } from 'react'
import { View, Text } from 'react-native'
import OTPInput from '../../ui/InputOtp'
import { useTheme } from '../../theme/ThemeProvider'

const InputOtpScreen: React.FC = () => {
  const { theme, isDark, setTheme } = useTheme()
  const [otp4, setOtp4] = useState<string>('')
  const [otp6, setOtp6] = useState<string>('')
  const [prefilled, setPrefilled] = useState<string>('1234')

  return (
    <View className={`flex-1 p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="flex-row justify-between items-center mb-6">
        <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>OTP Input Examples</Text>
        <Text
          onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-sm text-blue-500"
        >
          Toggle {isDark ? 'Light' : 'Dark'}
        </Text>
      </View>

      <View className="mb-6">
        <Text className={`${isDark ? 'text-gray-100' : 'text-gray-700'} mb-2`}>4-digit OTP (default)</Text>
        <OTPInput value={otp4} onChange={setOtp4} length={4} />
        <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}>Value: {otp4}</Text>
      </View>

      <View className="mb-6">
        <Text className={`${isDark ? 'text-gray-100' : 'text-gray-700'} mb-2`}>6-digit OTP</Text>
        <OTPInput value={otp6} onChange={setOtp6} length={6} />
        <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}>Value: {otp6}</Text>
      </View>

      <View className="mb-6">
        <Text className={`${isDark ? 'text-gray-100' : 'text-gray-700'} mb-2`}>Prefilled example</Text>
        <OTPInput value={prefilled} onChange={setPrefilled} length={4} />
        <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}>Value: {prefilled}</Text>
      </View>

      <View className="mt-4">
        <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Notes:</Text>
        <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Auto-focus, delete behavior and navigation between inputs work as before. Use the Toggle to check dark/light appearance.</Text>
      </View>
    </View>
  )
}

export default InputOtpScreen
