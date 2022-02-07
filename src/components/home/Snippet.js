import axios from "axios";
import React from "react";
import "./Snippet.scss";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";

function Snippet({ snippet, getSnippets, editSnippet }) {
  async function deleteSnippet() {
    await axios.delete(`http://localhost:5000/snippet/${snippet._id}`);
    getSnippets();
  }

  return (
    <div className="snippet">
      {snippet.title && <h2 className="title">{snippet.title}</h2>}
      {snippet.description && (
        <h4 className="description">{snippet.description}</h4>
      )}
      {snippet.code && (
        <div className="code">
          <CodeMirror
            value={snippet.code}
            height="200px"
            options={{ theme: "dracula", mode: "jsx" }}
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
