import React, { useEffect, useState } from "react";
import axios from "axios";
import Snippet from "./Snippet";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");

  useEffect(() => {
    getSnippets();
  }, []);

  async function getSnippets() {
    const snippetsRes = await axios.get("http://localhost:5000/snippet/");
    setSnippets(snippetsRes.data);
  }

  //sort snippets based on the updatedAt DB entry
  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return sortedSnippets.map((snippet, index) => {
      return <Snippet snippet={snippet} key={index} />;
    });
  }

  async function saveSnippet(e) {
    e.preventDefault();

    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      code: editorCode ? editorCode : undefined,
    };

    await axios.post("http://localhost:5000/snippet/", snippetData);

    getSnippets();
    closeEditor();
  }

  function closeEditor() {
    setNewSnippetEditorOpen(false);
    setEditorTitle("");
    setEditorDescription("");
    setEditorCode("");
  }

  return (
    <div className="home">
      {!newSnippetEditorOpen && (
        <button onClick={() => setNewSnippetEditorOpen(true)}>
          Add snippet
        </button>
      )}
      {newSnippetEditorOpen && (
        <div className="snippet-editor">
          <form onSubmit={saveSnippet}>
            <label htmlFor="editor-title">Title</label>
            <input
              id="editor-title"
              type="text"
              value={editorTitle}
              onChange={(e) => setEditorTitle(e.target.value)}
            />
            <label htmlFor="editor-description">Description</label>
            <input
              id="editor-description"
              type="text"
              value={editorDescription}
              onChange={(e) => setEditorDescription(e.target.value)}
            />
            <label htmlFor="editor-code">Code</label>
            <textarea
              id="editor-code"
              value={editorCode}
              onChange={(e) => setEditorCode(e.target.value)}
            />
            <button type="submit">Save snippet</button>
            <button type="button" onClick={closeEditor}>
              Cancel
            </button>
          </form>
        </div>
      )}
      {renderSnippets()}
    </div>
  );
}

export default Home;
