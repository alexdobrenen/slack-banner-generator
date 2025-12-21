import React from 'react';
import styled from 'styled-components';

interface BannerDisplayProps {
  banner: string;
  previewBanner: string;
  onCopyToClipboard: () => void;
}

const DisplayContainer = styled.div`
  margin: 30px auto;
  padding: 0;
  max-width: 1100px;
  width: 98%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
`;

const Section = styled.div`
  position: relative;
  background-color: var(--color-bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Heading = styled.h3`
  margin: 0;
  padding: 15px 20px;
  font-weight: 600;
  font-size: 1.2rem;
  color: white;
  background: linear-gradient(to right, var(--color-accent-primary), var(--color-accent-secondary));
  border-bottom: 1px solid var(--color-accent-primary);
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const BannerCode = styled.pre`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'Fira Code', 'Consolas', monospace;
  overflow-x: auto;
  color: var(--color-text-primary);
  line-height: 1.5;
  font-size: 14px;
  border-radius: 0;
`;

const PreviewHeading = styled(Heading)`
  background: linear-gradient(to right, var(--color-accent-secondary), var(--color-accent-primary));
`;

const PreviewContainer = styled.div`
  flex: 1;
  background-color: #1a1d21; /* Slack dark mode color */
  padding: 30px 20px;
  overflow-x: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px; /* Ensure a good size for the preview */
`;

const PreviewText = styled.pre`
  font-family: 'Fira Code', 'Consolas', monospace;
  white-space: pre-wrap;
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
  color: white;

  /* Ensure lines maintain structure */
  & > div {
    display: flex;
    height: 1.5em;
    line-height: 1.5em;
    flex-wrap: nowrap;
  }

  /* Make emojis display at the right size and alignment */
  .emoji {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    width: 1em;
    text-align: center;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
  }
`;

const ButtonContainer = styled.div`
  padding: 15px 20px;
  border-top: 1px solid var(--color-border);
  background-color: rgba(0, 0, 0, 0.1);
  text-align: right;
`;

const Button = styled.button`
  &:active {
    transform: translateY(2px);
  }
`;

const BannerDisplay: React.FC<BannerDisplayProps> = ({
  banner,
  previewBanner,
  onCopyToClipboard
}) => {
  console.log("BannerDisplay: Rendering with banner:", banner ? banner.length + " chars" : "null/undefined");
  console.log("BannerDisplay: Preview banner:", previewBanner ? previewBanner.length + " chars" : "null/undefined");

  // Don't return early, always render something for debugging
  const displayBanner = banner || "No banner generated yet. Please enter text and emojis above and click 'Generate Banner'.";

  // Helper function to wrap emojis in spans for better styling
  const formatPreview = (previewText: string) => {
    console.log("formatPreview: Processing preview text of length:", previewText.length);

    if (!previewText) {
      console.log("formatPreview: Empty preview text");
      return <div>No preview available</div>;
    }

    // Split by newlines first to preserve line structure
    const lines = previewText.split('\n');
    console.log(`formatPreview: Split into ${lines.length} lines`);

    return lines.map((line, lineIndex) => {
      // For each line, replace emojis with spans
      const formattedLine = Array.from(line).map((char, charIndex) => {
        // Check if character is an emoji (simple approach - might need refinement)
        const isEmoji = char.codePointAt(0) ? char.codePointAt(0)! > 127 : false;
        return isEmoji ?
          <span key={`${lineIndex}-${charIndex}`} className="emoji">{char}</span> :
          char;
      });

      // Return the line wrapped in a div with a unique key
      return <div key={`line-${lineIndex}`}>{formattedLine}</div>;
    });
  };

  return (
    <DisplayContainer>
      <Section>
        <PreviewHeading>Preview:</PreviewHeading>
        <PreviewContainer>
          <PreviewText>
            {previewBanner ? formatPreview(previewBanner) : "Preview will appear here after generating banner"}
          </PreviewText>
        </PreviewContainer>
      </Section>

      <Section>
        <Heading>Banner Code:</Heading>
        <BannerCode>{displayBanner}</BannerCode>
        {banner && (
          <ButtonContainer>
            <Button onClick={onCopyToClipboard}>Copy to Clipboard</Button>
          </ButtonContainer>
        )}
      </Section>
    </DisplayContainer>
  );
};

export default BannerDisplay;