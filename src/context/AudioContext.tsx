import { createContext, useContext, useRef, useCallback, ReactNode } from "react";

interface AudioContextValue {
  registerAudio: (id: string, element: HTMLVideoElement | HTMLAudioElement) => void;
  unregisterAudio: (id: string) => void;
  requestAudioPlay: (id: string) => void;
  muteAll: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export const useAudioManager = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioManager must be used within an AudioProvider");
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const audioElementsRef = useRef<Map<string, HTMLVideoElement | HTMLAudioElement>>(new Map());
  const activeAudioIdRef = useRef<string | null>(null);

  const registerAudio = useCallback((id: string, element: HTMLVideoElement | HTMLAudioElement) => {
    audioElementsRef.current.set(id, element);
    // Ensure new registrations start muted
    element.muted = true;
  }, []);

  const unregisterAudio = useCallback((id: string) => {
    audioElementsRef.current.delete(id);
    if (activeAudioIdRef.current === id) {
      activeAudioIdRef.current = null;
    }
  }, []);

  const muteAll = useCallback(() => {
    audioElementsRef.current.forEach((element) => {
      element.muted = true;
    });
    activeAudioIdRef.current = null;
  }, []);

  const requestAudioPlay = useCallback((id: string) => {
    // Mute all other audio elements first
    audioElementsRef.current.forEach((element, elementId) => {
      if (elementId !== id) {
        element.muted = true;
      }
    });

    // Unmute the requested audio
    const targetElement = audioElementsRef.current.get(id);
    if (targetElement) {
      targetElement.muted = false;
      activeAudioIdRef.current = id;
    }
  }, []);

  return (
    <AudioContext.Provider value={{ registerAudio, unregisterAudio, requestAudioPlay, muteAll }}>
      {children}
    </AudioContext.Provider>
  );
};
