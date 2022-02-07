import axios from "axios";
import React from "react";
import "./Snippet.scss";

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
        <pre className="code">
          <code>{snippet.code}</code>
        </pre>
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
