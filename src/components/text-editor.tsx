import React, { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './text-editor.css';

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header');
  let returnStatement = editing ? (
    <div ref={ref}>
      <MDEditor value={value} onChange={(v) => setValue(v || '')} />
    </div>
  ) : (
    <div className="card-content">
      <MDEditor.Markdown source={value} />
    </div>
  );
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      )
        return;
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);
  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      {returnStatement}
    </div>
  );
};

export default TextEditor;
