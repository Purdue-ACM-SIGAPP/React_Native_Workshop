// THEME = the "design template" for the whole app.
// Change a value here and it updates everywhere.

export const colors = {
  background: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E0E0E0",
  primary: "rgb(0, 60, 255)",
  textOnPrimary: "#FFFFFF",
  textDark: "#333333",
  textBody: "#555555",
  textMuted: "#777777",
  error: "#D32F2F",
};

export const fonts = {
  title: { fontSize: 32, fontWeight: "bold" },
  heading: { fontSize: 20, fontWeight: "bold" },
  button: { fontSize: 18, fontWeight: "bold" },
  body: { fontSize: 16 },
  small: { fontSize: 14 },
} as const;

export const spacing = {
  sm: 5,
  md: 10,
  lg: 15,
  xl: 20,
};

export const radius = {
  md: 10,
};
