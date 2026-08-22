export type Speaker = 'filiz' | 'ibrahim';

export type LessonScene = {
  id: string;
  title: string;
  image: string;
  focus: string;
  points: string[];
  firstSpeaker: Speaker;
  dialogue?: Record<Speaker, string>;
  splitSec?: number;
  totalSec?: number;
  visualKind?: string;
};

export type Lesson = {
  id: string;
  title: string;
  subject: string;
  imageRoot: string;
  audioRoot: string;
  scenes: LessonScene[];
};

export type LessonManifest = {lessons: Lesson[]};