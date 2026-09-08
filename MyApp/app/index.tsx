import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DefinitionCard from "@/components/DefinitionCard";
import { styles } from "@/styles";
import { colors } from "@/theme";
import { ApiResponse, Entry } from "@/types";

// this is a COMPONENT
const DictionaryApp = () => {
  // States (Variables that make the screen re-draw when they change)
  const [word, setWord] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Runs when you press Search
  const searchWord = async () => {
    // Start fresh: show the spinner, clear the old results
    setLoading(true);
    setEntries([]);
    setError("");

    try {
      // 1. Ask the API for the word
      const response = await fetch(
        `https://freedictionaryapi.com/api/v1/entries/en/${word}`,
      );

      // 2. Turn the reply into a JavaScript object
      const data: ApiResponse = await response.json();

      // 3. Show the definitions, or say we found none
      if (data.entries.length === 0) {
        setError(`No definition found for "${word}".`);
      } else {
        setEntries(data.entries);
      }
    } catch {
      setError("Something went wrong. Please check your connection.");
    }

    // Hide the spinner, whatever happened
    setLoading(false);
  };

  // Rendered Layout (What you actually see)
  return (
    // equivalent to using HTML, eg. <h1></h1> is similar to <Text></Text>
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Dictionary App</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter a word..."
          value={word}
          onChangeText={setWord}
          onSubmitEditing={searchWord} // Search with the return key
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* this is the submit button */}
        <TouchableOpacity style={styles.button} onPress={searchWord}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {/* Each line below only shows up when its condition is true */}
        {loading && <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />}

        {error !== "" && <Text style={styles.errorText}>{error}</Text>}

        <FlatList
          data={entries}
          renderItem={({ item }) => <DefinitionCard entry={item} />}
          keyExtractor={(item, index) => `${item.partOfSpeech}-${index}`}
          style={styles.resultsContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default DictionaryApp;
