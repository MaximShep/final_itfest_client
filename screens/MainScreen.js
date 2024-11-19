import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Для иконок

// Список дней недели
const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const App = () => {
  const [selectedDay, setSelectedDay] = useState('Пн'); // Выбранный день
  const [caloriesGoal, setCaloriesGoal] = useState(2000); // Цель калорий
  const [water, setWater] = useState(0); // Количество воды
  const [meals, setMeals] = useState({
    Завтрак: { items: ['Продукт 1', 'Продукт 2'], calories: 400 },
    Обед: { items: ['Продукт 3', 'Продукт 4'], calories: 600 },
    Ужин: { items: ['Продукт 5'], calories: 300 },
    Перекус: { items: ['Продукт 6'], calories: 100 },
  }); // Хранение блюд и их калорийности
  const [expanded, setExpanded] = useState(null); // Раскрытие списков

  const handleMealTextPress = (mealType) => {
    // Логирование "Привет" при нажатии на название приёма пищи
    console.log('Привет');
  };

  const handleChevronPress = (mealType) => {
    // Раскрытие/закрытие списка при нажатии на стрелочку
    setExpanded(expanded === mealType ? null : mealType);
  };

  return (
    <View style={styles.container}>
      {/* Список дней недели */}
      <FlatList
        data={DAYS}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dayButton, selectedDay === item && styles.selectedDayButton]}
            onPress={() => setSelectedDay(item)}
          >
            <Text style={[styles.dayText, selectedDay === item && styles.selectedDayText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContainer}
      />

      <ScrollView style={styles.content}>
        {/* Цель калорий */}
        <Text style={styles.caloriesGoal}>Ваша цель: {caloriesGoal} калорий</Text>

        {/* Приёмы пищи */}
        {Object.keys(meals).map((mealType) => (
          <View key={mealType} style={styles.mealContainer}>
            <TouchableOpacity
              style={styles.mealButton}
              onPress={() => handleMealTextPress(mealType)} // Логика для обработки нажатия на компонент
            >
              <View style={styles.mealHeader}>
                <Text style={styles.mealButtonText}>
                  {mealType} (Калории: {meals[mealType].calories})
                </Text>
                {/* Стрелочка внутри компонента */}
                <TouchableOpacity onPress={() => handleChevronPress(mealType)}>
                  <Icon
                    name={expanded === mealType ? 'chevron-up-outline' : 'chevron-down-outline'}
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {expanded === mealType && meals[mealType].items.length > 0 && (
              <View style={styles.mealList}>
                {meals[mealType].items.map((item, index) => (
                  <Text key={index} style={styles.mealListItem}>
                    {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Количество воды */}
        <View style={styles.waterContainer}>
          <Text style={styles.waterText}>Количество воды: {water} мл</Text>
          <TouchableOpacity
            style={styles.addWaterButton}
            onPress={() => setWater((prev) => prev + 250)}
          >
            <Text style={styles.addWaterButtonText}>+250 мл</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  daysContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  dayButton: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: '#6200EE',
  },
  dayText: {
    color: '#000',
    fontSize: 14,
  },
  selectedDayText: {
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  caloriesGoal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mealContainer: {
    marginBottom: 20,
  },
  mealButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealButtonText: {
    fontSize: 18,
    color: '#000',
  },
  mealList: {
    marginLeft: 20,
    marginBottom: 10,
  },
  mealListItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  waterContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  waterText: {
    fontSize: 18,
    marginBottom: 10,
  },
  addWaterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6200EE',
    borderRadius: 5,
  },
  addWaterButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default App;
