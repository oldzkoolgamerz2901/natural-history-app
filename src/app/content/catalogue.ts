/** Numerical ages in Ma, transcribed from the pinned ICS 2026/06 chart. */
export interface Boundary {
  readonly age: number;
  readonly uncertainty?: number;
}

export interface Era {
  readonly id: string;
  readonly name: string;
  readonly start: Boundary;
  readonly end: Boundary;
  readonly color: string;
}

export interface Period {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly eraId: string;
  readonly start: Boundary;
  readonly end: Boundary;
  readonly color: string;
}

export interface Extinction {
  readonly id: string;
  readonly name: string;
  readonly number: string;
  readonly periodId: string;
  readonly oldest: number;
  readonly youngest: number;
  readonly timingNote: string;
}

export interface Reference {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly detail: string;
}

export interface ExhibitContent {
  readonly kind: 'period' | 'extinction';
  readonly id: string;
  readonly subtitle: string;
  readonly introduction: string;
  readonly sections: readonly {
    readonly heading: string;
    readonly text: string;
    readonly referenceIds: readonly string[];
  }[];
  readonly visual: {
    readonly src: string;
    readonly alt: string;
    readonly caption: string;
    readonly credit: string;
    readonly referenceIds: readonly string[];
  };
  readonly referenceIds: readonly string[];
}

export const CHART: Reference = {
  id: 'ics',
  title: 'International Chronostratigraphic Chart · 2026/06',
  url: 'https://stratigraphy.org/ICSchart/ChronostratChart2026-06.pdf',
  detail:
    'International Commission on Stratigraphy. Numerical boundary ages and uncertainties; fixed edition, June 2026.',
};

// Shared boundary objects keep adjacent intervals contiguous.
const boundaries = [
  { age: 538.8, uncertainty: 0.6 },
  { age: 486.85, uncertainty: 1.5 },
  { age: 443.1, uncertainty: 0.9 },
  { age: 419.62, uncertainty: 1.36 },
  { age: 358.86, uncertainty: 0.19 },
  { age: 298.9, uncertainty: 0.15 },
  { age: 251.902, uncertainty: 0.024 },
  { age: 201.4, uncertainty: 0.2 },
  { age: 143.1, uncertainty: 0.6 },
  { age: 66 },
  { age: 23.04 },
  { age: 2.58 },
  { age: 0 },
] as const satisfies readonly Boundary[];

export const PHANEROZOIC_START = boundaries[0].age;

export const ERAS: readonly Era[] = [
  {
    id: 'paleozoic',
    name: 'Paleozoic',
    start: boundaries[0],
    end: boundaries[6],
    color: '#567c72',
  },
  { id: 'mesozoic', name: 'Mesozoic', start: boundaries[6], end: boundaries[9], color: '#b28b50' },
  { id: 'cenozoic', name: 'Cenozoic', start: boundaries[9], end: boundaries[12], color: '#798e9a' },
];

export const PERIODS: readonly Period[] = [
  {
    id: 'cambrian',
    name: 'Cambrian',
    shortName: 'Cm',
    eraId: 'paleozoic',
    start: boundaries[0],
    end: boundaries[1],
    color: '#6c8d73',
  },
  {
    id: 'ordovician',
    name: 'Ordovician',
    shortName: 'O',
    eraId: 'paleozoic',
    start: boundaries[1],
    end: boundaries[2],
    color: '#507c70',
  },
  {
    id: 'silurian',
    name: 'Silurian',
    shortName: 'S',
    eraId: 'paleozoic',
    start: boundaries[2],
    end: boundaries[3],
    color: '#789990',
  },
  {
    id: 'devonian',
    name: 'Devonian',
    shortName: 'D',
    eraId: 'paleozoic',
    start: boundaries[3],
    end: boundaries[4],
    color: '#a48c64',
  },
  {
    id: 'carboniferous',
    name: 'Carboniferous',
    shortName: 'C',
    eraId: 'paleozoic',
    start: boundaries[4],
    end: boundaries[5],
    color: '#638d88',
  },
  {
    id: 'permian',
    name: 'Permian',
    shortName: 'P',
    eraId: 'paleozoic',
    start: boundaries[5],
    end: boundaries[6],
    color: '#a85c46',
  },
  {
    id: 'triassic',
    name: 'Triassic',
    shortName: 'T',
    eraId: 'mesozoic',
    start: boundaries[6],
    end: boundaries[7],
    color: '#94778c',
  },
  {
    id: 'jurassic',
    name: 'Jurassic',
    shortName: 'J',
    eraId: 'mesozoic',
    start: boundaries[7],
    end: boundaries[8],
    color: '#608b9b',
  },
  {
    id: 'cretaceous',
    name: 'Cretaceous',
    shortName: 'K',
    eraId: 'mesozoic',
    start: boundaries[8],
    end: boundaries[9],
    color: '#8c985c',
  },
  {
    id: 'paleogene',
    name: 'Paleogene',
    shortName: 'Pg',
    eraId: 'cenozoic',
    start: boundaries[9],
    end: boundaries[10],
    color: '#b78560',
  },
  {
    id: 'neogene',
    name: 'Neogene',
    shortName: 'N',
    eraId: 'cenozoic',
    start: boundaries[10],
    end: boundaries[11],
    color: '#a99452',
  },
  {
    id: 'quaternary',
    name: 'Quaternary',
    shortName: 'Q',
    eraId: 'cenozoic',
    start: boundaries[11],
    end: boundaries[12],
    color: '#778e9b',
  },
];

