import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { TodoProvider } from './context/TodoContext';
import ManualTodoScreen from './screens/ManualTodoScreen';
import AiTodoScreen from './screens/AiTodoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: '#999',
            tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
            tabBarStyle: { paddingBottom: 6, paddingTop: 6, height: 60 },
          }}
        >
          <Tab.Screen
            name="My Todos"
            component={ManualTodoScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 22, color }}>📝</Text>
              ),
            }}
          />
          <Tab.Screen
            name="AI Todos"
            component={AiTodoScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 22, color }}>🤖</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
}
