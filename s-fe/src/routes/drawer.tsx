import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

// Screens
import Home from "../screens/Home";
import Account from "../screens/Account";
import Notes from "../screens/Notes";
import Todo from "../screens/Todo";
import Timer from "../screens/Timer";

const Drawer = createDrawerNavigator()

function DrawRoutes() {
    return (
        <Drawer.Navigator screenOptions={{
            drawerType: "back",
            drawerStyle: {
                backgroundColor: '#7fabc6'
            },
            swipeEdgeWidth: 80,
            drawerActiveTintColor: '#f0f8ff',
            drawerLabelStyle: {
                color: '#deecf5'
            }
        }}>
            <Drawer.Screen name="home" component={Home} options={{ drawerLabel: 'Início', title: '', headerStyle: { backgroundColor: '#deecf5', elevation: 0 }, drawerIcon: ({color, size}) => <Feather name="home" color={color} size={size}/> }} />
            <Drawer.Screen name="account" component={Account} options={{ drawerLabel: 'Conta', title: '', headerStyle: { backgroundColor: '#deecf5', elevation: 0 }, drawerIcon: ({color, size}) => <Feather name="user" color={color} size={size}/> }} />
            <Drawer.Screen name="todo" component={Todo} options={{ drawerLabel: 'Afazeres', title: '', headerStyle: { backgroundColor: '#deecf5', elevation: 0 }, drawerIcon: ({color, size}) => <Feather name="check-circle" color={color} size={size}/> }} />
            <Drawer.Screen name="notes" component={Notes} options={{ drawerLabel: 'Anotações', title: '', headerStyle: { backgroundColor: '#deecf5', elevation: 0 }, drawerIcon: ({color, size}) => <FontAwesome name="sticky-note-o" color={color} size={size}/> }} />
            <Drawer.Screen name="timer" component={Timer} options={{ drawerLabel: 'Temporizador', title: '', headerStyle: { backgroundColor: '#deecf5', elevation: 0 }, drawerIcon: ({color, size}) => <Ionicons name="timer-outline" color={color} size={size}/> }} />
        </Drawer.Navigator>
    )
}

export default function RootNav() {
    return (
        <NavigationContainer>
            <DrawRoutes />
        </NavigationContainer>
    )
}