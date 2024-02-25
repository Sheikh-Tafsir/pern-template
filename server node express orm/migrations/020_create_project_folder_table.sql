CREATE TABLE project_folder (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_name VARCHAR(255),
    type VARCHAR(100),
    folder_structure JSON
);