// Overview markers, not precise onset dates. Late Devonian was a succession of crises.
// Their ranges deliberately remain separate from ICS period boundary ages.
export const EXTINCTIONS: readonly Extinction[] = [
  {
    id: 'end-ordovician',
    name: 'End-Ordovician',
    number: '01',
    periodId: 'ordovician',
    oldest: 445.2,
    youngest: 443.1,
    timingNote: 'Approximately 445–443 Ma; an interval near the end of the Ordovician.',
  },
  {
    id: 'late-devonian',
    name: 'Late Devonian',
    number: '02',
    periodId: 'devonian',
    oldest: 372.15,
    youngest: 358.86,
    timingNote:
      'Multiple crises, approximately 372–359 Ma; shown as a range, not a single instant.',
  },
  {
    id: 'end-permian',
    name: 'End-Permian',
    number: '03',
    periodId: 'permian',
    oldest: 252,
    youngest: 251.902,
    timingNote:
      'Approximately 252 Ma, close to the Permian–Triassic boundary. The boundary age is a reference point, not an exact extinction onset.',
  },
  {
    id: 'end-triassic',
    name: 'End-Triassic',
    number: '04',
    periodId: 'triassic',
    oldest: 201.6,
    youngest: 201.4,
    timingNote: 'Approximately 201 Ma, near the Triassic–Jurassic boundary.',
  },
  {
    id: 'end-cretaceous',
    name: 'End-Cretaceous',
    number: '05',
    periodId: 'cretaceous',
    oldest: 66,
    youngest: 66,
    timingNote: 'Approximately 66 Ma, at the Cretaceous–Paleogene boundary.',
  },
];

export const REFERENCES: readonly Reference[] = [
  CHART,
  {
    id: 'nps-permian',
    title: 'Permian Period',
    url: 'https://www.nps.gov/articles/000/permian-period.htm',
    detail:
      'U.S. National Park Service. Background on Pangaea, dry continental interiors, and marine life. Dates follow ICS instead.',
  },
  {
    id: 'nps-land',
    title: 'Evolution on Land',
    url: 'https://www.nps.gov/subjects/fossils/evolution-on-land.htm',
    detail:
      'U.S. National Park Service. Permian terrestrial fossils, including relatives of mammals.',
  },
  {
    id: 'burgess',
    title:
      'Initial pulse of Siberian Traps sills as the trigger of the end-Permian mass extinction',
    url: 'https://doi.org/10.1038/s41467-017-00083-9',
    detail:
      'Burgess, Muirhead & Bowring (2017), Nature Communications 8, 164. Magmatism and extinction chronology.',
  },
  {
    id: 'penn',
    title:
      'Temperature-dependent hypoxia explains biogeography and severity of end-Permian marine mass extinction',
    url: 'https://doi.org/10.1126/science.aat1327',
    detail:
      'Penn, Deutsch, Payne & Sperling (2018), Science 362. Climate simulations and marine fossil evidence.',
  },
  {
    id: 'payne',
    title:
      'End-Permian Mass Extinction in the Oceans: An Ancient Analog for the Twenty-First Century?',
    url: 'https://doi.org/10.1146/annurev-earth-042711-105329',
    detail:
      'Payne & Clapham (2012), Annual Review of Earth and Planetary Sciences 40. Marine losses and ecosystem recovery.',
  },
  {
    id: 'big-five',
    title: 'Mass Extinctions Through Geologic Time',
    url: 'https://www.nps.gov/subjects/fossils/mass-extinctions-through-geologic-time.htm',
    detail:
      'U.S. National Park Service. Orientation to the five major extinction events; marker ages are approximate and aligned to ICS 2026/06 intervals.',
  },
];

