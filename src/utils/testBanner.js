// Import the figlet library
import figlet from 'figlet';

// Test the figlet function
console.log("Available fonts:", figlet.fontsSync());

// Generate banner with standard font
console.log("\n--- Standard Font ---");
console.log(figlet.textSync('TEST', {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80
}));

// Try another common font
console.log("\n--- Slant Font ---");
console.log(figlet.textSync('TEST', {
  font: 'Slant',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80
}));

// Test the Banner font specifically
console.log("\n--- Banner Font ---");
console.log(figlet.textSync('TEST', {
  font: 'Banner',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80
}));

// Output with emoji replacements - Standard font
function generateEmojiOutput(text) {
  const figletOutput = figlet.textSync(text, {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80
  });

  return figletOutput
    .split('\n')
    .map(line => {
      const lineWithLeadingSpace = ' ' + line;
      return lineWithLeadingSpace
        .replace(/[^\s]/g, ':star:')
        .replace(/ /g, ':black_large_square:');
    })
    .join('\n');
}

// Output with emoji replacements - Banner font specifically
function generateBannerEmojiOutput(text) {
  const figletOutput = figlet.textSync(text, {
    font: 'Banner',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80
  });

  return figletOutput
    .split('\n')
    .map(line => {
      const lineWithLeadingSpace = ' ' + line;
      return lineWithLeadingSpace
        .replace(/#/g, ':party_parrot:')
        .replace(/ /g, ':black_large_square:');
    })
    .join('\n');
}

console.log("\n--- Emoji Replacement Test (Standard Font) ---");
console.log(generateEmojiOutput('HI'));

console.log("\n--- Emoji Replacement Test (Banner Font) ---");
console.log(generateBannerEmojiOutput('HI'));