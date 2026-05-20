CREATE TABLE 
    IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        first_name VARCHAR(255) UNIQUE,
        last_name VARCHAR(255) NULL,
        username VARCHAR(255) UNIQUE,
        password VARCHAR(60),
        role VARCHAR(255),
        created_at DATETIME
    );

INSERT INTO
    users (
        id,
        first_name,
        last_name,
        username,
        password,
        role,
        created_at
    )
VALUES
    (
        '1c83c337-1061-4238-8dc7-0fd0c517fd6f',
        'administrator',
        '',
        'admin',
        '$2a$12$0QA8wKEc/F4yS32dbglgSeW98z06x8b4p7ySwLvybDTdWfaQ3k6ke',
        'admin',
        NOW()
    );