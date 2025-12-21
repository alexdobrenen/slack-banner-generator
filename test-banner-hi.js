import figlet from 'figlet';

// Test inputs from the screenshot
const text = "hi";
const wordEmoji = "fire";
const backgroundEmoji = "black_large_square";

// Generate figlet output
try {
  const figletOutput = figlet.textSync(text, {
    font: 'Banner',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80
  });

  console.log("Raw figlet output:");
  console.log(figletOutput);

  // Process the output to create a banner
  const processedOutput = figletOutput
    .split('\n')
    .map(line => {
      const lineWithLeadingSpace = ' ' + line;
      return lineWithLeadingSpace
        .replace(/#/g, `:${wordEmoji}:`)
        .replace(/ /g, `:${backgroundEmoji}:`);
    })
    .join('\n');

  console.log("\nProcessed banner:");
  console.log(processedOutput);

} catch (error) {
  console.error("Error:", error);
}