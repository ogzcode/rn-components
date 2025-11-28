import React, { useState } from 'react';
import { TextInput, TextInputProps, StyleProp, TextStyle } from 'react-native';

interface TextareaProps extends TextInputProps {
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

export const Textarea = ({ multiline = true, numberOfLines = 4, style, ...props }: TextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const base = 'rounded-md p-3 text-base border';
  const focusBorder = isFocused ? 'border-gray-600' : 'border-gray-300';
  const bg = 'bg-white dark:bg-gray-800';
  const text = 'text-gray-800 dark:text-gray-100';

  return (
    <TextInput
      cursorColor="#1f2937"
      className={`${base} ${focusBorder} ${bg} ${text}`}
      {...props}
      multiline={multiline}
      textAlignVertical="top"
      numberOfLines={numberOfLines}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={style}
    />
  );
};

export default Textarea;