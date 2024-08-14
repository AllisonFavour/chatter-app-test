// components/ToastEditor.tsx

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

type ToastEditorProps = React.ComponentProps<typeof Editor>;

export interface ToastEditorRef {
  getInstance: () => Editor;
}

const ToastEditor = forwardRef<ToastEditorRef, ToastEditorProps>(
  (props, ref) => {
    const editorRef = useRef<Editor>(null);

    useImperativeHandle(
      ref,
      () => ({
        getInstance: () => {
          if (editorRef.current) {
            return editorRef.current;
          }
          throw new Error("Editor instance is not available");
        },
      }),
      []
    );

    useEffect(() => {
      if (editorRef.current) {
        console.log("Editor has been initialized", editorRef.current);
      }
    }, []);

    return <Editor {...props} ref={editorRef} />;
  }
);

ToastEditor.displayName = "ToastEditor";

export default ToastEditor;
