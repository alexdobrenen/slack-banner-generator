/**
 * A simple banner generator that creates text art banners without external dependencies
 * @param text The text to convert to a banner
 * @param wordEmoji The emoji to use for the text characters
 * @param backgroundEmoji The emoji to use for the background
 * @returns The generated banner as a string with Slack emoji codes
 */
export const generateSimpleBanner = (
  text: string,
  wordEmoji: string,
  backgroundEmoji: string
): string => {
  // Dictionary mapping characters to simple ASCII art patterns
  // Each pattern is a 5x5 grid where 1 represents the character and 0 represents background
  const charPatterns: { [key: string]: string[][] } = {
    'A': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1']
    ],
    'B': [
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '0']
    ],
    'C': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '0'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    'D': [
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '0']
    ],
    'E': [
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '0', '0'],
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '0'],
      ['1', '1', '1', '1', '1']
    ],
    'F': [
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '0', '0'],
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '0'],
      ['1', '0', '0', '0', '0']
    ],
    'G': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '0'],
      ['1', '0', '1', '1', '1'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    'H': [
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1']
    ],
    'I': [
      ['1', '1', '1', '1', '1'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['1', '1', '1', '1', '1']
    ],
    'J': [
      ['0', '0', '0', '0', '1'],
      ['0', '0', '0', '0', '1'],
      ['0', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    'K': [
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '1', '0'],
      ['1', '1', '1', '0', '0'],
      ['1', '0', '0', '1', '0'],
      ['1', '0', '0', '0', '1']
    ],
    'L': [
      ['1', '0', '0', '0', '0'],
      ['1', '0', '0', '0', '0'],
      ['1', '0', '0', '0', '0'],
      ['1', '0', '0', '0', '0'],
      ['1', '1', '1', '1', '1']
    ],
    'M': [
      ['1', '0', '0', '0', '1'],
      ['1', '1', '0', '1', '1'],
      ['1', '0', '1', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1']
    ],
    'N': [
      ['1', '0', '0', '0', '1'],
      ['1', '1', '0', '0', '1'],
      ['1', '0', '1', '0', '1'],
      ['1', '0', '0', '1', '1'],
      ['1', '0', '0', '0', '1']
    ],
    'O': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    'P': [
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '0'],
      ['1', '0', '0', '0', '0']
    ],
    'Q': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '1', '0'],
      ['0', '1', '1', '0', '1']
    ],
    'R': [
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '1', '0'],
      ['1', '0', '0', '0', '1']
    ],
    'S': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '0'],
      ['0', '1', '1', '1', '0'],
      ['0', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    'T': [
      ['1', '1', '1', '1', '1'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0']
    ],
    'U': [
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    'V': [
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '0', '1', '0'],
      ['0', '0', '1', '0', '0']
    ],
    'W': [
      ['1', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '1'],
      ['1', '0', '1', '0', '1'],
      ['1', '0', '1', '0', '1'],
      ['0', '1', '0', '1', '0']
    ],
    'X': [
      ['1', '0', '0', '0', '1'],
      ['0', '1', '0', '1', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '1', '0', '1', '0'],
      ['1', '0', '0', '0', '1']
    ],
    'Y': [
      ['1', '0', '0', '0', '1'],
      ['0', '1', '0', '1', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0']
    ],
    'Z': [
      ['1', '1', '1', '1', '1'],
      ['0', '0', '0', '1', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '1', '0', '0', '0'],
      ['1', '1', '1', '1', '1']
    ],
    ' ': [
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0']
    ],
    '!': [
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', '0', '1', '0', '0']
    ],
    '?': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['0', '0', '0', '1', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', '0', '1', '0', '0']
    ],
    '.': [
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
      ['0', '0', '1', '0', '0']
    ],
    '0': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '1', '1'],
      ['1', '0', '1', '0', '1'],
      ['1', '1', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    '1': [
      ['0', '0', '1', '0', '0'],
      ['0', '1', '1', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '1', '1', '1', '0']
    ],
    '2': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['0', '0', '1', '1', '0'],
      ['0', '1', '0', '0', '0'],
      ['1', '1', '1', '1', '1']
    ],
    '3': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['0', '0', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    '4': [
      ['0', '0', '1', '1', '0'],
      ['0', '1', '0', '1', '0'],
      ['1', '0', '0', '1', '0'],
      ['1', '1', '1', '1', '1'],
      ['0', '0', '0', '1', '0']
    ],
    '5': [
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '0', '0'],
      ['1', '1', '1', '1', '0'],
      ['0', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '0']
    ],
    '6': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '0'],
      ['1', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    '7': [
      ['1', '1', '1', '1', '1'],
      ['0', '0', '0', '0', '1'],
      ['0', '0', '0', '1', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '1', '0', '0', '0']
    ],
    '8': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ],
    '9': [
      ['0', '1', '1', '1', '0'],
      ['1', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '1'],
      ['0', '0', '0', '0', '1'],
      ['0', '1', '1', '1', '0']
    ]
  };

  // Convert text to uppercase since our patterns are for uppercase
  const upperText = text.toUpperCase();

  // Initialize the result grid
  // Each character is 5x5, and we need 1 column of space between characters
  const width = upperText.length * 6 - 1;  // width = (chars * 5) + (spaces * (chars - 1))
  const height = 5;
  const grid: string[][] = new Array(height);
  for (let i = 0; i < height; i++) {
    grid[i] = new Array(width).fill('0');
  }

  // Place each character in the grid
  for (let charIndex = 0; charIndex < upperText.length; charIndex++) {
    const char = upperText[charIndex];
    const pattern = charPatterns[char] || charPatterns[' ']; // Default to space if char not found

    // Starting column for this character
    const startCol = charIndex * 6;

    // Place the pattern in the grid
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        grid[row][startCol + col] = pattern[row][col];
      }
    }
  }

  // Convert grid to emoji text with border
  let result = '';

  // Add top border (a full line of background emoji)
  let topBorder = ' ';
  for (let i = 0; i < width + 2; i++) {
    topBorder += `:${backgroundEmoji}:`;
  }
  result += topBorder + '\n';

  // Add each row of the banner with side borders
  for (let row = 0; row < height; row++) {
    // Add a space at the beginning of each line followed by a border emoji
    let line = ' ' + `:${backgroundEmoji}:`;

    // Add the content for this row
    for (let col = 0; col < width; col++) {
      // Replace '1' with wordEmoji and '0' with backgroundEmoji
      line += (grid[row][col] === '1') ? `:${wordEmoji}:` : `:${backgroundEmoji}:`;
    }

    // Add the right border
    line += `:${backgroundEmoji}:`;

    result += line + '\n';
  }

  // Add bottom border (a full line of background emoji)
  let bottomBorder = ' ';
  for (let i = 0; i < width + 2; i++) {
    bottomBorder += `:${backgroundEmoji}:`;
  }
  result += bottomBorder + '\n';

  return result;
};

