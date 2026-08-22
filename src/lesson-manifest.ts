import manifest from '../content/lessons.json';
import {Lesson, LessonManifest} from './lesson-types';

const typedManifest = manifest as LessonManifest;

export const lessons = typedManifest.lessons;

export const getLesson = (lessonId: string): Lesson => {
  const lesson = lessons.find((candidate) => candidate.id === lessonId);
  if (!lesson) {
    throw new Error(`Lesson "${lessonId}" was not found in content/lessons.json`);
  }
  return lesson;
};

export const getLessonDurationInFrames = (lesson: Lesson, fps: number): number =>
  lesson.scenes.reduce((total, scene) => total + Math.round((scene.totalSec ?? 1) * fps), 0);