import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { Note, NoteData, RawNote, Tag } from "./types";
import { useLocaleStorage } from "./useLocaleStorage";
import { v4 } from "uuid";
import { useMemo } from "react";
import MainPage from "./components/MainPage";
import NoteDetail from "./components/NoteDetail";
import Layout from "./components/Layout";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  const addNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data,
          id: v4(),
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  };

  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    const updated = notes.map((note) =>
      note.id === id
        ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        : note
    );

    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage availableTags={tags} notes={noteWithTags} />}
        />

        <Route
          path="/new"
          element={
            <CreateNote
              availableTags={tags}
              createTag={createTag}
              onSubmit={addNote}
            />
          }
        />

        <Route path="/:id" element={<Layout notes={noteWithTags} />}>
          <Route index element={<NoteDetail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={updateNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
