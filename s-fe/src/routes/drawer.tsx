import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

// Screens
import Home from "../screens/Home";
import Account from "../screens/Account";
import Notes from "../screens/Notes";
import Todo from "../screens/Todo";
import Timer from "../screens/Timer";

const Drawer = createDrawerNavigator();

function DrawRoutes() {
  return (
    <Drawer.Navigator
    screenOptions={({ navigation }) => ({
      drawerType: "back",
      drawerStyle: {
        backgroundColor: "#7fabc6", 
      },
      swipeEdgeWidth: 80,
      drawerActiveTintColor: "#f0f8ff",
      drawerLabelStyle: {
        color: "#7fabc6",
        fontSize: 18,
        fontWeight: "600",
      },
      headerStyle: {
        backgroundColor: "#deecf5",
        elevation: 0,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{
            marginLeft: 15,
            backgroundColor: "transparent", 
            borderRadius: 50,
            zIndex: 999, 
          }}
        >
          <Feather name="menu" size={40} color="#7fabc6" />
        </TouchableOpacity>
      ),
    })}
  >  
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          drawerLabel: "Início",
          title: "",
          drawerIcon: ({ color }) => (
            <Feather name="home" color={color} size={28} />
          ),
        }}
      />
      <Drawer.Screen
        name="account"
        component={Account}
        options={{
          drawerLabel: "Conta",
          title: "",
          drawerIcon: ({ color }) => (
            <Feather name="user" color={color} size={28} />
          ),
        }}
      />
      <Drawer.Screen
        name="todo"
        component={Todo}
        options={{
          drawerLabel: "Afazeres",
          title: "",
          drawerIcon: ({ color }) => (
            <Feather name="check-circle" color={color} size={28} />
          ),
        }}
      />
      <Drawer.Screen
        name="notes"
        component={Notes}
        options={{
          drawerLabel: "Anotações",
          title: "",
          drawerIcon: ({ color }) => (
            <FontAwesome name="sticky-note-o" color={color} size={28} />
          ),
        }}
      />
      <Drawer.Screen
        name="timer"
        component={Timer}
        options={{
          drawerLabel: "Temporizador",
          title: "",
          drawerIcon: ({ color }) => (
            <Ionicons name="timer-outline" color={color} size={28} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function RootNav() {
  return (
    <NavigationContainer>
      <DrawRoutes />
    </NavigationContainer>
  );
}
