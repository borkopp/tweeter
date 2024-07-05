-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Function to hash passwords
CREATE OR REPLACE FUNCTION hash_password(password TEXT)
RETURNS TEXT
AS $$
BEGIN
    RETURN crypt(password, gen_salt('bf')); 
END;
$$ LANGUAGE plpgsql;

-- Function to check passwords
CREATE OR REPLACE FUNCTION check_password(username TEXT, password TEXT)
RETURNS BOOLEAN
AS $$
DECLARE
    stored_password TEXT;
BEGIN
    SELECT users.password INTO stored_password FROM users WHERE users.username = check_password.username;
    RETURN stored_password = crypt(password, stored_password);
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically hash passwords before insertion
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
