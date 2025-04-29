# 🌐 Customizable WebView App

This React Native project demonstrates a customizable WebView-based mobile application where users can:

- View a web page (e.g. Google)
- Change the background color of the web content dynamically
- Add and save custom colors
- Delete preset and custom colors
- See a splash animation on initial load

---

## 🚀 Features

- ✅ Dynamic background color injection via `injectedJavaScript`
- 🎨 Custom color palette with user input (supports HEX and named colors)
- 💾 Colors saved using `AsyncStorage`
- ❌ Ability to remove preset and custom colors
- ⏱ Splash screen using Lottie for first 5 seconds
- 📱 Fully responsive on iOS and Android

---

## 📦 Installation

```bash
git clone https://github.com/Enver-Onur-Cogalan/Customizable-Injection.git
cd CustomizableInjection
yarn install
```

> If using iOS:
```bash
npx pod-install ios
```

---

## 🧭 Navigation Structure

- Bottom Tab Navigator with two screens:
  - `Home` → Splash + WebView
  - `Themes` → Color selection and editing

---

## 🖼 Screens

### Home Screen
- Shows a Lottie animation for 5 seconds
- Then loads WebView (`https://www.google.com`)
- Injects JavaScript to update `document.body.style.backgroundColor`

### Themes Screen
- Preset colors displayed as round buttons
- Custom color input via `TextInput`
- "Add Color" button stores color into local storage
- Delete buttons for both custom and preset colors
- "Clear Custom Colors" removes all custom ones

---

## 📁 File Structure

```
src/
 ┣ assets/
 ┃ ┗ animations/loading.json
 ┣ components/
 ┣ navigation/
 ┃ ┗ navigation.js
 ┣ screens/
 ┃ ┣ HomeScreen.js
 ┃ ┗ ThemeScreen.js
 ┣ store/
 ┃ ┗ useThemeStore.js
 ┗ App.js
```

---

## 📚 Dependencies

```bash
yarn add react-native-webview
yarn add @react-navigation/native @react-navigation/bottom-tabs
yarn add lottie-react-native lottie-ios
yarn add @react-native-async-storage/async-storage
yarn add zustand
```

---

## 👤 Author

Created with 💙 by **Enver Onur Çoğalan**  
GitHub: https://github.com/Enver-Onur-Cogalan

---

## 📝 License

This project is licensed under the MIT License.
