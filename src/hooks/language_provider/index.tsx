import { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';

interface Translations {
    [key: string]: string;
}

interface LanguageContextType {
    currentLanguage: string;
    changeLanguage: (language: string) => void;
    translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

const loadTranslations = async (language: string): Promise<Translations> => {
    try {
        const translations = await import(`../../helpers/languages/${language}.json`);
        return translations.default;
    } catch (error) {
        console.error(`Could not load translations for ${language}:`, error);
        return {};
    }
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');
    const [translations, setTranslations] = useState<Translations>({});

    useEffect(() => {
        const fetchTranslations = async () => {
            const loadedTranslations = await loadTranslations(currentLanguage);
            setTranslations(loadedTranslations);
        };

        fetchTranslations();
    }, [currentLanguage]);

    const changeLanguage = (language: string) => {
        setCurrentLanguage(language);
    };

    const value: LanguageContextType = {
        currentLanguage,
        changeLanguage,
        translations
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};