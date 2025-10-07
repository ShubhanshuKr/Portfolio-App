import React from 'react';
import { StatusBar } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const App: React.FC = () => {
  return (
    <PaperProvider
      settings={{
        // 👇 This tells React Native Paper to use MaterialCommunityIcons everywhere
        icon: (props) => <MaterialCommunityIcons {...props} />,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f7" />
      <StackNavigator />
    </PaperProvider>
  );
};

export default App;
