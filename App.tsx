import { StatusBar } from 'expo-status-bar';
import { NavContainer } from 'src/navigation/NavContainer';
import ThemeProvider from '@/theme/ThemeProvider';
import './global.css';
import { PortalHost } from '@rn-primitives/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '@/ui/toast/useToast';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ThemeProvider>
        <ToastProvider>
          <NavContainer />
        </ToastProvider>
        <PortalHost />
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
