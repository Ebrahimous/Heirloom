import { useEffect, useState } from 'react';

interface NarrationBlockProps {
  text: string;
  loading?: boolean;
}

export default function NarrationBlock({ text, loading }: NarrationBlockProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loading && text) {
      const timer = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [text, loading]);

  if (loading) {
    return (
      <div className="narration-block loading">
        <div className="loading-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (!text) return null;

  return (
    <div className={`narration-block ${visible ? 'visible' : ''}`}>
      <p>{text}</p>
    </div>
  );
}
