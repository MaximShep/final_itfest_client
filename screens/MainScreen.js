import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/Ionicons'; // Для иконок

// Список дней недели
const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const App = () => {
  const {navigate} = useNavigation()
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
    if (mealType == "Завтрак"){
      navigate('Завтрак')
    }
    else if (mealType == "Обед"){
      navigate('Обед')
    }
    else if (mealType == "Ужин"){
      navigate('Ужин')
    }
    else{
      navigate('Перекусы')
    }
    console.log(mealType);
  };

  const requireName = (mealType) => {
    if (mealType == "Завтрак"){
      return(require('../assets/breakfastImg.png'))
    }
    else if (mealType == "Обед"){
      return(require('../assets/lunchImg.png'))
    }
    else if (mealType == "Ужин"){
      return(require('../assets/dinnerImg.png'))
    }
    else{
      return(require('../assets/snackImg.png'))
    }
  }

  const handleChevronPress = (mealType) => {
    // Раскрытие/закрытие списка при нажатии на стрелочку
    setExpanded(expanded === mealType ? null : mealType);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo}/>
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
       {/* Цель калорий */}
      <View style={styles.celContainer}>
        <Text style={styles.cel}>{meals['Завтрак'].calories+meals['Обед'].calories+meals['Ужин'].calories+meals['Перекус'].calories}/{caloriesGoal}</Text>
        <Text style={styles.dopText}>ккал</Text>
        <Image source={require('../assets/dot.png')} style={styles.dot}/>
        <Text style={styles.cel}>{water}</Text>
        <Text style={styles.dopText}>мл</Text>
      </View>
      <ScrollView style={styles.content}>
       <Text style={styles.foodHeader}>еда</Text>
        {/* Приёмы пищи */}
        {Object.keys(meals).map((mealType) => (
          <View key={mealType} style={styles.mealContainer}>
            <TouchableOpacity
              style={styles.mealButton}
              onPress={() => handleMealTextPress(mealType)} // Логика для обработки нажатия на компонент
            >
              <View style={styles.mealHeader}>
                <View style={{flexDirection: 'row',
    alignItems: 'center', width:widthPercentageToDP(50)}}>
                  <Text style={styles.mealButtonText}>
                  {mealType} 
                </Text>
                <Image source={require('../assets/dot.png')} style={styles.dot1}/>
                <Text style={styles.calor}>{meals[mealType].calories} ккал</Text>
                </View>
                
                <Image source={requireName(mealType)} style={styles.photo}/>
                {/* Стрелочка внутри компонента */}
                {/* <TouchableOpacity onPress={() => handleChevronPress(mealType)}>
                  <Icon
                    name={expanded === mealType ? 'chevron-up-outline' : 'chevron-down-outline'}
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity> */}
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
    backgroundColor: '#F1F1F1',
  },
  celContainer:{
    flexDirection: 'row',
    marginTop: heightPercentageToDP(-64),
    marginLeft: widthPercentageToDP(3),
    
  },
  cel:{
    fontFamily:'Bold',
    fontSize:heightPercentageToDP(2.1),
    letterSpacing:widthPercentageToDP(-0.2),
  },
  dopText:{
    fontFamily:'Medium',
    color:'#90969F',
    fontSize:heightPercentageToDP(2),
    marginLeft:widthPercentageToDP(0.7),
    letterSpacing:widthPercentageToDP(-0.2)
  },
  dot:{
    width:widthPercentageToDP(1.5),
    height:widthPercentageToDP(1.5),
    margin:widthPercentageToDP(2)
  },
  logo:{
    width: widthPercentageToDP(31),
    marginTop:heightPercentageToDP(8),
    marginLeft:widthPercentageToDP(3),
    height:heightPercentageToDP(3)
  },
  daysContainer: {
    alignItems: 'top',
    justifyContent: 'flex-start',
    height: heightPercentageToDP(4),
    marginTop:heightPercentageToDP(3),
    marginLeft:widthPercentageToDP(2)
  },
  dayButton: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: widthPercentageToDP(0.7),
  },
  selectedDayButton: {
    backgroundColor: '#FFDC3F',
    borderBottomWidth:1,
    borderEndWidth:1,
    borderStartWidth:1,
    borderTopWidth:1
  },
  dayText: {
    color: '#000',
    fontSize: 18,
    fontFamily:'Medium',
    textTransform:"lowercase"
  },
  selectedDayText: {
    color: '#000',
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
  },
  mealButton: {
    height:heightPercentageToDP(5),
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop:heightPercentageToDP(0.6),
    width:widthPercentageToDP(93)
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealButtonText: {
    fontSize: heightPercentageToDP(2.6),
    color: '#000',
    fontFamily:'Medium',
    letterSpacing:widthPercentageToDP(-0.2),
    marginLeft:widthPercentageToDP(3.5)
  },
  dot1:{
    width:widthPercentageToDP(1),
    height:widthPercentageToDP(1),
    margin:widthPercentageToDP(2)
  },
  calor:{
    fontFamily:'Medium',
    color:'#90969F',
    fontSize:heightPercentageToDP(1.7),
    letterSpacing:widthPercentageToDP(-0.2)
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
  photo:{
    width:widthPercentageToDP(30),
    height:heightPercentageToDP(5),
    marginLeft:widthPercentageToDP(12),
    borderBottomEndRadius:10,
    borderStartEndRadius:10
  }
});

export default App;
