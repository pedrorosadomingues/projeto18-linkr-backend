CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE metadata (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    description VARCHAR(255),
    "metadataId" INTEGER NOT NULL REFERENCES metadata(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "postId" INTEGER NOT NULL REFERENCES posts(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    "postId" INTEGER NOT NULL REFERENCES posts(id),
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "commentText" TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE hashtags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL UNIQUE,
    "timesUsed" INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE followers (
    id SERIAL PRIMARY KEY,
    followed INTEGER NOT NULL REFERENCES users(id),
    following INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE shares (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    "postId" INTEGER NOT NULL REFERENCES posts(id),
	"userName" TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);