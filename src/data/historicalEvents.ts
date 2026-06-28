export interface HistoricalEvent {
  year: number;
  era: string;
  event: string;
}

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  { year: 1950, era: 'Pre-oil Kuwait', event: 'Pearl diving remains the backbone of the economy as oil revenues begin to arrive.' },
  { year: 1961, era: 'Independence', event: 'Kuwait declares independence from Britain on 19 June 1961.' },
  { year: 1963, era: 'The National Assembly', event: 'Kuwait holds its first parliamentary elections.' },
  { year: 1973, era: 'Oil embargo', event: 'Kuwait participates in the Arab oil embargo. Oil prices quadruple overnight.' },
  { year: 1976, era: 'The boom years', event: 'Kuwait City transforms rapidly. Construction cranes define the skyline.' },
  { year: 1982, era: 'Souk al-Manakh crash', event: 'The unofficial stock market collapses, leaving billions in bad debt.' },
  { year: 1990, era: 'The invasion', event: 'Iraqi forces invade Kuwait on 2 August 1990. The emir flees to Saudi Arabia.' },
  { year: 1991, era: 'Liberation', event: 'Coalition forces liberate Kuwait on 26 February 1991 after seven months of occupation.' },
  { year: 2003, era: 'Post-9/11 Gulf', event: 'Kuwait serves as the primary staging ground for the US invasion of Iraq.' },
  { year: 2006, era: 'The new emir', event: 'Sheikh Sabah Al-Ahmad Al-Sabah becomes emir, beginning a new political era.' },
];
