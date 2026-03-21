-- ========================
-- TABLE: ROLES
-- ========================
CREATE TABLE IF NOT EXISTS roles (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- TABLE: DEPARTMENT
-- ========================
CREATE TABLE IF NOT EXISTS  department (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- TABLE: USERS
-- ========================
CREATE TABLE IF NOT EXISTS  users (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- TABLE: USER_PROFILES
-- ========================
CREATE TABLE IF NOT EXISTS user_profiles (
                      user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                      role_id INT,
                      department_id INT,
                      FOREIGN KEY (role_id) REFERENCES roles(id),
                      FOREIGN KEY (department_id) REFERENCES department(id),
                      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- ========================
-- TABLE: PERMISSION
-- ========================
CREATE TABLE IF NOT EXISTS  permission (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- TABLE: ROLE_PERMISSION
-- ========================
CREATE TABLE IF NOT EXISTS  role_permission (
                                 role_id INT NOT NULL REFERENCES roles(id),
                                 permission_id INT NOT NULL REFERENCES permission(id),
                                 PRIMARY KEY (role_id, permission_id)
);

-- ========================
-- TABLE: LEAVETYPE
-- ========================
CREATE TABLE IF NOT EXISTS  leave_type (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- TABLE: APPROVAL_STATUS
-- ========================
CREATE TABLE IF NOT EXISTS  approval_status (
                                 id SERIAL PRIMARY KEY,
                                 status VARCHAR(50) NOT NULL,
                                 created_at TIMESTAMP DEFAULT now(),
                                 updated_at TIMESTAMP DEFAULT now()
);

-- ========================
-- TABLE: LEAVE
-- ========================
CREATE TABLE IF NOT EXISTS  leave (
                       id SERIAL PRIMARY KEY,
                       user_id INT NOT NULL REFERENCES users(id),
                       leavetype_id INT NOT NULL REFERENCES leave_type(id),
                       approval_status_id INT NOT NULL REFERENCES approval_status(id),
                       start_date DATE NOT NULL,
                       end_date DATE NOT NULL,
                       reason TEXT,
                       approved_at TIMESTAMP,
                       approved_by INT REFERENCES users(id),
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE leave ADD COLUMN IF NOT EXISTS reason TEXT;

-- ========================
-- TABLE: ATTENDANCE
-- ========================
CREATE TABLE IF NOT EXISTS  attendance (
                            id SERIAL PRIMARY KEY,
                            user_id INT NOT NULL REFERENCES users(id),
                            work_date DATE NOT NULL,
                            clock_in TIMESTAMP,
                            clock_out TIMESTAMP,
                            modified_by INT REFERENCES users(id),
                            modified_at TIMESTAMP,
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);