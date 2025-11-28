import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Keyboard,
  Alert,
  SafeAreaView,
  StatusBar,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

   const fetchWeather = async () => {
    if (!city.trim()) {
      Alert.alert('Atenção', 'Por favor, digite o nome de um local válido.');
      return;
    }

    setLoading(true);
    setWeather(null);
    Keyboard.dismiss();

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('Cidade não encontrada.');
      }

      const { latitude, longitude, name, admin1, country } = geoData.results[0];

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      setWeather({
        name: name,
        region: admin1 || country,
        temp: weatherData.current_weather.temperature,
        weatherCode: weatherData.current_weather.weathercode,
      });

    } catch (error) {
      Alert.alert('Ops!', error.message || 'Erro ao buscar previsão.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherInfo = (code) => {
    if (code === 0) return { label: 'Céu Limpo', icon: 'sunny', color: '#FFD700', bg: ['#4facfe', '#00f2fe'] };
    if (code >= 1 && code <= 3) return { label: 'Nublado', icon: 'partly-sunny', color: '#FFF', bg: ['#bdc3c7', '#2c3e50'] };
    if (code >= 45 && code <= 48) return { label: 'Nevoeiro', icon: 'cloud', color: '#EEE', bg: ['#757F9A', '#D7DDE8'] };
    if (code >= 51 && code <= 67) return { label: 'Chuva', icon: 'rainy', color: '#FFF', bg: ['#3a7bd5', '#3a6073'] };
    if (code >= 80 && code <= 99) return { label: 'Tempestade', icon: 'thunderstorm', color: '#FFF', bg: ['#141E30', '#243B55'] };
    return { label: 'Variável', icon: 'cloud-outline', color: '#FFF', bg: ['#2193b0', '#6dd5ed'] };
  };

  const currentBg = weather ? getWeatherInfo(weather.weatherCode).bg : ['#aabbe0ff', '#597070ff', '#574668ff'];

  return (
    <LinearGradient colors={currentBg} style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.appTitle, {fontFamily: 'monospace'}]}>Climaricá</Text>
          <Text style={[styles.appSubtitle, {fontFamily: 'monospace'}]}>Previsão do Tempo</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.inputWrapper}>
            <Ionicons name="location-outline" size={20} color="#666" style={{marginLeft: 10}} />
            <TextInput
              style={styles.input}
              placeholder="Digite a cidade ou região..."
              placeholderTextColor="#999"
              value={city}
              onChangeText={setCity}
              onSubmitEditing={fetchWeather}
            />
          </View>
          
          <TouchableOpacity style={styles.searchButton} onPress={fetchWeather} activeOpacity={0.8}>
            <LinearGradient
              colors={['#574668ff', '#334b4dff']}
              style={styles.gradientButton}
            >
              <Ionicons name="search" size={24} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#FFF" style={{marginTop: 50}} />}

        {weather && !loading && (
          <View style={styles.weatherCard}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cityName, {fontFamily: 'monospace'}]}>{weather.name}</Text>
              <Text style={[styles.regionName, {fontFamily: 'monospace'}]}>{weather.region}</Text>
            </View>

            <View style={styles.weatherIconContainer}>
              <Ionicons 
                name={getWeatherInfo(weather.weatherCode).icon} 
                size={80} 
                color={getWeatherInfo(weather.weatherCode).color} 
                style={{textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: {width: 2, height: 2}, textShadowRadius: 5 }}
              />
              <Text style={[styles.temp, {fontFamily: 'monospace'}]}>{Math.round(weather.temp)}°</Text>
            </View>

            <View style={styles.footerInfo}>
              <Text style={[styles.conditionText, {fontFamily: 'monospace'}]}>
                {getWeatherInfo(weather.weatherCode).label}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1,
    fontFamily: 'monospace',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    margin: 20,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    height: 50,
    marginRight: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    hoverEffect: 'lighten',
  },
  gradientButton: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 20,
    margin: 20,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  regionName: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 5,
  },
  weatherIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  temp: {
    fontSize: 80,
    fontWeight: '200',
    color: '#FFF',
    marginTop: -10,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  footerInfo: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  conditionText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
