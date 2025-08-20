import {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotesContext = createContext();

export default function NotesContextProvider({ children }) {

    const [notes, setNotes] = useState([]);

    const getNotes = async () => {

        const storedNotesJson = await AsyncStorage.getItem('notes');

        if (!storedNotesJson) {
            return [];
        }

        return JSON.parse(storedNotesJson);

    }

    useEffect(() => {

        const loadNotes = async () => {
            const gotNotes = await getNotes();
            setNotes(gotNotes);
        }

        loadNotes();

    }, []);

    return (

        <NotesContext.Provider value={{notes: notes, setNotes: setNotes}}>
            {children}
        </NotesContext.Provider>

    );
}

export const useNotes = () => {
  return useContext(NotesContext);
};
