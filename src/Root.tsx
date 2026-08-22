import React from 'react';
import {Composition} from 'remotion';
import {ZitAnlam, RemotionVideoConfig} from './index';
import {SomutSoyut, SomutSoyutConfig} from './somut-soyut/SomutSoyut';
import {LessonVideo} from './LessonVideo';
import {getLesson, getLessonDurationInFrames} from './lesson-manifest';

const genericLesson = getLesson('ay');

export const Root = () => (
  <>
    <Composition
      id={RemotionVideoConfig.id}
      component={ZitAnlam}
      durationInFrames={RemotionVideoConfig.durationInFrames}
      fps={RemotionVideoConfig.fps}
      width={RemotionVideoConfig.width}
      height={RemotionVideoConfig.height}
    />
    <Composition
      id={SomutSoyutConfig.id}
      component={SomutSoyut}
      durationInFrames={SomutSoyutConfig.durationInFrames}
      fps={SomutSoyutConfig.fps}
      width={SomutSoyutConfig.width}
      height={SomutSoyutConfig.height}
    />
    <Composition
      id="Lesson"
      component={LessonVideo}
      durationInFrames={getLessonDurationInFrames(genericLesson, 30)}
      fps={30}
      width={960}
      height={540}
      defaultProps={{lesson: genericLesson}}
    />
  </>
);


