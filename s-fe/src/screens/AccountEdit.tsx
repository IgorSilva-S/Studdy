import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

export default function Perfil() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/img/logo.png")} 
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Image
        source={require("../../assets/img/user.png")}
        style={{ width: 200, height: 200, marginBottom: 50 }}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#7fabc6" style={styles.icon} />
        <TextInput placeholder="Nome:" placeholderTextColor="#7fabc6" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="mail" size={20} color="#7fabc6" style={styles.icon} />
        <TextInput placeholder="Email:" placeholderTextColor="#7fabc6" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
          <Ionicons name="document" size={24} color="#7fabc6" />
        <TextInput placeholder="Senha:" placeholderTextColor="#7fabc6" secureTextEntry style={styles.input}
        />
      </View>

      {/* Botão salvar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      {/* Barra inferior */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.buttonNav}>
          <Feather name="clock" size={24} color="#7fabc6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNav}>
          <FontAwesome name="check" size={24} color="#7fabc6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNav}>
          <Ionicons name="document" size={24} color="#7fabc6" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deecf5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  logo: {
    width: 380,
    height: 55,
    resizeMode: "contain",
    position: "absolute",
    top: -58,
    left: 130,
    alignSelf: "center",
    zIndex: 999,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A7CA5",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7fabc6",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: "#deecf5",
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color:"#7fabc6",
  },
  button: {
    backgroundColor: "#7fabc6",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    position: "absolute",
    bottom: 40,
    width: "80%",
    backgroundColor: "#deecf5",
  },
  buttons: {
    width: "80%",
    marginTop: 10,
  },
  buttonNav: {
    flexDirection: 'row',
    alignItems: 'center',  
    backgroundColor: '#deecf5',
    borderWidth: 2,
    borderColor: '#8bb6cf',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
  },
  buttonNavText: {
    fontSize: 18,
    color: '#7fabc6',
    marginLeft: 10,          
  } 
});
