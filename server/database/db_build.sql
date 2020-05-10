BEGIN;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TABLE IF EXISTS group_users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS users CASCADE;




create table users (
	id VARCHAR(50) PRIMARY KEY,
	user_name VARCHAR(30),
	total_groups integer,
	picture VARCHAR(350),
	UNIQUE(id)
);


create table groups (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	description VARCHAR(200),
	course integer,
	participants integer,
	creator_id VARCHAR(50),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	FOREIGN KEY (creator_id) REFERENCES users(id),
	UNIQUE(name,course)
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON groups
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


create table group_users (
group_id integer,
user_id VARCHAR(50),
FOREIGN KEY (group_id) REFERENCES groups(id),
FOREIGN KEY (user_id) REFERENCES users(id),
UNIQUE(group_id,user_id)
);


create table messages (
id SERIAL PRIMARY KEY,
user_id VARCHAR(50),
group_id integer,
user_name VARCHAR(20),
message VARCHAR(255),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (group_id) REFERENCES groups(id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON messages
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


COMMIT;
