import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {ChannelTrailer,ChannelTrailerConfig} from './ChannelTrailer';

const Root=()=> <Composition {...ChannelTrailerConfig} component={ChannelTrailer}/>;
registerRoot(Root);
