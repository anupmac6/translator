import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../../../constants/colors';
import QuizScreen from '../../../screens/QuizScreen';
import TranslateImageScreen from '../../../screens/Translate/TranslateImageScreen';
import BottomTab from '../../tabs/BottomTab';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTab} />
      <Stack.Screen
        name="Image"
        component={TranslateImageScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: '',
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
