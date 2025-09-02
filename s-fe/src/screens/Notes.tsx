import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedNote, setExpandedNote] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const addNote = () => {
    if (newTitle.trim() && newContent.trim()) {
      setNotes([...notes, { id: Date.now().toString(), title: newTitle, content: newContent }]);
      setNewTitle("");
      setNewContent("");
      setModalVisible(false);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, title, content) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title, content } : note
      )
    );
    setExpandedNote(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setExpandedNote(item)}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNote(item.id)}
      >
        <Feather name="x" size={20} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header com logo */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/img/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* Lista de notas */}
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 10, paddingTop: 120 }}
      />

      {/* Botão de adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="plus" size={28} color="#7fabc6" />
      </TouchableOpacity>

      {/* Modal para adicionar nota */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor="#ccc"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Conteúdo"
              placeholderTextColor="#ccc"
              value={newContent}
              onChangeText={setNewContent}
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={addNote}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para visualizar/editar nota */}
      <Modal visible={!!expandedNote} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.expandedCard}>
            {expandedNote && (
              <>
                <View style={styles.expandedHeader}>
                  <Text style={styles.expandedTitle}>{expandedNote.title}</Text>
                  <TouchableOpacity onPress={() => setExpandedNote(null)}>
                    <Feather name="x" size={24} color="white" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.expandedContent}>
                  {expandedNote.content}
                </Text>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setNewTitle(expandedNote.title);
                    setNewContent(expandedNote.content);
                    deleteNote(expandedNote.id);
                    setExpandedNote(null);
                    setModalVisible(true);
                  }}
                >
                  <Feather name="edit" size={22} color="white" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deecf5",
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 380,
    height: 55,
    resizeMode: "contain",
    position: "absolute",
    top: -55,
    left: 130,
    alignSelf: "center",
    zIndex: 999,
  },
  card: {
    backgroundColor: "#7fabc6",
    borderRadius: 10,
    width: "48%",
    height: 120,
    marginBottom: 12,
    padding: 10,
    position: "relative",
    marginTop: -90,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  deleteButton: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  addButton: {
    borderWidth: 2,
    borderColor: "#7fabc6",
    borderRadius: 10,
    margin: 20,
    padding: 15,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#7fabc6",
    borderRadius: 12,
    padding: 20,
    width: "85%",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#deecf5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#7fabc6",
    fontWeight: "bold",
  },
  expandedCard: {
    backgroundColor: "#7fabc6",
    borderRadius: 12,
    padding: 20,
    width: "90%",
  },
  expandedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expandedTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  expandedContent: {
    marginTop: 15,
    fontSize: 16,
    color: "white",
  },
  editButton: {
    position: "absolute",
    top: 15,
    right: 40,
  },
});
