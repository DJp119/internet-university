import { Degree } from './types';

export const degrees: Degree[] = [
  {
    id: '1',
    slug: 'abusing',
    title: 'Bachelor in Abusing',
    subtitle: 'Online Comment Section Warfare',
    icon: '🤬',
    color: '#EF4444',
    checklist: [
      { id: '1', text: 'Won a comment section fight', completed: false },
      { id: '2', text: 'Used "source: trust me bro"', completed: false },
      { id: '3', text: 'Typed a paragraph in anger', completed: false },
      { id: '4', text: 'Used caps lock in argument', completed: false },
      { id: '5', text: 'Said "who asked?"', completed: false },
      { id: '6', text: 'Replied with meme instead of explanation', completed: false },
      { id: '7', text: 'Deleted comment after posting', completed: false },
      { id: '8', text: 'Argued about something you didn\'t research', completed: false },
      { id: '9', text: 'Used "bro listen"', completed: false },
      { id: '10', text: 'Won an internet debate', completed: false },
    ],
  },
  {
    id: '2',
    slug: 'overthinking',
    title: 'Bachelor in Overthinking',
    subtitle: 'Advanced Catastrophic Thinking',
    icon: '🤔',
    color: '#8B5CF6',
    checklist: [
      { id: '1', text: 'Re-read message 5 times', completed: false },
      { id: '2', text: 'Imagined fake arguments', completed: false },
      { id: '3', text: 'Googled symptoms unnecessarily', completed: false },
      { id: '4', text: 'Checked last seen multiple times', completed: false },
      { id: '5', text: 'Thought about conversation from years ago', completed: false },
      { id: '6', text: 'Drafted reply but didn\'t send', completed: false },
      { id: '7', text: 'Overanalyzed emoji meaning', completed: false },
      { id: '8', text: 'Imagined worst case scenario', completed: false },
    ],
  },
  {
    id: '3',
    slug: 'procrastination',
    title: 'Bachelor in Procrastination',
    subtitle: 'I\'ll Start Tomorrow',
    icon: '⏰',
    color: '#F59E0B',
    checklist: [
      { id: '1', text: 'Watched productivity videos instead of working', completed: false },
      { id: '2', text: 'Made a to-do list but didn\'t start', completed: false },
      { id: '3', text: 'Started working at 2 AM', completed: false },
      { id: '4', text: 'Opened YouTube "for 5 minutes"', completed: false },
      { id: '5', text: 'Cleaned room instead of doing work', completed: false },
      { id: '6', text: 'Scrolled Instagram instead of starting task', completed: false },
      { id: '7', text: 'Delayed deadline until last moment', completed: false },
    ],
  },
  {
    id: '4',
    slug: 'memes',
    title: 'Master in Memes',
    subtitle: 'Meme Literacy & Application',
    icon: '🐸',
    color: '#10B981',
    checklist: [
      { id: '1', text: 'Sent meme instead of replying', completed: false },
      { id: '2', text: 'Tagged friends in memes', completed: false },
      { id: '3', text: 'Saved memes for future use', completed: false },
      { id: '4', text: 'Used meme in serious argument', completed: false },
      { id: '5', text: 'Followed 10 meme pages', completed: false },
      { id: '6', text: 'Shared meme at 3AM', completed: false },
    ],
  },
];

export function getDegreeBySlug(slug: string): Degree | undefined {
  return degrees.find(d => d.slug === slug);
}

export function getAllDegrees(): Degree[] {
  return degrees;
}
