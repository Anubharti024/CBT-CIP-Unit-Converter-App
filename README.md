# 📱 Unit Converter App

A modern, fast, and user-friendly **React Native Unit Converter** application that supports multiple categories like Length, Mass, Temperature, and Time with real-time conversion and smooth animations.

---

## 🚀 Features

* 🔄 **Real-time Conversion** – Instant results as you type
* 📏 **Multiple Categories**

  * Length
  * Mass
  * Temperature
  * Time
* 🔍 **Searchable Dropdowns** for easy unit selection
* 🎯 **Accurate Calculations** using optimized conversion logic
* ✨ **Smooth Animations** with React Native Animated API
* 📱 **Clean & Minimal UI** for better user experience
* ⚡ **Lightweight & Fast Performance**

---

## 🛠️ Tech Stack

* **React Native**
* **TypeScript**
* **Expo (Optional for development/build)**
* **@react-native-picker/picker**
* **react-native-element-dropdown**
* **Animated API**

---

## 📂 Project Structure

```
UnitConverter/
│── App.tsx
│── assets/
│── components/ (optional future scaling)
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/unit-converter-app.git
cd unit-converter-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the App

```bash
npx expo start
```

---

## 📦 Build APK (Android)

If you're using Expo (EAS):

```bash
eas build -p android --profile preview
```

After build:

* Download APK from Expo dashboard
* Share or install directly

---

## 🧠 Conversion Logic

The app uses **base unit normalization** for accurate conversions:

* Length → meters
* Mass → kilograms
* Time → seconds
* Temperature → Celsius (intermediate conversion)

Example:

```ts
(val * baseUnit[from]) / baseUnit[to]
```

Temperature uses custom formulas for precision.

---

## 🎨 UI Highlights

* Soft background color for readability
* Rounded input fields and dropdowns
* Animated result display (fade + slide)
* Clean typography and spacing

---

## 🔮 Future Enhancements

* 🌍 More Unit Categories (Speed, Area, Volume)
* 🔊 Voice Input Support
* 📊 History Tracking

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

---

## 👨‍💻 Author

**Anu Bharti**

* 💼 React Native Developer || Softwere Engineer
* 🚀 Passionate about building scalable mobile apps

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 📢 Share it

---

## 💡 Note

This project is designed for learning and production-level UI/logic implementation. Feel free to extend it with advanced features.

---
