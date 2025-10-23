import type { MicrogameMeta } from './engine/types';


export const MICROGAMES: MicrogameMeta[] = [
{
id: 'tap-the-dot',
title: 'Tap the Dot',
description: 'Tik/klik snel op de stip',
load: () => import('./microgames/TapTheDot.svelte'),
},
{
id: 'reaction-arrow',
title: 'Reaction Arrow',
description: 'Druk de juiste pijltoets',
load: () => import('./microgames/ReactionArrow.svelte'),
},
{
id: 'quick-math',
title: 'Quick Math',
description: 'SNELLER!!!!',
load: () => import('./microgames/QuickMath.svelte'),
},
{id: 'hold-release',
title: 'Hold Release',
description: 'LOSLATEN!!!!',
load: () => import('./microgames/HoldRelease.svelte'),
},
{id: 'rhytm-tap',
title: 'Rhytm Tap',
description: 'BOENGABOENGA!!!!',
load: () => import('./microgames/RhytmTap.svelte'),
},
{id: 'avoid-bomb',
title: 'Avoid Bomb',
description: 'kablam',
load: () => import('./microgames/AvoidBomb.svelte'),
}
]
