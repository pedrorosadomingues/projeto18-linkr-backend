CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    email VARCHAR(55) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT 'https://img1.gratispng.com/20180722/ybz/kisspng-user-profile-2018-in-sight-user-conference-expo-5b554c09380f76.0349129615323166812296.jpg',
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
    "metadataId" INTEGER NOT NULL REFERENCES metadata(id)
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



