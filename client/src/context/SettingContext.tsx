import useLocalStorage from "@/hooks/useLocalStorage"
import {
    Settings,
    SettingsContext as SettingsContextType,
} from "@/types/setting"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

const SettingContext = createContext<SettingsContextType | null>(null)

export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingContext)
    if (!context) {
        throw new Error(
            "useSettings must be used within a SettingContextProvider",
        )
    }
    return context
}

const defaultSettings: Settings = {
    theme: "Dracula",
    language: "Javascript",
    fontSize: 16,
    fontFamily: "Space Mono",
}

function SettingContextProvider({ children }: { children: ReactNode }) {
    const { getItem } = useLocalStorage()

    let storedSettings: Partial<Settings> = {}
    try {
        storedSettings = JSON.parse(getItem("settings") || "{}")
    } catch {
        storedSettings = {}
    }

    const [theme, setTheme] = useState<string>(
        storedSettings.theme ?? defaultSettings.theme,
    )
    const [language, setLanguage] = useState<string>(
        storedSettings.language ?? defaultSettings.language,
    )
    const [fontSize, setFontSize] = useState<number>(
        storedSettings.fontSize ?? defaultSettings.fontSize,
    )
    const [fontFamily, setFontFamily] = useState<string>(
        storedSettings.fontFamily ?? defaultSettings.fontFamily,
    )

    const resetSettings = () => {
        setTheme(defaultSettings.theme)
        setLanguage(defaultSettings.language)
        setFontSize(defaultSettings.fontSize)
        setFontFamily(defaultSettings.fontFamily)
    }

    useEffect(() => {
        const updatedSettings = {
            theme,
            language,
            fontSize,
            fontFamily,
        }
        localStorage.setItem("settings", JSON.stringify(updatedSettings))
    }, [theme, language, fontSize, fontFamily])

    return (
        <SettingContext.Provider
            value={{
                theme,
                setTheme,
                language,
                setLanguage,
                fontSize,
                setFontSize,
                fontFamily,
                setFontFamily,
                resetSettings,
            }}
        >
            {children}
        </SettingContext.Provider>
    )
}

export { SettingContextProvider }
export default SettingContext
