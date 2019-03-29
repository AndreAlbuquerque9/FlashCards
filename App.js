import React from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import DeckLists from "./components/DeckLists";
import Deck from "./components/Deck";
import Question from "./components/Question";
import { white, black, gray } from "./utils/colors";
import reducer from "./reducers";
import { Provider } from "react-redux";
import { Constants } from "expo";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import { setLocalNotification } from "./utils/helpers";

const store = createStore(reducer);

UdaciStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const Tabs = createMaterialTopTabNavigator(
  {
    DeckLists: {
      screen: DeckLists,
      navigationOptions: {
        tabBarLabel: "DECKS"
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "ADD DECK"
      }
    }
  },
  {
    tabBarOptions: {
      inactiveTintColor: gray,
      activeTintColor: black,
      indicatorStyle: {
        backgroundColor: black
      },
      labelStyle: {
        fontSize: 20,
        paddingBottom: 10,
        fontWeight: "bold"
      },
      style: {
        backgroundColor: white
      }
    }
  }
);

const Stack = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null
      }
    },
    AddDeck: {
      screen: AddDeck
    },
    AddCard: {
      screen: AddCard
    },
    Deck: {
      screen: Deck
    },
    Question: {
      screen: Question
    }
  },
  {
    navigationOptions: {
      headerTintColor: black,
      headerTitleStyle: {
        fontSize: 22
      }
    },
    cardStyle: {
      backgroundColor: white
    }
  }
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={black} barStyle="light-content" />
          <Stack />
        </View>
      </Provider>
    );
  }
}
