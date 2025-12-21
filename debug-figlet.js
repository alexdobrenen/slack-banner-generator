import figlet from 'figlet';

// Log all available fonts to see what's actually there
console.log("All available fonts:", figlet.fontsSync());

// Try to generate with Banner font
try {
  console.log("\nTrying Banner font:");
  const banner = figlet.textSync("HI", {
    font: "Banner",
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });
  console.log(banner);
} catch (error) {
  console.error("Error with Banner font:", error);
}

// Try to generate with Standard font as fallback
try {
  console.log("\nTrying Standard font:");
  const standard = figlet.textSync("HI", {
    font: "Standard",
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });
  console.log(standard);
} catch (error) {
  console.error("Error with Standard font:", error);
}