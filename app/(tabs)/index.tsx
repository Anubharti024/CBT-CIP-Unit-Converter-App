import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

/* == TYPES == */
type Category = "Length" | "Mass" | "Temperature" | "Time";

type UnitOption = {
  label: string;
  value: string;
};

/* === CATEGORY DATA ===*/
const categories: Record<Category, string[]> = {
  Length: ["meter", "kilometer", "centimeter", "millimeter", "micrometer", "nanometer", "inch", "foot", "yard", "mile", "nautical mile"],
  Mass: ["kilogram", "gram", "milligram", "microgram", "tonne", "pound", "ounce", "stone"],
  Temperature: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"],
  Time: ["millisecond", "second", "minute", "hour", "day", "week", "month", "year", "decade", "century"],
};

export default function App() {
  const [category, setCategory] = useState<Category>("Length");
  const [fromUnit, setFromUnit] = useState<string>("meter");
  const [toUnit, setToUnit] = useState<string>("kilometer");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animateResult = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  /* === CONVERSION FUNCTION === */
  const convert = (value: string, from: string, to: string, category: Category): number | "" => {
    let val = parseFloat(value);
    if (isNaN(val)) return "";

    const lengthMap: any = {
      meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001,
      micrometer: 1e-6, nanometer: 1e-9, inch: 0.0254, foot: 0.3048,
      yard: 0.9144, mile: 1609.34, "nautical mile": 1852,
    };

    const massMap: any = {
      kilogram: 1, gram: 0.001, milligram: 1e-6, microgram: 1e-9,
      tonne: 1000, pound: 0.453592, ounce: 0.0283495, stone: 6.35029,
    };

    const timeMap: any = {
      millisecond: 0.001, second: 1, minute: 60, hour: 3600,
      day: 86400, week: 604800, month: 2628000,
      year: 31536000, decade: 315360000, century: 3153600000,
    };

    if (category === "Length") return (val * lengthMap[from]) / lengthMap[to];
    if (category === "Mass") return (val * massMap[from]) / massMap[to];
    if (category === "Time") return (val * timeMap[from]) / timeMap[to];

    if (category === "Temperature") {
      let tempC: number;

      if (from === "Celsius") tempC = val;
      else if (from === "Fahrenheit") tempC = (val - 32) * (5 / 9);
      else if (from === "Kelvin") tempC = val - 273.15;
      else tempC = (val - 491.67) * (5 / 9);

      if (to === "Celsius") return tempC;
      if (to === "Fahrenheit") return tempC * (9 / 5) + 32;
      if (to === "Kelvin") return tempC + 273.15;
      return (tempC + 273.15) * (9 / 5);
    }

    return "";
  };

  const handleConvert = (value: string, f = fromUnit, t = toUnit, c = category) => {
    setInputValue(value);
    const res = convert(value, f, t, c);
    setResult(res !== "" ? res.toFixed(4) : "");
    animateResult();
  };

  const unitOptions: UnitOption[] = categories[category].map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor="#e2e9f4" barStyle="dark-content" />

      <Text style={styles.title}>Unit Converter</Text>

      {/* CATEGORY */}
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue: Category) => {
          const newFrom = categories[itemValue][0];
          const newTo = categories[itemValue][1];

          setCategory(itemValue);
          setFromUnit(newFrom);
          setToUnit(newTo);
          setInputValue("");
          setResult("");
        }}
      >
        {Object.keys(categories).map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} color="#000" />
        ))}
      </Picker>

      {/* INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Enter value..."
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={(val) => handleConvert(val)}
      />

      {/* FROM */}
      <Text style={styles.label}>From</Text>
      <Dropdown
        style={styles.dropdown}
        data={unitOptions}
        search
        labelField="label"
        valueField="value"
        value={fromUnit}
        onChange={(item: UnitOption) => {
          setFromUnit(item.value);
          handleConvert(inputValue, item.value, toUnit, category);
        }}
      />

      {/* TO */}
      <Text style={styles.label}>To</Text>
      <Dropdown
        style={styles.dropdown}
        data={unitOptions}
        search
        labelField="label"
        valueField="value"
        value={toUnit}
        onChange={(item: UnitOption) => {
          setToUnit(item.value);
          handleConvert(inputValue, fromUnit, item.value, category);
        }}
      />

      {/* RESULT */}
      <Animated.Text
        style={[
          styles.result,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          },
        ]}
      >
        Result: {result || "—"}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#e2e9f4",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
    color: "#000",
  },

  picker: {
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#a7a4a4",
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
    backgroundColor: "#fff",
    color: "#000",
  },

  label: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 20,
    color: "#000",
  },

  dropdown: {
    height: 50,
    borderColor: "#a7a4a4",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginTop: 5,
  },

  result: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    color: "#333",
  },
});