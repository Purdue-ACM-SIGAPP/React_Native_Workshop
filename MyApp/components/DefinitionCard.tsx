// A COMPONENT: one reusable card that shows a part of speech
// and all of its definitions. index.tsx just uses <DefinitionCard />.

import React from "react";
import { Text, View } from "react-native";
import { styles } from "@/styles";
import { Entry } from "@/types";

// Props = the data you pass into the component, like an HTML attribute.
interface DefinitionCardProps {
  entry: Entry;
}

const DefinitionCard = ({ entry }: DefinitionCardProps) => (
  <View style={styles.card}>
    <Text style={styles.partOfSpeech}>{entry.partOfSpeech}</Text>

    {entry.senses.map((sense, index) => (
      <View key={index} style={styles.definitionBlock}>
        <Text style={styles.definitionText}>
          {index + 1}. {sense.definition}
        </Text>
        {/* The API gives a list of examples, we just show the first one. */}
        {sense.examples?.[0] && (
          <Text style={styles.exampleText}>
            Example: &quot;{sense.examples[0]}&quot;
          </Text>
        )}
      </View>
    ))}
  </View>
);

export default DefinitionCard;
