import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BackgroundFX } from "./BackgroundFX";
import { HeartCursor } from "./HeartCursor";
import { LoadingScreen } from "./LoadingScreen";
import { SceneFinal } from "./SceneFinal";
import { SceneName } from "./SceneName";
import { SceneQuestion } from "./SceneQuestion";

type Scene = "loading" | "name" | "question" | "final";

export function ForgiveMeApp() {
  const [scene, setScene] = useState<Scene>("loading");
  const [name, setName] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setScene("name"), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-dvh min-h-screen overflow-hidden">
      <BackgroundFX intensity={scene === "final" ? 1.6 : 1} />
      <HeartCursor />

      <AnimatePresence mode="wait">
        {scene === "loading" && <LoadingScreen key="loading" />}
        {scene === "name" && (
          <SceneName
            key="name"
            onSubmit={(n) => {
              setName(n);
              setScene("question");
            }}
          />
        )}
        {scene === "question" && (
          <SceneQuestion key="question" name={name} onYes={() => setScene("final")} />
        )}
        {scene === "final" && <SceneFinal key="final" name={name} />}
      </AnimatePresence>
    </main>
  );
}
