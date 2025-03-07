export interface Reader {
  id: string;
  name: string;
  age: number;
  preferences?: string[];
  completedStories?: string[];
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
}

export interface Scene {
  id: string;
  content: string;
  choices?: Choice[];
  isEnding?: boolean;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  ageRange: {
    min: number;
    max: number;
  };
  coverImage: string;
  firstSceneId: string;
  scenes: Record<string, Scene>;
  tags: string[];
}

export interface StoryProgress {
  storyId: string;
  currentSceneId: string;
  choices: string[];
}