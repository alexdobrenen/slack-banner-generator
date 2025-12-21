import { useState } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';

interface BannerFormProps {
  onGenerate: (text: string, wordEmoji: string, backgroundEmoji: string) => void;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SuggestionWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const SuggestionTag = styled.span`
  display: inline-block;
  background-color: #E8F5FA;
  color: #4a154b;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #D1E8F5;
  }
`;

const Button = styled.button`
  padding: 12px;
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