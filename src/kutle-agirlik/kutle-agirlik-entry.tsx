import React from 'react';import {Composition,registerRoot} from 'remotion';import {KutleAgirlik,KutleAgirlikConfig} from './KutleAgirlik';import {KutleAgirlikKurz,KutleAgirlikKurzConfig} from './KutleAgirlikKurz';
const Root=()=> <><Composition {...KutleAgirlikConfig} component={KutleAgirlik}/><Composition {...KutleAgirlikKurzConfig} component={KutleAgirlikKurz}/></>;registerRoot(Root);
