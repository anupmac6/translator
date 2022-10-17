import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { Fonts } from '../constants/fonts';
import Colors from '../constants/colors';
import Progress from '../components/shared/Progress';
import QuizCard from '../components/shared/QuizCard';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { SearchItem } from '../services/History';
import Categories from '../services/Categories';

const { width, height } = Dimensions.get('screen');

const QuizScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [categoryItems, setCategoryItems] = useState<SearchItem[]>([]);
  const isFocused = useIsFocused();
  const categoryId = route.params?.categoryId;

  const [activeIndex, setActiveIndex] = useState(0);

  const loadCategoryItems = useCallback(async () => {
    const data = await Categories.getById(categoryId);

    if (isFocused) {
      setCategoryItems(data);
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      loadCategoryItems();
    }, [loadCategoryItems])
  );
  return (
    <SafeAreaView
      edges={['left', 'right', 'top', 'bottom']}
      style={styles.screen}
    >
      <View style={styles.header}>
        <View style={styles.headerClose}>
          <Ionicons name="close" size={24} color={Colors.text} />
        </View>
        <View style={styles.headerProgress}>
          <Text style={styles.headerProgressText}>
            {activeIndex + 1} / {categoryItems?.length}
          </Text>
        </View>
        <View style={styles.headerSettings}>
          <FontAwesome5 name="question-circle" size={24} color={Colors.text} />
        </View>
      </View>

      <Progress
        step={activeIndex + 1}
        steps={categoryItems?.length || 10}
        height={4}
      />

      <View style={styles.cards}>
        <QuizCard
          onSwipeLeft={() => {
            setActiveIndex((prevState) => prevState + 1);
            console.log('left');
          }}
          onSwipeRight={() => {
            setActiveIndex((prevState) => prevState + 1);
            console.log('right');
          }}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.options}>
          <MaterialCommunityIcons
            name="arrow-u-left-top"
            size={20}
            color={Colors.text}
          />
        </View>
        <View style={[styles.options, styles.optionsMiddle]}>
          <Text style={styles.optionsText}>Options</Text>
        </View>
        <View style={styles.options}>
          <Feather name="volume-2" size={20} color={Colors.text} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerClose: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerProgress: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  headerProgressText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    color: Colors.text,
  },
  headerSettings: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  footer: {
    marginBottom: 20,
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  options: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 30,
  },
  optionsMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  optionsText: {
    fontFamily: Fonts.Karla.Bold,
    fontSize: 16,
    color: Colors.text,
    alignSelf: 'center',
  },
  cards: {
    // backgroundColor: Colors.white,
    flex: 1,
  },
});
