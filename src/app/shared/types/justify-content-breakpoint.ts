import { breakpoints } from './types';
import { justifyContent } from './types';

export type justifyContentBreakpoint = {
  [key in breakpoints]?: justifyContent;
};
