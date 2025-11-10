import React, { useEffect, useState } from "react";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";

type Props = {
  value: string;
  onChange: (html: string) => void;
  className?: string;
};

export default function Editor({ value, onChange, className }: Props) {
  const [editorContent, setEditorContent] = useState(value);
  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  return <SimpleEditor className={className} />;
}