/**
 * Preview how the banner will look with actual emojis instead of codes
 * @param banner The banner with emoji codes
 * @returns The banner with emoji placeholders for preview
 */
export const previewSimpleBanner = (banner: string): string => {
  // If no banner, return empty string
  if (!banner) return '';

  // A simple emoji map for common Slack emojis
  const emojiMap: Record<string, string> = {
    // Common emojis that might be used for text
    'tada': '🎉',
    'star': '⭐',
    'sparkles': '✨',
    'fire': '🔥',
    'heart': '❤️',
    'rainbow': '🌈',
    'sun': '☀️',
    'moon': '🌙',
    'smile': '😊',
    'party_parrot': '🦜',

    // Common emojis for background
    'black_square': '⬛',
    'white_square': '⬜',
    'blue_square': '🟦',
    'red_square': '🟥',
    'green_square': '🟩',
    'yellow_square': '🟨',
    'purple_square': '🟪',
    'orange_square': '🟧',
    'brown_square': '🟫',
    'black_large_square': '⬛',
    'white_large_square': '⬜',
  };

  // Replace known emoji codes with actual emojis if we have them
  // Otherwise, use a generic emoji character
  return banner.replace(/:([\w_]+):/g, (_, emojiName) => {
    return emojiMap[emojiName] || '📌';
  });
};