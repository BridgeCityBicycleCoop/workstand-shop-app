import type { MembersService } from './types';
import type { VisitsService } from './types';
import type { PurposesService } from './types';

import * as services from './pocketbase';

export const members = services.members satisfies MembersService;
export const visits = services.visits satisfies VisitsService;
export const purposes = services.purposes satisfies PurposesService;
