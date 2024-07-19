import type { MembersService, VisitsService, PurposesService, BikesService } from './types';

import * as services from './pocketbase';

export const members = services.members satisfies MembersService;
export const visits = services.visits satisfies VisitsService;
export const purposes = services.purposes satisfies PurposesService;
export const bikes = services.bikes satisfies BikesService;
