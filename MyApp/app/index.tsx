import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ListRenderItemInfo,
} from "react-native";

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface DictionaryEntry {
  word: string;
  meanings: Meaning[];
}

// The API returns an array of dictionary entries
type ApiResponse = DictionaryEntry[];

// Type for the error response from the API
interface ApiError {
  title: string;
  message: string;
  resolution: string;
}

const DictionaryApp = () => {
  const [word, setWord] = useState<string>("");
  const [definition, setDefinition] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchDefinition = async () => {
    if (!word.trim()) {
      setError("Please enter a word.");
      return;
    }

    setLoading(true);
    setDefinition(null);
    setError("");

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data: ApiResponse | ApiError = await response.json();

      if (response.ok) {
        setDefinition(data as ApiResponse);
      } else {
        setError((data as ApiError).title || "Could not find a definition.");
      }
    } catch (err) {
      setError("An error occurred. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  // --- Render Function for the FlatList ---
  const renderDefinition = ({ item }: ListRenderItemInfo<Meaning>) => (
    <View style={styles.definitionContainer}>
      <Text style={styles.partOfSpeech}>{item.partOfSpeech}</Text>
      {item.definitions.map((def, index) => (
        <View key={index} style={styles.definitionBlock}>
          <Text style={styles.definitionText}>
            {index + 1}. {def.definition}
          </Text>
          {def.example && (
            <Text style={styles.exampleText}>Example: "{def.example}"</Text>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Dictionary</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter a word..."
          value={word}
          onChangeText={setWord}
          onSubmitEditing={fetchDefinition} // Allows searching with the return key
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={fetchDefinition}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={styles.loader}
          />
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        {definition && (
          <FlatList
            data={definition[0]?.meanings} // The API returns an array, we use the first result
            renderItem={renderDefinition}
            keyExtractor={(item, index) => `${item.partOfSpeech}-${index}`}
            style={styles.resultsContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  resultsContainer: {
    marginTop: 20,
  },
  definitionContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  partOfSpeech: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
    color: "#333",
  },
  definitionBlock: {
    marginBottom: 10,
  },
  definitionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  exampleText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#777",
    marginTop: 5,
  },
  errorText: {
    color: "#D32F2F",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default DictionaryApp;
