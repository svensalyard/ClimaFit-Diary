-- @block 
CREATE TABLE users_id (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    goals TEXT
)

-- @block
SELECT * FROM users_id;
                                               