import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface ButtonTempProps {
  color?: string;
  width?: number;
  link: string;
  text: string;
}

const ButtonTemp: React.FC<ButtonTempProps> = ({
  color,
  width,
  link,
  text,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color, width: width }]}
      onPress={() => router.push(link)}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ButtonTemp;
