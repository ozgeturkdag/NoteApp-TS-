import { Link } from "react-router-dom";
import { Note, Tag } from "../types";
import { Form, Button, Stack, Col, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import { useEffect, useMemo, useState } from "react";
import NoteCard from "./NoteCard";

type MainProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ availableTags, notes }: MainProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  // filter
  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          (note.title === "" ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => tag.id === noteTag.id)
            ))
        );
      }),
    [title, selectedTags, notes]
  );

  return (
    <div className="container py-5">
      {/* title */}
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notes</h1>

        <Link to={"/new"}>
          <Button>Create</Button>
        </Link>
      </Stack>

      {/* filter */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search by title</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Search by tag</Form.Label>
              <ReactSelect
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                isMulti
                className="shadow"
                options={availableTags.map((item) => ({
                  label: item.label,
                  value: item.id,
                }))}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* notes */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filtredNotes.map((note) => (
          <Col>
            <NoteCard key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
