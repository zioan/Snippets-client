import React, { useEffect, useState } from "react";
import axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  useEffect(() => {
    getSnippets();
  }, []);

  async function getSnippets() {
    const snippetsRes = await axios.get("http://localhost:5000/snippet/");
    setSnippets(snippetsRes.data);
  }

  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setSnippetEditorOpen(true);
  }

  //sort snippets based on the updatedAt DB entry
  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return sortedSnippets.map((snippet, index) => {
      return (
        <Snippet
          key={index}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  }

  return (
    <div className="home">
      {!snippetEditorOpen && (
        <button
          className="btn-editor-toggler"
          onClick={() => setSnippetEditorOpen(true)}
        >
          Add snippet
        </button>
      )}
      {snippetEditorOpen && (
        <SnippetEditor
          setSnippetEditorOpen={setSnippetEditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
        />
      )}
      {renderSnippets()}
    </div>
  );
}

export default Home;
