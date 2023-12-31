import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Button} from 'react-native';
import styled from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import nhlService from './services/nhlService.js';
import { NavigationContainer } from '@react-navigation/native';

const TeamListItem = styled.TouchableOpacity`
  padding: 10px;
  margin: 5px;
  background-color: #eee;
`;

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const TeamListScreen = () => {
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await nhlService.getTeams();
        console.log('Teams Data:', teamsData.data);
        setTeams(teamsData.data || []);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <ScrollView>
      {teams.map((team) => (
        <TeamListItem key={team.id}>
          <Text>{team.fullName}</Text>
        </TeamListItem>
      ))}
    </ScrollView>
  );
};

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go to team list" onPress={() => navigation.navigate('TeamList')} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Overview' }}
      />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="TeamList" component={TeamListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;