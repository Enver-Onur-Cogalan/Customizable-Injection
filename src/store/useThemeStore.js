import { create } from "zustand";

const useThemeStore = create((set) => ({
    backgroundColor: 'white',
    lottieActive: false,
    setBackgroundColor: (color) => set({ backgroundColor: color }),
    toggleLottie: () => set((state) => ({ lottieActive: !state.lottieActive })),
}));

export default useThemeStore;