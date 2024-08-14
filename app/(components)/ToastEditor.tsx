// ToastEditor.tsx
import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { Editor as ToastUIEditor, EditorProps } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

// Extend the Editor type to include getMarkdown
export interface ExtendedEditor extends ToastUIEditor {
  getMarkdown: () => string;
}

export type ToastEditorRef = {
  getInstance: () => ExtendedEditor;
};

const ToastEditor = forwardRef<ToastEditorRef, EditorProps>((props, ref) => {
  const editorRef = useRef<ToastUIEditor>(null);

  useImperativeHandle(ref, () => ({
    getInstance: () => {
      if (!editorRef.current) {
        throw new Error("Editor instance is not available");
      }
      return editorRef.current as ExtendedEditor;
    },
  }));

  return <ToastUIEditor {...props} ref={editorRef} />;
});

ToastEditor.displayName = "ToastEditor";

export default ToastEditor;
