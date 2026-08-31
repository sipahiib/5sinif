import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {ChannelLowerThirdPreview, ChannelLowerThirdPreviewConfig} from './ChannelLowerThirdPreview';

const Root: React.FC = () => <Composition
  id={ChannelLowerThirdPreviewConfig.id}
  component={ChannelLowerThirdPreview}
  durationInFrames={ChannelLowerThirdPreviewConfig.durationInFrames}
  fps={ChannelLowerThirdPreviewConfig.fps}
  width={ChannelLowerThirdPreviewConfig.width}
  height={ChannelLowerThirdPreviewConfig.height}
/>;

registerRoot(Root);
