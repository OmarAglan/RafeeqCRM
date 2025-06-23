import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const headerBg = useThemeColor({}, 'background');
  const headerTint = useThemeColor({}, 'text');

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: headerTint,
        drawerActiveTintColor: Colors[colorScheme].tint,
        drawerInactiveTintColor: Colors[colorScheme].icon,
        drawerStyle: {
          backgroundColor: headerBg,
        },
        // This adds the "hamburger" menu button to open the drawer
        headerLeft: () => <DrawerToggleButton tintColor={headerTint} />,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
        }}
      />
    </Drawer>
  );
}