import { STORAGE_KEYS } from "../constants/storageKeys";

export function saveDocument(document) {
  localStorage.setItem(
    STORAGE_KEYS.DOCUMENT,
    JSON.stringify(document)
  );
}

export function loadDocument() {
  const storedDocument = localStorage.getItem(
    STORAGE_KEYS.DOCUMENT
  );

  if (!storedDocument) {
    return null;
  }

  try {
    return JSON.parse(storedDocument);
  } catch (error) {
    console.error("Failed to parse document:", error);

    return null;
  }
}