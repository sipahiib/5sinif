import React from "react";
import { Composition, registerRoot } from "remotion";
import {
  YardimlasmaShortsOne,
  YardimlasmaShortsOneConfig,
  YardimlasmaShortsTwo,
  YardimlasmaShortsTwoConfig,
} from "./YardimlasmaShorts";
const Root = () => (
  <>
    <Composition
      {...YardimlasmaShortsOneConfig}
      component={YardimlasmaShortsOne}
    />
    <Composition
      {...YardimlasmaShortsTwoConfig}
      component={YardimlasmaShortsTwo}
    />
  </>
);
registerRoot(Root);
