import figlet from 'figlet';

/**
 * Generate a Slackmoji banner using figlet and specified emojis
 * @param text The text to convert to a banner
 * @param wordEmoji The emoji to use for the text characters
 * @param backgroundEmoji The emoji to use for the background
 * @returns The generated banner as a string with Slack emoji codes
 */
export const generateBanner = (
  text: string,
  wordEmoji: string,
  backgroundEmoji: string
): string => {
  console.log(`generateBanner called with: text="${text}", wordEmoji="${wordEmoji}", backgroundEmoji="${backgroundEmoji}"`);

  // Handle empty inputs
  if (!text || !wordEmoji || !backgroundEmoji) {
    console.log("Empty inputs detected, returning empty string");
    return '';
  }

  try {
    console.log("Attempting to generate figlet output with Banner font");

    // Generate ASCII art using figlet
    const figletOutput = figlet.textSync(text, {
      font: 'Standard',  // Let's try Standard font which is definitely available
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80
    });

    console.log("Figlet raw output:", figletOutput);

    if (!figletOutput) {
      console.error("Figlet output is empty or null");
      throw new Error('Failed to generate figlet output');
    }

    // Replace characters with emoji codes
    console.log("Processing figlet output lines");
    const result = figletOutput
      .split('\n')
      .map((line: string, index: number) => {
        // Add a space at the beginning of each line (like in the original script)
        const lineWithLeadingSpace = ' ' + line;
        console.log(`Line ${index}: "${lineWithLeadingSpace}"`);

        // For Standard font, replace any non-space character with the word emoji
        return lineWithLeadingSpace
          .replace(/[^\s]/g, `:${wordEmoji}:`)
          .replace(/ /g, `:${backgroundEmoji}:`);
      })
      .join('\n');

    console.log("Banner generation complete, first 50 chars:", result.substring(0, 50));
    return result;
  } catch (error) {
    console.error('Error generating banner:', error);
    return 'Error generating banner';
  }
};

/**
 * Preview how the banner will look with actual emojis instead of codes
 * This is a simplified preview that replaces emoji codes with emoji placeholders
 * @param banner The banner with emoji codes
 * @returns The banner with emoji placeholders for preview
 */
export const previewBanner = (banner: string): string => {
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
    'face_with_symbols_on_mouth': '🤬',
    'poop': '💩',
    'cool': '😎',
    'eyes': '👀',
    'thumbsup': '👍',
    'thumbsdown': '👎',
    'clap': '👏',
    'pray': '🙏',
    'rocket': '🚀',
    'boom': '💥',
    'mushroom': '🍄',
    'crown': '👑',

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
    'black_circle': '⚫',
    'white_circle': '⚪',
    'red_circle': '🔴',
    'blue_circle': '🔵',
    'green_circle': '🟢',
    'yellow_circle': '🟡',
    'purple_circle': '🟣',
    'orange_circle': '🟠',
    'brown_circle': '🟤',
  };

  // Replace known emoji codes with actual emojis if we have them
  // Otherwise, use a generic emoji character
  return banner.replace(/:([\w_]+):/g, (_, emojiName) => {
    return emojiMap[emojiName] || '📌';
  });
};