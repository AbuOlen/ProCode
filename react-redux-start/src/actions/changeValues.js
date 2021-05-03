import {
    COUNTER_PLUS1,
    COUNTER_MINUS1,
    COUNTER_PLUS5,
    COUNTER_PLUS_PARAM,
    COUNTER_PLUS_RANDOM,
    RESET,
} from './countTypes';
import {
    STATUS
} from './statusTypes';

import randomint from '../randomint';

export const plus1 = () => ({ type: COUNTER_PLUS1});
export const minus1 = () => ({ type: COUNTER_MINUS1});
export const plus5 = () => ({ type:COUNTER_PLUS5 });
export const plusP =() => ({ type:COUNTER_PLUS_PARAM, param:10, });
export const plusR =() => ({ type:COUNTER_PLUS_RANDOM, param:randomint(0,10), });
export const reset = () => ({ type:RESET });
export const revert = () => ({ type: STATUS});
