import React, { useState } from 'react'
import styled from 'styled-components'
import BannerForm from './components/BannerForm'
import BannerDisplay from './components/BannerDisplay'
import { generateSimpleBanner, previewSimpleBanner } from './utils/simpleBannerGenerator'

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 15px;
  letter-spacing: 2px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 3px;
    background: linear-gradient(to right, transparent, var(--color-accent-primary), transparent);
    box-shadow: 0 0 5px var(--color-accent-primary);
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  margin-top: 15px;
`;

function App() {
  const [banner, setBanner] = useState<string>('');
  const [preview, setPreview] = useState<string>('');

  // For debugging purposes only - generate a test banner on component mount
  React.useEffect(() => {
    try {
      // Generate a test banner to verify functionality
      const testText = 'HI';
      const testWordEmoji = 'tada';
      const testBgEmoji = 'black_large_square';

      console.log(`Testing banner generation with: text="${testText}", wordEmoji="${testWordEmoji}", backgroundEmoji="${testBgEmoji}"`);
      const testBanner = generateSimpleBanner(testText, testWordEmoji, testBgEmoji);
      console.log('Test banner generation succeeded:', testBanner.substring(0, 100) + '...');
    } catch (error) {
      console.error('Test banner generation failed:', error);
    }
  }, []);

  const handleGenerateBanner = (text: string, wordEmoji: string, backgroundEmoji: string) => {
    console.log(`App: Generating banner with: text="${text}", wordEmoji="${wordEmoji}", backgroundEmoji="${backgroundEmoji}"`);

    try {
      // Call the banner generator
      const generatedBanner = generateSimpleBanner(text, wordEmoji, backgroundEmoji);
      console.log("App: Generated banner length:", generatedBanner.length);
      console.log("App: Banner first 100 chars:", generatedBanner.substring(0, 100));

      // Update state with the generated banner
      console.log("App: Setting banner in state");
      setBanner(generatedBanner);

      // Generate and set preview
      console.log("App: Generating preview");
      const previewContent = previewSimpleBanner(generatedBanner);
      console.log("App: Preview length:", previewContent.length);
      console.log("App: Preview first 100 chars:", previewContent.substring(0, 100));
      setPreview(previewContent);

      console.log("App: Banner generation and preview complete");
    } catch (error) {
      console.error("App: Error during banner generation:", error);
      setBanner("Error generating banner");
      setPreview("Error generating banner preview");
    }
  };

  const handleCopyToClipboard = () => {
    if (banner) {
      navigator.clipboard.writeText(banner)
        .then(() => {
          alert('Banner copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy banner: ', err);
          alert('Failed to copy banner. Please try again.');
        });
    }
  };

  // Log banner state for debugging
  React.useEffect(() => {
    console.log("App render - Banner state:", banner ? `Length: ${banner.length}` : "empty");
    console.log("App render - Preview state:", preview ? `Length: ${preview.length}` : "empty");
  }, [banner, preview]);

  return (
    <AppContainer>
      <Header>
        <Title>Slackmoji Banner Generator</Title>
        <Subtitle>Annoy your coworkers with flashy Slack message banners</Subtitle>
      </Header>

      <BannerForm onGenerate={handleGenerateBanner} />

      {/* Always render the banner display for debugging */}
      <BannerDisplay
        banner={banner}
        previewBanner={preview}
        onCopyToClipboard={handleCopyToClipboard}
      />
    </AppContainer>
  )
}

export default App
