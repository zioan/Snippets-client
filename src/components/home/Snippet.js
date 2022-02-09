import axios from "axios";
import React from "react";
import "./Snippet.scss";
import CodeEditor from "@uiw/react-textarea-code-editor";
import domain from "../../util/domain";

function Snippet({ snippet, getSnippets, editSnippet }) {
  async function deleteSnippet() {
    if (window.confirm("Do you want to delete this snippet?")) {
      await axios.delete(`${domain}/snippet/${snippet._id}`);
      getSnippets();
    }
  }

  return (
    <div className="snippet">
      {snippet.title && <h2 className="title">{snippet.title}</h2>}
      {snippet.description && (
        <h4 className="description">{snippet.description}</h4>
      )}
      {snippet.code && (
        <div className="code">
          <CodeEditor
            value={snippet.code}
            language="js"
            placeholder="Please enter your code."
            padding={15}
            style={{
              fontSize: 16,
              color: "#dddddd",
              backgroundColor: "#222",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
      )}
      <button className="btn-edit" onClick={() => editSnippet(snippet)}>
        Edit
      </button>
      <button className="btn-delete" onClick={deleteSnippet}>
        Delete
      </button>
    </div>
  );
}

export default Snippet;
