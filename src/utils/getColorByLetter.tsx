"use client";

const groupColorMap: { [key: string]: string } = {
  "A-G": "#FF5733",
  "H-N": "#FF33A1",
  "O-U": "#3357FF",
  "V-Z": "#33FF57",
  default: "#A133FF", // Default color if not found
};

export const getColorByLetter = (letter: string) => {
  const upperLetter = letter.toUpperCase();
  if ("ABCDEFG".includes(upperLetter)) {
    return groupColorMap["A-G"];
  } else if ("HIJKLMN".includes(upperLetter)) {
    return groupColorMap["H-N"];
  } else if ("OPQRSTU".includes(upperLetter)) {
    return groupColorMap["O-U"];
  } else if ("VWXYZ".includes(upperLetter)) {
    return groupColorMap["V-Z"];
  }
  return groupColorMap["default"];
};
