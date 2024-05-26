import type { MembersService } from './types';
import * as services from './pocketbase';

export const members = services.members satisfies MembersService;
