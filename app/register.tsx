import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../services/auth';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo válido');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Contraseña muy corta', 'Debe tener al menos 8 caracteres');
      return;
    }

    try {
      await auth.register(email, password);
      Alert.alert('Registro exitoso', 'Ya puedes iniciar sesión');
      router.back();
    } catch (error) {
      Alert.alert('Error al registrar', 'No se pudo crear la cuenta');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.centeredSection}>
        <Text style={styles.title}>Registro</Text>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'space-between' },
  centeredSection: { alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginVertical: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9'
  },
  button: {
    backgroundColor: '#03a9f4',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  linkText: { marginTop: 20, color: '#03a9f4', textAlign: 'center' },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'flex-end'
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    bottom: 12
  }
});