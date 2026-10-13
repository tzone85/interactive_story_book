import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "../store";
import { ArrowLeft, Settings2 } from "lucide-react";
import { stories } from "../data/stories";
import { splitParagraphs } from "../narration/domain/paragraphs";
import { NarrationControls } from "../narration/ui/NarrationControls";
import { NarrationSettings } from "../narration/ui/NarrationSettings";
import { NarratorPicker } from "../narration/ui/NarratorPicker";
import { useNarration } from "../narration/ui/useNarration";

const StoryReader = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const { currentReader, storyProgress, setStoryProgress } = useAppStore();
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const story = stories.find((s) => s.id === storyId);
  const currentSceneId = story
    ? storyProgress && storyProgress.storyId === story.id
      ? storyProgress.currentSceneId
      : story.firstSceneId
    : undefined;
  const currentScene =
    story && currentSceneId ? story.scenes[currentSceneId] : undefined;

  // Hooks run before the guards below so their order never changes between renders.
  const paragraphs = useMemo(
    () => (currentScene ? splitParagraphs(currentScene.content) : []),
    [currentScene],
  );
  const narration = useNarration(paragraphs);

  if (!currentReader) {
    navigate("/");
    return null;
  }

  if (!storyId) {
    navigate("/library");
    return null;
  }

  if (!story) {
    navigate("/library");
    return null;
  }

  if (!currentScene) {
    setStoryProgress({
      storyId,
      currentSceneId: story.firstSceneId,
      choices: [],
    });
    return null;
  }

  const handleChoice = (nextSceneId: string) => {
    if (!story.scenes[nextSceneId]) {
      console.error(`Invalid scene ID: ${nextSceneId}`);
      return;
    }
    setStoryProgress({
      storyId,
      currentSceneId: nextSceneId,
      choices:
        storyProgress?.storyId === storyId
          ? [...(storyProgress.choices || []), currentSceneId as string]
          : [currentSceneId as string],
    });
  };

  const handleRestart = () => {
    setStoryProgress({
      storyId,
      currentSceneId: story.firstSceneId,
      choices: [],
    });
  };

  const handleBackToLibrary = () => {
    navigate("/library");
  };

  const { status, paragraphIndex } = narration.state;
  const reading = status === "playing" || status === "paused";

  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button
          onClick={handleBackToLibrary}
          className="mb-6 flex items-center text-sm font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-gold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Library
        </button>

        <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/40 sm:p-10">
          <h1 className="mb-6 font-display text-3xl font-bold uppercase tracking-[0.06em] text-navy">
            {story.title}
          </h1>

          <NarrationControls narration={narration} />

          <button
            type="button"
            onClick={() => setShowVoiceSettings((open) => !open)}
            aria-expanded={showVoiceSettings}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
          >
            <Settings2 className="h-4 w-4" aria-hidden="true" />
            Voice settings
          </button>

          {showVoiceSettings && (
            <div className="mb-6 space-y-6 rounded-xl border border-gray-200 p-4">
              <NarratorPicker />
              <NarrationSettings />
            </div>
          )}

          <div className="max-w-none text-lg mb-8 text-gray-700 space-y-4">
            {paragraphs.map((paragraph, index) => {
              const current = reading && index === paragraphIndex;
              return (
                <p
                  key={index}
                  aria-current={current ? "true" : undefined}
                  className="rounded-lg px-3 py-2 transition-colors"
                  style={
                    current
                      ? { background: narration.narrator.palette.soft }
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {currentScene.choices && currentScene.choices.length > 0 ? (
            <div className="mt-8 space-y-4">
              {currentScene.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice.nextSceneId)}
                  className="w-full rounded-2xl border border-navy/15 bg-navy/[0.03] p-4 text-left text-gray-800 transition duration-200 hover:border-gold hover:bg-gold/10"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              <p className="font-display text-xl font-semibold uppercase tracking-[0.2em] text-navy">
                The End
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRestart}
                  className="rounded-full bg-navy px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-navy-600"
                >
                  Read Again
                </button>
                <button
                  onClick={handleBackToLibrary}
                  className="rounded-full border-2 border-navy bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-navy transition-colors duration-200 hover:bg-gold/15"
                >
                  Find Another Story
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryReader;
