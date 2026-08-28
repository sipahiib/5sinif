import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {getConfig, LessonShorts, lessonSpecs, LessonSlug} from './LessonShorts';

const Root = () => <>{(Object.keys(lessonSpecs) as LessonSlug[]).map((slug) => {
  const config = getConfig(slug);
  return <Composition key={slug} id={config.id} component={LessonShorts} defaultProps={{slug}} durationInFrames={config.durationInFrames} fps={config.fps} width={config.width} height={config.height}/>;
})}</>;

registerRoot(Root);
