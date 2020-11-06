import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeCheck from '../screens/EmployeeCheck';
import Home from '../screens/Home';

/**
 * TODO:
 * - Implement react-navigation
 * - Add remaining screens from the mockup
 * 
 * So far, the plan is to set up the navigator so that it follows the mockup.
 * Right now, we have first and second screens from the mockup, Home.js and EmployeeCheck.js.
 */

const Stack = createStackNavigator();

const TheAppNavigator = (props) => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EmployeeCheck" component={EmployeeCheck} />
      </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
      <NavigationContainer>
        <TheAppNavigator />
      </NavigationContainer>
  );
}