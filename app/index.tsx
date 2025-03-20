import { Button, StyleSheet, Text, View } from "react-native";
import ButtonTemp from "../components/buttonTemp";


export default function App() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Weatherly</Text>
            <ButtonTemp link={"/signIn"} text={"Sign In"} color="blue" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
