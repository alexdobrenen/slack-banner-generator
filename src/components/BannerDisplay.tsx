import React from 'react';
import styled from 'styled-components';

interface BannerDisplayProps {
  banner: string;
  previewBanner: string;
  onCopyToClipboard: () => void;
}

const DisplayContainer = styled.div`
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 90%;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Heading = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
`;

const BannerCode = styled.pre`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-word;
  border: 1px solid #ddd;
  font-family: monospace;
  overflow-x: auto;
`;

const PreviewHeading = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
`;

const PreviewContainer = styled.div`
  background-color: #1a1d21; /* Slack dark mode color */
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
  overflow-x: auto;
`;

const PreviewText = styled.pre`
  font-family: monospace;
  white-space: pre-wrap;
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: 0;
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
    font-size: 1.2em;
    width: 1em;
    text-align: center;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4a154b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #611f69;
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
        <Heading>Banner Code:</Heading>
        <BannerCode>{displayBanner}</BannerCode>
        {banner && <Button onClick={onCopyToClipboard}>Copy to Clipboard</Button>}
      </Section>

      <Section>
        <PreviewHeading>Preview:</PreviewHeading>
        <PreviewContainer>
          <PreviewText>
            {previewBanner ? formatPreview(previewBanner) : "Preview will appear here after generating banner"}
          </PreviewText>
        </PreviewContainer>
      </Section>
    </DisplayContainer>
  );
};

export default BannerDisplay;