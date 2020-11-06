CREATE DATABASE sample;

CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    account_email VARCHAR(100) NOT NULL UNIQUE,
    account_password VARCHAR(50) NOT NULL,
    account_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE article (
    article_id SERIAL PRIMARY KEY,
    article_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    article_image VARCHAR(500),
    article_title VARCHAR(400) NOT NULL UNIQUE,
    article_image_alt VARCHAR(100) NOT NULL,
    article_post TEXT NOT NULL
);

CREATE TABLE review(
    review_id SERIAL PRIMARY KEY,
    account_id INTEGER,
    article_id INTEGER,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    review_message VARCHAR(255) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (account_id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES article (article_id) ON DELETE CASCADE
);

CREATE TABLE masterAccount (
    master_account_id SERIAL PRIMARY KEY,
    master_account_email VARCHAR(100) NOT NULL UNIQUE,
    master_account_password VARCHAR(50) NOT NULL,
    master_account_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);