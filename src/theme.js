// 🍖 BACKYARD BBQ THEME — Warm, rich cream & earthy tones based on the reference image

export const colors = {
  // Core palette
  background: '#FDF4E3',   // Warm creamy beige background from the image
  surface:    '#F0DFCC',   // Slightly darker beige for empty states / subtle cards
  text:       '#4A2E1B',   // Deep rich brown for all text (no black!)
  textMuted:  '#8B6852',   // Lighter brown/taupe for subtext
  border:     '#E8D3BF',   // Soft warm divider lines
  
  // Brand — The rich card colors from the image
  primary:    '#D05E41',   // Brick red (Top card in reference)
  primaryLight: '#E8A593', // Muted version for tags
  brandAccent: '#EB813B',  // Vibrant orange (Middle card in reference)
  brandDark:  '#865E47',   // Earthy brown (Bottom card in reference)
  
  // Utility
  white:      '#FFFFFF',
  danger:     '#FF6B6B',
  success:    '#7BDCB5',

  // For diverse card backgrounds, similar to the reference image stacking
  types: {
    pdf:      '#D05E41', // Brick red
    link:     '#EB813B', // Bright orange
    video:    '#865E47', // Earthy brown
    image:    '#D05E41', // Brick red
    doc:      '#EB813B', // Bright orange
    note:     '#865E47', // Earthy brown
    bookmark: '#D05E41',
  },
};

export const fonts = {
  heading: 'DMSans_700Bold',     
  headingMedium: 'DMSans_500Medium',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodyBold: 'DMSans_700Bold', 
};

export const spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

export const radius = {
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  pill: 999,
};

// Soft rich shadows
export const shadow = {
  card: {
    shadowColor: '#4A2E1B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  float: {
    shadowColor: '#D05E41',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const TYPE_ICONS = {
  pdf:      '📄',
  link:     '🔗',
  video:    '🎬',
  image:    '🖼️',
  doc:      '📝',
  note:     '🗒️',
  bookmark: '🔖',
};
