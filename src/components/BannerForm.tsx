import { useState } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';

interface BannerFormProps {
  onGenerate: (text: string, wordEmoji: string, backgroundEmoji: string) => void;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto 30px;
  padding: 25px;
  background-color: var(--color-bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3), var(--glow-small);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(to right, var(--color-accent-primary), var(--color-accent-secondary));
    border-radius: 12px 12px 0 0;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  padding: 12px 15px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 16px;
  color: var(--color-text-primary);
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--color-accent-secondary);
    box-shadow: var(--glow-small);
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SuggestionWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;

  small {
    color: var(--color-text-secondary);
    margin-right: 4px;
  }
`;

const SuggestionTag = styled.span`
  display: inline-block;
  background-color: rgba(138, 43, 226, 0.15);
  color: var(--color-accent-secondary);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border: 1px solid rgba(138, 43, 226, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(138, 43, 226, 0.25);
    border-color: var(--color-accent-secondary);
    box-shadow: var(--glow-small);
    transform: translateY(-1px);
  }
`;

const Button = styled.button`
  padding: 14px;
  margin-top: 10px;
  font-size: 16px;
`;

const BannerForm: React.FC<BannerFormProps> = ({ onGenerate }) => {
  const [text, setText] = useState('');
  const [wordEmoji, setWordEmoji] = useState('');
  const [backgroundEmoji, setBackgroundEmoji] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text && wordEmoji && backgroundEmoji) {
      onGenerate(text, wordEmoji, backgroundEmoji);
    }
  };

  // Some example emoji suggestions
  const wordEmojiSuggestions = ['party_parrot', 'fire', 'star', 'sparkles', 'tada'];
  const backgroundEmojiSuggestions = ['black_large_square', 'blue_square', 'white_circle', 'black_circle'];

  const applyEmojiSuggestion = (type: 'word' | 'background', emoji: string) => {
    if (type === 'word') {
      setWordEmoji(emoji);
    } else {
      setBackgroundEmoji(emoji);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="text">Banner Text:</Label>
        <Input
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for your banner"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="wordEmoji">Text Emoji (without colons):</Label>
        <Input
          id="wordEmoji"
          type="text"
          value={wordEmoji}
          onChange={(e) => setWordEmoji(e.target.value)}
          placeholder="e.g., party_parrot"
          required
        />
        <SuggestionWrapper>
          <small>Suggestions: </small>
          {wordEmojiSuggestions.map(emoji => (
            <SuggestionTag
              key={emoji}
              onClick={() => applyEmojiSuggestion('word', emoji)}
            >
              {emoji}
            </SuggestionTag>
          ))}
        </SuggestionWrapper>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="backgroundEmoji">Background Emoji (without colons):</Label>
        <Input
          id="backgroundEmoji"
          type="text"
          value={backgroundEmoji}
          onChange={(e) => setBackgroundEmoji(e.target.value)}
          placeholder="e.g., black_large_square"
          required
        />
        <SuggestionWrapper>
          <small>Suggestions: </small>
          {backgroundEmojiSuggestions.map(emoji => (
            <SuggestionTag
              key={emoji}
              onClick={() => applyEmojiSuggestion('background', emoji)}
            >
              {emoji}
            </SuggestionTag>
          ))}
        </SuggestionWrapper>
      </FormGroup>

      <Button type="submit">Generate Banner</Button>
    </FormContainer>
  );
};

export default BannerForm;