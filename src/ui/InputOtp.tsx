import React, { useRef, useEffect, useMemo, useState } from 'react';
import { View, TextInput, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;
  containerStyle?: object;
  inputStyle?: object;
}

const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  length,
  containerStyle,
  inputStyle,
}) => {
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const { isDark } = useTheme();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Parse string value to array for internal use
  const otp = useMemo(() => {
    const arr = value.split('');
    while (arr.length < length) arr.push('');
    return arr.slice(0, length);
  }, [value, length]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus();
    }
  }, []);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    if (text.length === 1) {
      newOtp[index] = text;
      onChange(newOtp.join(''));
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (text === '') {
      newOtp[index] = '';
      onChange(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      // Clear current input
      newOtp[index] = '';
      onChange(newOtp.join(''));
      
      // Move to previous input if exists
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const containerClass = 'flex-row justify-between w-4/5 my-6';
  const baseInputClass = 'w-12 h-12 text-lg rounded-lg transition-all duration-300';
  
  const getInputClasses = (index: number) => {
    const isFocused = focusedIndex === index;
    const hasValue = otp[index] !== '';
    
    if (isDark) {
      const border = isFocused ? 'border-2 border-blue-400' : hasValue ? 'border-2 border-gray-600' : 'border-2 border-gray-700';
      const bg = isFocused ? 'bg-gray-700' : 'bg-gray-800';
      return `${border} ${bg} text-gray-100`;
    } else {
      const border = isFocused ? 'border-2 border-blue-500' : hasValue ? 'border-2 border-gray-400' : 'border-2 border-gray-200';
      const bg = isFocused ? 'bg-blue-50' : 'bg-white';
      return `${border} ${bg} text-gray-900`;
    }
  };

  return (
    <View className={containerClass} style={containerStyle}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputsRef.current[index] = ref }}
          className={`${baseInputClass} ${getInputClasses(index)}`}
          style={[
            { 
              textAlign: 'center',
              textAlignVertical: 'center',
              paddingHorizontal: 0,
              paddingVertical: 0,
              margin: 0,
              includeFontPadding: false,
              lineHeight: 48
            },
            inputStyle
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={value}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          autoFocus={index === 0}
          placeholder=""
          placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
        />
      ))}
    </View>
  );
};

export default OTPInput;
