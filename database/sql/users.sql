-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- function to hash passwords
CREATE OR REPLACE FUNCTION hash_password(password TEXT)
RETURNS TEXT
AS $$
BEGIN
    RETURN crypt(password, gen_salt('bf'));
END;
$$ LANGUAGE plpgsql;

-- function to check passwords
CREATE OR REPLACE FUNCTION check_password(username TEXT, password TEXT)
RETURNS BOOLEAN
AS $$
DECLARE
    stored_password TEXT;
BEGIN
    SELECT password FROM users WHERE users.username = check_password.username INTO stored_password;
    RETURN stored_password = crypt(password, stored_password);
END;
$$ LANGUAGE plpgsql;

-- trigger to automatically hash passwords before insertion
CREATE OR REPLACE FUNCTION trigger_hash_password_on_insert()
RETURNS TRIGGER
AS $$
BEGIN
    NEW.password := hash_password(NEW.password);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hash_password_on_insert
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_hash_password_on_insert();
