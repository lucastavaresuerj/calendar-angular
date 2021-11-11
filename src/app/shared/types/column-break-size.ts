import { size } from './types';
import { breakpoints } from './types';

export type columnsBreakSize = {
  [key in breakpoints]?: size;
};
