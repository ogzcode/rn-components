import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Input } from '../../ui/Input';
import { useTheme } from '../../theme/ThemeProvider';

export const InputScreen = () => {
    const { isDark } = useTheme();
    const [basicInput, setBasicInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [numberInput, setNumberInput] = useState('');

    const containerBg = isDark ? '#111827' : '#FFFFFF';
    const textColor = isDark ? '#F3F4F6' : '#1F2937';
    const labelColor = isDark ? '#D1D5DB' : '#4B5563';
    const dividerColor = isDark ? '#374151' : '#E5E7EB';

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: containerBg,
            }}
            contentContainerStyle={{
                padding: 20,
                gap: 24,
            }}
        >
            <View>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: textColor,
                        marginBottom: 8,
                    }}
                >
                    Input Component
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: labelColor,
                    }}
                >
                    NativeWind ile geliştirilmiş, dark/light mode destekli input bileşeni
                </Text>
            </View>

            {/* Basic Input */}
            <View style={{ gap: 8 }}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: textColor,
                    }}
                >
                    Temel Input
                </Text>
                <Input
                    placeholder="İsminizi girin..."
                    value={basicInput}
                    onChangeText={setBasicInput}
                />
            </View>

            {/* Email Input */}
            <View style={{ gap: 8 }}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: textColor,
                    }}
                >
                    Email Input
                </Text>
                <Input
                    placeholder="E-posta adresiniz..."
                    value={emailInput}
                    onChangeText={setEmailInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* Phone Input */}
            <View style={{ gap: 8 }}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: textColor,
                    }}
                >
                    Telefon Input
                </Text>
                <Input
                    placeholder="+90 (555) 123 4567"
                    value={phoneInput}
                    onChangeText={setPhoneInput}
                    keyboardType="phone-pad"
                />
            </View>

            {/* Password Input */}
            <View style={{ gap: 8 }}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: textColor,
                    }}
                >
                    Şifre Input
                </Text>
                <Input
                    placeholder="Şifrenizi girin..."
                    value={passwordInput}
                    onChangeText={setPasswordInput}
                    secureTextEntry
                />
            </View>

            {/* Number Input */}
            <View style={{ gap: 8 }}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: textColor,
                    }}
                >
                    Sayı Input
                </Text>
                <Input
                    placeholder="0"
                    value={numberInput}
                    onChangeText={setNumberInput}
                    keyboardType="numeric"
                />
            </View>

            {/* Disabled Input */}
            <View style={{ gap: 8 }}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: textColor,
                    }}
                >
                    Devre Dışı Input
                </Text>
                <Input
                    placeholder="Bu alan devre dışı"
                    editable={false}
                    value="Düzenlenemiyor"
                    style={{
                        opacity: 0.6,
                    }}
                />
            </View>

            {/* Display Values */}
            <View
                style={{
                    borderTopWidth: 1,
                    borderTopColor: dividerColor,
                    paddingTop: 16,
                    gap: 8,
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: textColor,
                    }}
                >
                    Girilen Değerler
                </Text>
                <View
                    style={{
                        backgroundColor: isDark ? '#1F2937' : '#F9FAFB',
                        borderRadius: 6,
                        padding: 12,
                        gap: 8,
                    }}
                >
                    <Text style={{ color: labelColor, fontSize: 12 }}>
                        İsim: {basicInput || '-'}
                    </Text>
                    <Text style={{ color: labelColor, fontSize: 12 }}>
                        Email: {emailInput || '-'}
                    </Text>
                    <Text style={{ color: labelColor, fontSize: 12 }}>
                        Telefon: {phoneInput || '-'}
                    </Text>
                    <Text style={{ color: labelColor, fontSize: 12 }}>
                        Şifre: {passwordInput ? '•'.repeat(passwordInput.length) : '-'}
                    </Text>
                    <Text style={{ color: labelColor, fontSize: 12 }}>
                        Sayı: {numberInput || '-'}
                    </Text>
                </View>
            </View>

            {/* Usage Example Code */}
            <View
                style={{
                    backgroundColor: isDark ? '#1F2937' : '#F9FAFB',
                    borderRadius: 6,
                    padding: 12,
                    gap: 8,
                }}
            >
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#3B82F6',
                    }}
                >
                    Kullanım Örneği
                </Text>
                <Text
                    style={{
                        fontSize: 11,
                        color: labelColor,
                        fontFamily: 'monospace',
                        lineHeight: 16,
                    }}
                >
{`import { Input } from '@/ui/Input';
import { useState } from 'react';

export const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      placeholder="Yazın..."
      value={value}
      onChangeText={setValue}
      keyboardType="email-address"
    />
  );
};`}
                </Text>
            </View>

            <View style={{ height: 20 }} />
        </ScrollView>
    );
};
