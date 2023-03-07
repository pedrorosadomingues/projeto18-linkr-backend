CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    email VARCHAR(55) NOT NULL UNIQUE,
    password TEXT NOT NULL,
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

CREATE TABLE trends (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL UNIQUE,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
    id SERIAL NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);