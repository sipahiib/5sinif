import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Short} from './Short';
import t from './timing.json';
registerRoot(()=><Composition id="CokgenShorts" component={Short} width={720} height={1280} fps={30} durationInFrames={t.total}/>);
