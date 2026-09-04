import React from "react";
import { Composition, registerRoot } from "remotion";
import { Yardimlasma, YardimlasmaConfig } from "./Yardimlasma";
import { YardimlasmaKurz, YardimlasmaKurzConfig } from "./YardimlasmaKurz";
const Root = () => (
  <>
    <Composition {...YardimlasmaConfig} component={Yardimlasma} />
    <Composition {...YardimlasmaKurzConfig} component={YardimlasmaKurz} />
  </>
);
registerRoot(Root);
