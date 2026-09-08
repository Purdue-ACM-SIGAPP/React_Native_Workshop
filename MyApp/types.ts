// Shapes of the data we get back from freedictionaryapi.com.

export interface Sense {
  definition: string;
  examples?: string[];
}

export interface Entry {
  partOfSpeech: string;
  senses: Sense[];
}

// The API returns one object with a list of entries inside it.
export interface ApiResponse {
  word: string;
  entries: Entry[];
}
