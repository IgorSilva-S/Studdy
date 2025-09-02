import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import "react-native-gesture-handler";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/img/logo.png")}
          style={styles.logo}
        />
      </View>

      <Image
        source={require("../../assets/img/buddy.png")}
        style={styles.bear}
      />

      <Text style={styles.subtitle}>Studdy, o seu buddy{"\n"}dos estudos!</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Feather name="clock" size={24} color="#7fabc6" />
          <Text style={styles.buttonText}>Temporizador</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome name="check" size={24} color="#7fabc6" />
          <Text style={styles.buttonText}> Listas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="document" size={24} color="#7fabc6" />
          <Text style={styles.buttonText}> Notas</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deecf5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  menu: {
    fontSize: 28,
    color: "#7fabc6",
  },
  logo: {
    width: 380,
    height: 55,
    resizeMode: "contain",
    position: "absolute",
    top: -95,
    left: 130,
    alignSelf: "center",
    zIndex: 999,
  },
  bear: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginVertical: 10,
    marginTop: 35,
  },
  subtitle: {
    fontSize: 30,
    textAlign: "center",
    color: "#7fabc6",
    marginBottom: 20,
    marginTop: 30,
  },
  buttons: {
    width: "80%",
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',  
    backgroundColor: '#deecf5',
    borderWidth: 2,
    borderColor: '#8bb6cf',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
  },
  buttonText: {
    fontSize: 18,
    color: '#7fabc6',
    marginLeft: 10,          
  }  
});
