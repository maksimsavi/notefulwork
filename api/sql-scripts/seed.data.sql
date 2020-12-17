BEGIN;

INSERT INTO notes (id, name, modified, folder_id, content)
VALUES
('1','first note',now(),'folderid1','note content');

INSERT INTO folders (id, name)
VALUES
('2','folder name one');

COMMIT;