import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function NotesScreen() {
  const [tasks, setTasks] = useState([{ id: "1", text: "Anotações", done: true }]);
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now().toString(),
      text: newTask,
      done: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setIsAdding(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        {item.done ? (
          <Feather name="check-circle" size={20} color="#7fabc6" />
        ) : (
          <Feather name="circle" size={20} color="#7fabc6" />
        )}
      </TouchableOpacity>

      <Text
        style={[
          styles.taskText,
          { textDecorationLine: item.done ? "line-through" : "none" },
        ]}
      >
        {item.text}
      </Text>

      <TouchableOpacity onPress={() => removeTask(item.id)}>
        <Feather name="x" size={20} color="#7fabc6" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Logo no topo */}
      <Image
        source={require("../../assets/img/logo.png")} 
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Lista */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
      />

      {/* Input aparece ao clicar no + */}
      {isAdding && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a anotação..."
            placeholderTextColor="#7fabc6"
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={addTask}
          />
          <TouchableOpacity onPress={addTask} style={styles.saveButton}>
            <Feather name="check" size={20} color="#7fabc6" />
          </TouchableOpacity>
        </View>
      )}

      {/* Botão adicionar */}
      {!isAdding && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAdding(true)}
        >
          <Feather name="plus" size={22} color="#7fabc6" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deecf5",
    paddingHorizontal: 15,
    paddingBottom: 30, // espaço extra para não cortar
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
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#7fabc6",
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    justifyContent: "space-between",
  },
  taskText: {
    flex: 1,
    marginHorizontal: 10,
    color: "#7fabc6",
    fontWeight: "bold",
  },
  addButton: {
    borderWidth: 2,
    borderColor: "#7fabc6",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25, // sobe o botão
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#7fabc6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 25, // sobe o input
  },
  input: {
    flex: 1,
    color: "#7fabc6",
    fontWeight: "bold",
  },
  saveButton: {
    marginLeft: 10,
  },
});
