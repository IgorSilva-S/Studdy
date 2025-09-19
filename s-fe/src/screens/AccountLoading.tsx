import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import "react-native-gesture-handler";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AccountLoading({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/img/loading.gif")}
            />
            <Text>Carregando informações...</Text>
            <Button title="Ir Para Login" onPress={() => {navigation.navigate("Login")}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#deecf5",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingBottom: 50,
    },
});
