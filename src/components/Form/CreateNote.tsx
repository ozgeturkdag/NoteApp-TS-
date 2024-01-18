import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type CreateNoteProps = {
  onSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const CreateNote = ({
  availableTags,
  onSubmit,
  createTag,
}: CreateNoteProps) => {
  return (
    <div className="container py-4">
      <h1>Create A New Note</h1>
      <NoteForm
        availableTags={availableTags}
        createTag={createTag}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CreateNote;
