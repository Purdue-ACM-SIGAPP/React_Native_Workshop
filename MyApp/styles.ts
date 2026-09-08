// THIS IS EQUIVALENT TO A CSS FILE.
// All the styles live here, and they use the values from theme.ts.

import { StyleSheet } from "react-native";
import { colors, fonts, radius, spacing } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  title: {
    ...fonts.title,
    textAlign: "center",
    marginBottom: spacing.xl,
    color: colors.textDark,
  },
  input: {
    ...fonts.body,
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.card,
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  buttonText: {
    ...fonts.button,
    color: colors.textOnPrimary,
  },
  loader: {
    marginTop: spacing.xl,
  },
  errorText: {
    ...fonts.body,
    color: colors.error,
    textAlign: "center",
    marginTop: spacing.xl,
  },
  resultsContainer: {
    marginTop: spacing.xl,
  },

  // --- Styles for the DefinitionCard component ---
  card: {
    backgroundColor: colors.card,
    padding: spacing.xl,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
    borderColor: colors.border,
    borderWidth: 1,
  },
  partOfSpeech: {
    ...fonts.heading,
    fontStyle: "italic",
    marginBottom: spacing.md,
    color: colors.textDark,
  },
  definitionBlock: {
    marginBottom: spacing.md,
  },
  definitionText: {
    ...fonts.body,
    color: colors.textBody,
    lineHeight: 24,
  },
  exampleText: {
    ...fonts.small,
    fontStyle: "italic",
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
