CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    email VARCHAR(55) NOT NULL UNIQUE,
    password VARCHAR(55) NOT NULL,
    "imageUrl" TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "postId" INTEGER NOT NULL REFERENCES posts(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE hashtags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (name, email, password) VALUES ('Pedro', 'pedro@email.com', '123456');
INSERT INTO hashtags (name, "userId") VALUES ('#linkr', 1);
SELECT * FROM hashtags order by "timesUsed" desc limit 10;
