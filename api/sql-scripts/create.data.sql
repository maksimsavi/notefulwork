DROP TABLE notes;
DROP TABLE folders;
CREATE TABLE IF NOT EXISTS notes (
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    modified TIMESTAMP DEFAULT now() NOT NULL,
    folder_id TEXT NOT NULL,
    content TEXT
);

CREATE TABLE IF NOT EXISTS folders (
    id TEXT NOT NULL,
    name TEXT NOT NULL
);