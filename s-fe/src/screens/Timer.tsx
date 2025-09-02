import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function TimerScreen() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")} : ${m
      .toString()
      .padStart(2, "0")} : ${s.toString().padStart(2, "0")}`;
  };

  const setTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setIsActive(false);
  };

  const quickTimes = [15, 20, 30, 45, 60, 90];

  return (
    <View style={styles.container}>
      {/* Logo no topo */}
      <Image
        source={require("../../assets/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Botões rápidos circulares */}
      <View style={styles.quickButtons}>
        {quickTimes.map((min) => (
          <TouchableOpacity
            key={min}
            style={styles.quickButton}
            onPress={() => setTimer(min)}
          >
            <Text style={styles.quickText}>{formatTime(min * 60)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timer central */}
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

      {/* Botões de controle */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsActive(true)}
          disabled={timeLeft === 0}
        >
          <Text style={styles.controlText}>Iniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsActive(false)}
        >
          <Text style={styles.controlText}>Pausar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            setIsActive(false);
            setTimeLeft(0);
          }}
        >
          <Text style={styles.controlText}>Remover</Text>
        </TouchableOpacity>
      </View>

      {/* Menu inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <Feather name="clock" size={22} color="#7fabc6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Feather name="check-circle" size={22} color="#7fabc6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="document-text-outline" size={22} color="#7fabc6" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#deecf5",
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
  timerText: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#7fabc6",
  },
  quickButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: -70,
  },
  quickButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#7fabc6",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  quickText: {
    color: "#7fabc6",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  controlButton: {
    borderWidth: 2,
    borderColor: "#7fabc6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: "transparent",
  },
  controlText: {
    color: "#7fabc6",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    marginTop: 40,
  },
  footerIcon: {
    borderWidth: 2,
    borderColor: "#7fabc6",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
