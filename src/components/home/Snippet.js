import React from "react";

function Snippet({ snippet }) {
  return (
    <div className="snippet">
      {snippet.title && <h2>{snippet.title}</h2>}
      {snippet.description && <h3>{snippet.description}</h3>}
      {snippet.code && (
        <pre>
          <code>{snippet.code}</code>
        </pre>
      )}
    </div>
  );
}

export default Snippet;
