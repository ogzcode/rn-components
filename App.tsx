import { StatusBar } from 'expo-status-bar';
import { NavContainer } from 'src/navigation/NavContainer';
import ThemeProvider from '@/theme/ThemeProvider';
import './global.css';
import { PortalHost } from '@rn-primitives/portal';

export default function App() {
  return (
    <ThemeProvider>
      <NavContainer />
      <PortalHost />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