export const EXHIBITS: readonly ExhibitContent[] = [
  {
    kind: 'period',
    id: 'permian',
    subtitle: 'A world joined together',
    introduction:
      'A vast supercontinent shaped the Permian world. Life flourished across its land and seas, before a profound crisis closed the Paleozoic Era.',
    sections: [
      {
        heading: 'Land & environment',
        text: 'Pangaea brought most continental land together. Far from the sea, many interior regions were dry and strongly seasonal. Shallow seas around its margins supported rich communities of animals.',
        referenceIds: ['nps-permian'],
      },
      {
        heading: 'Life to look for',
        text: 'Marine fossils include brachiopods—shelled animals distinct from clams—and crinoids, relatives of sea stars. On land, early relatives of mammals were part of the fauna. These animals lived before the first dinosaurs.',
        referenceIds: ['nps-permian', 'nps-land'],
      },
      {
        heading: 'A boundary that changed life',
        text: 'Near the end of the period, severe environmental disruption devastated ecosystems. The following Triassic began with surviving communities and a long, uneven recovery.',
        referenceIds: ['burgess', 'payne'],
      },
    ],
    visual: {
      src: 'visuals/permian-environments.svg',
      alt: 'Schematic cross-section from a dry continental interior, across a coast, into shallow sea habitat. It illustrates contrasting environments on Pangaea, not a reconstructed location.',
      caption:
        'One supercontinent, contrasting habitats. Dry interiors and living seas coexisted; environments varied through the Permian. Schematic, not a geographic reconstruction.',
      credit: 'Original diagram: Natural History Explorer · CC0 1.0',
      referenceIds: ['nps-permian'],
    },
    referenceIds: ['ics', 'nps-permian', 'nps-land', 'burgess', 'payne'],
  },
  {
    kind: 'extinction',
    id: 'end-permian',
    subtitle: 'When familiar seas disappeared',
    introduction:
      'Around 252 million years ago, Earth experienced its most severe known mass extinction. Marine communities were transformed, and land ecosystems also suffered major losses.',
    sections: [
      {
        heading: 'What was lost',
        text: 'Trilobites disappeared, and reef communities were severely disrupted. Losses differed among groups and environments: no single percentage describes all life on Earth.',
        referenceIds: ['payne'],
      },
      {
        heading: 'The leading explanation',
        text: 'Evidence links Siberian Traps magmatism to a cascade of environmental stresses. Magma entering sedimentary rocks could release gases. Greenhouse warming and declining ocean oxygen made large areas less habitable for marine animals.',
        referenceIds: ['burgess', 'penn'],
      },
      {
        heading: 'How life changed',
        text: 'Survivors entered damaged ecosystems. Complex marine communities took millions of years to rebuild, with recovery proceeding at different rates in different habitats.',
        referenceIds: ['payne'],
      },
      {
        heading: 'Evidence & uncertainty',
        text: 'Rock dates, chemical signals, fossils, and climate models support a link between magmatism, warming, and marine losses. Scientists continue to investigate the timing of land and sea extinctions and the contribution of individual stresses. The diagram shows a leading mechanism, not a complete explanation.',
        referenceIds: ['burgess', 'penn', 'payne'],
      },
    ],
    visual: {
      src: 'visuals/extinction-mechanism.svg',
      alt: 'A conceptual chain links Siberian magmatism to greenhouse gas release, then ocean warming and oxygen loss, and finally a loss of habitable ocean. It is not a quantitative model.',
      caption:
        'A cascade of stresses. Warming water holds less oxygen while animals need more of it. Ocean circulation and nutrient cycling also affect oxygen supply. Schematic; not a quantitative model.',
      credit: 'Original diagram: Natural History Explorer · CC0 1.0',
      referenceIds: ['burgess', 'penn'],
    },
    referenceIds: ['ics', 'burgess', 'penn', 'payne'],
  },
];
