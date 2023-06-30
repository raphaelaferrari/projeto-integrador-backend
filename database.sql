-- Active: 1687903823478@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT (0) NOT NULL,
  dislikes INTEGER DEFAULT (0) NOT NULL,
  comments INTEGER DEFAULT (0) NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  FOREIGN KEY(creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE comments (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_comments_id TEXT NOT NULL, 
  post_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT (0) NOT NULL,
  dislikes INTEGER DEFAULT (0) NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  FOREIGN KEY(creator_comments_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY(post_id) REFERENCES posts(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

SELECT COUNT() FROM comments
WHERE post_id = "654531cc-10e3-4b29-b580-43b7a0899c81"
;

SELECT FROM * users;
CREATE TABLE likes_dislikes (
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE likes_dislikes_comments (
  user_id TEXT NOT NULL,
  comments_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (comments_id) REFERENCES comments (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO users (id, name, email, password, role)
VALUES
  -- tipo NORMAL e senha = fulano123
	('u001', 'Fulano', 'fulano@email.com', '$2a$12$qPQj5Lm1dQK2auALLTC0dOWedtr/Th.aSFf3.pdK5jCmYelFrYadC', 'NORMAL'),
  -- tipo NORMAL e senha = beltrana00
	('u002', 'Beltrana', 'beltrana@email.com', '$2a$12$403HVkfVSUbDioyciv9IC.oBlgMqudbnQL8ubebJIXScNs8E3jYe2', 'ADMIN');


DROP TABLE posts;
DROP TABLE users;
DROP TABLE comments;
DROP TABLE likes_dislikes;
DROP TABLE likes_dislikes_comments;

