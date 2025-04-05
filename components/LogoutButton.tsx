// components/LogoutButton.tsx
import { auth } from '../services/auth';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.logout();
    router.replace('/login');
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
      <MaterialIcons name="logout" size={24} color="black" />
    </TouchableOpacity>
  );
}