```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
    date_of_birth DATE,
    salary DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, gender, date_of_birth, salary) VALUES
('Aarav', 'aarav@example.com', 'Male', '1995-05-14', 65000.00),
('Ananya', 'ananya@example.com', 'Female', '1990-11-23', 72000.00),
('Raj', 'raj@example.com', 'Male', '1988-02-17', 58000.00),
('Sneha', 'sneha@example.com', 'Female', '2000-08-09', 50000.00),
('Farhan', 'farhan@example.com', 'Male', '1993-12-30', 61000.00),
('Priyanka', 'priyanka@example.com', 'Female', '1985-07-12', 84000.00),
('Aisha', 'aisha@example.com', 'Female', '1997-03-25', 56000.00),
('Aditya', 'aditya@example.com', 'Male', '1992-06-17', 69000.00),
('Meera', 'meera@example.com', 'Female', '1989-09-05', 77000.00),
('Ishaan', 'ishaan@example.com', 'Male', '2001-10-02', 45000.00),
('Tanvi', 'tanvi@example.com', 'Female', '1994-04-18', 62000.00),
('Rohan', 'rohan@example.com', 'Male', '1986-12-01', 75000.00),
('Zoya', 'zoya@example.com', 'Female', '1998-01-15', 54000.00),
('Karan', 'karan@example.com', 'Male', '1990-08-22', 68000.00),
('Nikita', 'nikita@example.com', 'Female', '1987-03-10', 71000.00),
('Manav', 'manav@example.com', 'Male', '1996-11-29', 61000.00),
('Divya', 'divya@example.com', 'Female', '1991-02-28', 57000.00),
('Harshit', 'harshit@example.com', 'Male', '1993-09-09', 65000.00),
('Ritika', 'ritika@example.com', 'Female', '1999-05-05', 52000.00),
('Imran', 'imran@example.com', 'Male', '1995-07-30', 63000.00),
('Juhi', 'juhi@example.com', 'Female', '1992-10-14', 59000.00),
('Tushar', 'tushar@example.com', 'Male', '1990-01-08', 73000.00),
('Lata', 'lata@example.com', 'Female', '1984-11-11', 78000.00),
('Yash', 'yash@example.com', 'Male', '1997-06-06', 64000.00),
('Fatima', 'fatima@example.com', 'Female', '1993-03-03', 55000.00);



CREATE TABLE addresses (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
street VARCHAR(255),
city VARCHAR(100),
state VARCHAR(100),
pincode VARCHAR(10),
CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO addresses (user_id, street, city, state, pincode)
VALUES
(1, '221B MG Road', 'Mumbai', 'Maharashtra', '400001'),
(22, '14 Park Street', 'Kolkata', 'West Bengal', '700016'),
(3, '32 Residency Road', 'Bengaluru', 'Karnataka', '560025'),
(24, '5 North Usman Road', 'Chennai', 'Tamil Nadu', '600017'),
(5, '17 Hazratganj', 'Lucknow', 'Uttar Pradesh', '226001'),
(6, '55 Banjara Hills', 'Hyderabad', 'Telangana', '500034'),
(7, '88 Connaught Place', 'Delhi', 'Delhi', '110001'),
(8, '10 MG Marg', 'Dehradun', 'Uttarakhand', '248001'),
(9, '23 Brigade Road', 'Bengaluru', 'Karnataka', '560025'),
(10, '45 Marine Drive', 'Mumbai', 'Maharashtra', '400020'),
(11, '67 Ashoka Road', 'Delhi', 'Delhi', '110001'),
(12, '89 MG Road', 'Pune', 'Maharashtra', '411001'),
(13, '12 Brigade Road', 'Bengaluru', 'Karnataka', '560025'),
(14, '34 Park Street', 'Kolkata', 'West Bengal', '700016'),
(15, '56 Connaught Place', 'Delhi', 'Delhi', '110001'),
(16, '78 Marine Drive', 'Mumbai', 'Maharashtra', '400020'),
(17, '90 MG Marg', 'Dehradun', 'Uttarakhand', '248001'),
(18, '11 North Usman Road', 'Chennai', 'Tamil Nadu', '600017'),
(19, '33 Residency Road', 'Bengaluru', 'Karnataka', '560025'),
(20, '22 Hazratganj', 'Lucknow', 'Uttar Pradesh', '226001');
```

<br>

### Some Notes

1. To add string like 'he's' we add like 'he\'s'. Use the singla and double quote combination 

<br>

### For the database
```sql
SHOW DATABASES;  -- to show all the databases
CREATE DATABASE <database-name>; -- create the particluar database
DROP DATABASE <database-name>; -- To drop or delete a database:
USE <database-name>; -- To use a database or to go into particluar database
SELECT DATABASE(); -- To check which database you are working or which you have selected
```

<br>

### Data Types
```sql
-- for Date and Time
DATE  -- for date, format is yyyy-mm-dd
TIME -- for time
DATETIME -- for both date and time
SELECT CURTIME();    -- for cureent time
SELECT CURDATE();    -- for current date
SELECT NOW();        -- for current time stamp
eg INSERT INTO people (name, birthdate, birthtime, birthdt) VALUES ('Hazel', CURDATE(), CURTIME(), NOW());

-- below is to get day,date,month from timestamp
SELECT birthdate, DAY(birthdate), DAYOFWEEK(birthdate), DAYOFYEAR(birthdate) FROM people;
SELECT birthdate, MONTHNAME(birthdate), YEAR(birthdate) FROM people;
SELECT birthdt, MONTH(birthdt), DAY(birthdt), HOUR(birthdt), MINUTE(birthdt) FROM people;
SELECT birthdate, DATE_FORMAT(birthdate, '%a %b %D') FROM people;
SELECT birthdt, DATE_FORMAT(birthdt, 'BORN ON: %r') FROM people;
```

<br>

### Cover code example

```sql
-- Create a database
CREATE DATABASE codewithharry;
USE codewithharry;

-- Create a table
CREATE TABLE users (
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(100) UNIQUE,
 created_at TIMESTAMP DEFAULT
 CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email)
VALUES ('Harry', 'harry@cwh.dev');

-- Retrieve data
SELECT id, name, email
FROM users
WHERE id > 0;
```

<br>

### What is a Database?
A database is a container that stores related data in an organized way. In MySQL, a database holds one or more tables.

Think of it like:

#### Folder analogy:
- A database is like a folder.
- Each table is a file inside that folder.
- The rows in the table are like the content inside each file.

#### Excel analogy:
- A database is like an Excel workbook.
- Each table is a separate sheet inside that workbook.
- Each row in the table is like a row in Excel.

<br>

### Step 2: Create a Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

<br>

### Step 3: Drop the Database
You can delete the entire database (and all its tables) using:

```sql
DROP DATABASE startersql;
```

<br>

### Data Types Explained

- **INT** : Integer type, used for whole numbers.
- **VARCHAR(100)** : Variable-length string, up to 100 characters.
- **ENUM** : A string object with a value chosen from a list of permitted values.
- **DATE** : Stores date values.
- **TIMESTAMP** : Stores date and time, automatically set to the current timestamp.
- **BOOLEAN** : Stores TRUE or FALSE values.
- **DECIMAL(10, 2)** : Stores exact numeric data values, useful for financial data. The first number is the total number of digits, and the second is the number of digits after the decimal point.
- **UNSIGNED** : means number can not be negative, if used it also increased efficiency

<br>

### Constraints Explained

- **AUTO\_INCREMENT** : Automatically generates a unique number for each row.
- **PRIMARY KEY** : Uniquely identifies each row in the table. PRIMARY KEY means that column should be unique (we don't require NOT NULL in primary key)
- **NOT NULL** : Ensures a column cannot have a NULL value.
- **UNIQUE** : Ensures all values in a column are different.
- **DEFAULT** : Sets a default value for a column if no value is provided.
    ```sql
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
    ```

- **Check** - It checks the condition, on the basis of true(1) or false(0) runs the value
    ```sql
    CREATE TABLE users (
        username VARCHAR(20) NOT NULL,
        age INT CHECK (age > 0)
    );

    CREATE TABLE palindromes (
        word VARCHAR(100) CHECK(REVERSE(word) = word)
    )
    ```

<br>

### Selecting Data from a Table

```sql
SELECT * FROM users;
```

This fetches every column and every row from the users table.

<br>

### Select Specific Columns

```sql
SELECT name, email FROM users;
```

This only fetches the name and email columns from all rows.

<br>

### Renaming a Table

```sql
RENAME TABLE users TO customers;
```

To rename it back:

```sql
RENAME TABLE customers TO users;
```
<br>

### Altering a Table

ALTER TABLE - is used to add, delete, or modify columns in an existing table, also used to add and drop various constraints on an existing table.

#### Add a Column

```sql
ALTER TABLE users
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
```

`Keep in mind here true will be shown as 1 in is_active column`

#### Drop a Column

```sql
ALTER TABLE users
DROP COLUMN is_active;
```

#### Modify a Column Type

```sql
ALTER TABLE users
MODIFY COLUMN name VARCHAR(150);
```

#### Move a Column to the First Position

To move a column (e.g., email) to the first position:

```sql
ALTER TABLE users
MODIFY COLUMN email VARCHAR(100) FIRST;
```

#### Move a Column After Another Column

To move a column after another column (e.g., move gender after name):

```sql
ALTER TABLE users
MODIFY COLUMN gender ENUM('Male', 'Female', 'Other')
AFTER name;
```

#### Add Multiple Columns

```sql
ALTER TABLE users
ADD COLUMN phone VARCHAR(15),
ADD COLUMN city VARCHAR(100);
```

#### Rename a Column

```sql
ALTER TABLE users
RENAME COLUMN phone TO mobile_number;
```

<br>

### ALTER vs UPDATE

`ALTER` is a DDL (Data Definition Language) command.

It is used when you want to modify the table structure, such as:

- Adding a new column.
- Removing a column.
- Changing a column's datatype.
- Renaming a column.
- Adding constraints.

<br>

`UPDATE` is a DML (Data Manipulation Language) command.

It is used to modify existing records in a table without changing its structure.

Examples:

Update multiple columns:

```
UPDATE users
SET name = 'Amit Kumar',
    email = 'amit123@gmail.com'
WHERE id = 1;
```

**Key Differences**

| Feature                 | ALTER                  | UPDATE               |
| ----------------------- | ---------------------- | -------------------- |
| Category                | DDL                    | DML                  |
| Purpose                 | Modify table structure | Modify table data    |
| Changes columns         | Yes                    | No                   |
| Changes existing values | No                     | Yes                  |
| WHERE condition         | Generally not used     | Supported            |
| Example                 | Add a column           | Change a user's name |

<br>


<br>

### Insert Row Without Specifying Column Names (Full Row Insert)

This method requires you to provide values for all columns in order, except columns with default values or AUTO\_INCREMENT.

```sql
INSERT INTO users VALUES
(1, 'Alice', 'alice@example.com',
'Female', '1995-05-14', DEFAULT);
```

**Not recommended if your table structure might change later (e.g., new columns added later).**

<br>

### Insert by Specifying Column Names (Best Practice)

**This method is safer and more readable. You only insert into specific columns.**

```sql
INSERT INTO users
(name, email, gender, date_of_birth)
VALUES
('Bob', 'bob@example.com',
'Male', '1990-11-23');
```

#### Insert Multiple Rows at Once

You can insert multiple rows in a single query.

```sql
INSERT INTO users
(name, email, gender, date_of_birth)
VALUES
('Bob', 'bob@example.com',
'Male', '1990-11-23'),
('Charlie', 'charlie@example.com',
'Other', '1988-02-17');
```

The remaining columns like id (which is AUTO\_INCREMENT) and created\_at (which has a default value) are automatically handled by MySQL.

<br>

### Querying Data in MySQL using SELECT

```sql
SELECT column1, column2 FROM table_name;

SELECT * FROM users;
```

<br>

### Filtering Rows with WHERE and Equal

```sql
SELECT * FROM users
WHERE gender = 'Male';


-- Not Equal To
SELECT * FROM users
WHERE gender != 'Female';
-- OR

SELECT * FROM users
WHERE gender <> 'Female';

-- Greater Than / Less Than
SELECT * FROM users
WHERE date_of_birth < '1995-01-01';

SELECT * FROM users
WHERE id > 10;

SELECT * FROM users
WHERE id >= 5;

SELECT * FROM users
WHERE id <= 20;

-- IS NULL and IS NOT NULL
SELECT * FROM users
WHERE date_of_birth IS NULL;

SELECT * FROM users
WHERE date_of_birth IS NOT NULL;

-- BETWEEN
SELECT * FROM users
WHERE date_of_birth BETWEEN
'1990-01-01' AND '2000-12-31';


-- Pattern Matching & Sorting

-- 1. IN
SELECT * FROM users
WHERE gender IN ('Male', 'Other');

-- 2. LIKE (Pattern Matching)
SELECT * FROM users
WHERE name LIKE 'A%';
-- Starts with A

SELECT * FROM users
WHERE name LIKE '%a';
-- Ends with a

SELECT * FROM users
WHERE name LIKE '%li%';
-- Contains 'li'
```

<br>

### AND / OR

```sql
SELECT * FROM users
WHERE gender = 'Female'
AND date_of_birth > '1990-01-01';

SELECT * FROM users
WHERE gender = 'Male'
OR gender = 'Other';
```

<br>

### ORDER BY

```sql
SELECT * FROM users
ORDER BY date_of_birth ASC;

SELECT * FROM users
ORDER BY name DESC;

SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY 2   -- means sort the column2
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY <column1_name>,<column2_name>   -- means sort by column1 and when column1 have 2 values then sort it by column 2
```

<br>

### To select unique value from column

```sql
SELECT DISTINCT <column_name> FROM <table_name>
SELECT DISTINCT <column1_name>,<column2_name> FROM <table_name>  -- for distinct combination if column1 and column2
```

<br>

### LIMIT

```sql
SELECT * FROM users LIMIT 5;
-- Top 5 rows

SELECT * FROM users LIMIT 10 OFFSET 5;
-- Skip first 5 rows

SELECT * FROM users LIMIT 5, 10;
-- Get 10 rows
-- starting from the 6th row
```

<br>

### DISTINCT Keyword

DISTINCT is used to return only unique values.

```sql
SELECT DISTINCT gender FROM users;
```
Returns a list of unique gender values from the users table.

<br>

### UPDATE - Modifying Existing Data - Keep in mind WHERE is important

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

```sql
UPDATE users
SET name = 'Alicia'
WHERE id = 1;
```

#### Example: Update Multiple Columns

```sql
UPDATE users
SET name = 'Robert', email = 'robert@example.com'
WHERE id = 2;
```

#### Without WHERE Clause (Warning)

```sql
UPDATE users
SET gender = 'Other';
```

**This updates every row in the table. Be very careful when omitting the WHERE clause.**

#### eg Increase salary by ₹ 10,000 for all users whose salary is less than ₹ 60,000.

```sql
UPDATE users
SET salary = salary + 10000
WHERE salary < 60000;
```


```sql
-- keep in mind below is for joining the string, above was for number
UPDATE users SET name = concat('pradeep', name) WHERE id = 1;
```

<br>

### DELETE - Removing Data from a Table

```sql
DELETE FROM table_name
WHERE condition;
```

```sql
DELETE FROM users WHERE id = 3;

-- Delete Multiple Rows
DELETE FROM users WHERE gender = 'Other';

-- Delete All Rows (but keep table structure)
DELETE FROM users;

-- Drop the Entire Table (use with caution)
DROP TABLE users;
-- This removes the table structure and all data permanently.
```

<br>

### Best Practices

- Always use WHERE unless you're intentionally deleting everything.

- Run a SELECT query with the same condition first before deleting data.

- Always back up important data before performing destructive operations.


<br>

### MySQL Constraints

<br>

### 1. UNIQUE Constraint

Ensures that all values in a column are different.

#### Example (during table creation):

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE
);
```

#### Add UNIQUE using ALTER TABLE:

```sql
ALTER TABLE users
ADD CONSTRAINT unique_email
UNIQUE (email);
```

<br>

### 2. NOT NULL Constraint

Ensures that a column cannot contain NULL values.


```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
```

#### Change an existing column to NOT NULL:

```sql
ALTER TABLE users
MODIFY COLUMN name
VARCHAR(100) NOT NULL;
```

#### Make a column nullable again:

```sql
ALTER TABLE users
MODIFY COLUMN name
VARCHAR(100) NULL;
```

<br>

### 3. CHECK Constraint

Ensures that values in a column satisfy a specific condition.

#### Example: Allow only dates of birth after Jan 1, 2000

```sql
ALTER TABLE users
ADD CONSTRAINT chk_dob
CHECK (date_of_birth > '2000-01-01');
```

Naming the constraint (chk\_dob) helps if you want to drop it later.

<br>

### 4. DEFAULT Constraint

Sets a default value for a column if none is provided during insert.

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    is_active BOOLEAN DEFAULT TRUE
);
```

<br>

### Named Constraints - named constraints provide the named failed case, otherwise if we don't use it will show table_1 or table_2 failed

```sql
CREATE TABLE users2 (
    username VARCHAR(20) NOT NULL,
    age INT,
    CONSTRAINT age_not_negative CHECK (age >= 0)
);

CREATE TABLE palindromes2 (
  word VARCHAR(100),
  CONSTRAINT word_is_palindrome CHECK(REVERSE(word) = word)
);

-- Constraint with combination unique
CREATE TABLE companies (
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    CONSTRAINT name_address UNIQUE (name , address)
);

CREATE TABLE houses (
  purchase_price INT NOT NULL,
  sale_price INT NOT NULL,
  CONSTRAINT sprice_gt_pprice CHECK(sale_price >= purchase_price)
);
```

<br>

### 5. PRIMARY KEY Constraint

Uniquely identifies each row. Must be NOT NULL and UNIQUE.

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);
```
<br>

#### Add later with ALTER TABLE:

```sql
ALTER TABLE users
ADD PRIMARY KEY (id);
```

<br>

### 6. AUTO_INCREMENT

Used with PRIMARY KEY to automatically assign the next number.

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);
```

<br>

### SQL Functions (MySQL)

<br>

### COUNT()

```sql
SELECT COUNT(*) FROM users;
```

Count users who are Female:

```sql
SELECT COUNT(*) FROM users WHERE gender = 'Female';
```

<br>

### MIN() and MAX()

```sql
SELECT MIN(salary) AS min_salary,
MAX(salary) AS max_salary
FROM users;
```

<br>

### SUM()

```sql
SELECT SUM(salary) AS total_payroll FROM users;
```

<br>

### AVG()

```sql
SELECT AVG(salary) AS avg_salary FROM users;
```

<br>

### Grouping with GROUP BY

```sql
SELECT gender,
AVG(salary) AS avg_salary
FROM users
GROUP BY gender;
```

1. Every non-aggregated SELECT column must be in GROUP BY

```sql
SELECT name, AVG(salary)
FROM users
GROUP BY date_of_birth;
```

Why incorrect? Because multiple users can have the same date of birth, and SQL doesn't know which name to return.

```sql
SELECT date_of_birth, AVG(salary)
FROM users
GROUP BY date_of_birth;
```

2. Understand aggregate functions

```sql
SELECT
    gender,
    COUNT(*) AS total_users,
    AVG(salary) AS avg_salary,
    MAX(salary) AS highest_salary
FROM users
GROUP BY gender;
```

3. Use WHERE before GROUP BY

```sql
SELECT gender, AVG(salary)
FROM users
WHERE salary > 30000
GROUP BY gender;
```

4. Use HAVING to filter grouped results

```sql
SELECT gender, AVG(salary) AS avg_salary
FROM users
GROUP BY gender
HAVING AVG(salary) > 50000;
```

<br>

### LENGTH()

```sql
SELECT name, LENGTH(name) AS name_length FROM users;
```

<br>

### LOWER() and UPPER()

Convert names to lowercase or uppercase:

```sql
SELECT name,
LOWER(name) AS lowercase_name
FROM users;

SELECT name,
UPPER(name) AS uppercase_name
FROM users;
```

<br>

### SUBSTRING
It return the cut string, we can also use negative value
```sql
SELECT SUBSTRING(<column_name>,starting_point,length); eg SELECT SUBSTRING(title, 1, 10) AS 'short title' FROM books;
```

<br>

### REPLACE (str,from_str,to_str) --- This function is case sensitive

```sql
SELECT REPLACE(title, 'e ', '3') FROM books;
```

<br>

### CONCAT()

```sql
SELECT CONCAT(name, ' <', email, '>')
AS user_contact
FROM users;
```

<br>

### NOW()

Current date and time:

```sql
SELECT NOW();
```

<br>

### YEAR(), MONTH(), DAY()

Extract parts of date\_of\_birth:

```sql
SELECT name,
YEAR(date_of_birth) AS birth_year
FROM users;
```

<br>

### DATEDIFF()

Find number of days between today and birthdate:

```sql
SELECT name,
DATEDIFF(CURDATE(), date_of_birth)
AS days_lived
FROM users;
```

<br>

### TIMESTAMPDIFF()

Calculate age in years:

```sql
SELECT name,
TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE())
AS age
FROM users;
```

<br>

### ROUND(), FLOOR(), CEIL()

```sql
SELECT salary,
ROUND(salary) AS rounded,
FLOOR(salary) AS floored,
CEIL(salary) AS ceiled
FROM users;
```

<br>

### MOD()

Find even or odd user IDs:

```sql
SELECT id,
MOD(id, 2) AS remainder
FROM users;
```

<br>

### IF()

```sql
SELECT name,
gender,
IF(gender = 'Female', 'Yes', 'No')
AS is_female
FROM users;
```

<br>

### MySQL Transactions and AutoCommit

By default, MySQL operates in AutoCommit mode. This means that every SQL statement is treated as a transaction and is committed automatically. However, for more control over when changes are saved, you can turn AutoCommit off and manage transactions manually.

<br>

#### 1. Disabling AutoCommit

When AutoCommit is off, you can explicitly control when to commit or rollback changes.

<br>

```sql
-- To disable AutoCommit:
SET autocommit = 0;
```

This turns off AutoCommit, meaning that changes you make wonʼt be saved to the database unless you explicitly tell MySQL to commit them.

Important: Until you execute a COMMIT, your changes are not permanent.

<br>

#### 2. COMMIT: Save Changes to the Database

Once youʼve made changes and youʼre confident that everything is correct, you can use the COMMIT command to save those changes.

```sql
-- To commit a transaction:
COMMIT;
```

This saves all the changes made since the last COMMIT or ROLLBACK. After this point, the changes become permanent.

<br>

#### 3. ROLLBACK: Revert Changes to the Last Safe Point

If you make an error or decide you donʼt want to save your changes, you can rollback the transaction to its previous state.

<br>

#### To rollback a transaction:

```sql
ROLLBACK;
```

This undoes all changes since the last COMMIT or ROLLBACK.

<br>

### Example Workflow

1. Turn off AutoCommit:

```sql
SET autocommit = 0;
```

2. Make some changes (e.g., updating a salary):

```sql
UPDATE users
SET salary = 80000
WHERE id = 5;
```

3. Decide whether to commit or rollback:

1. If you are happy with the changes, run:

```sql
COMMIT;
```

2. If you are not happy and want to revert the changes, run:

```sql
ROLLBACK;
```

<br>

#### 4. Enabling AutoCommit Again

If you want to turn AutoCommit back on (so that every statement is automatically committed), you can do so with:

```sql
SET autocommit = 1;
```

### Best Practices

- Use COMMIT when you want to make changes permanent.

- Use ROLLBACK to discard changes if something goes wrong.

- Consider disabling AutoCommit when performing complex updates to avoid saving partial or incorrect data.

- Always test transaction queries carefully before applying them in production databases.


<br>

### Understanding PRIMARY KEY in MySQL

A PRIMARY KEY is a constraint in SQL that uniquely identifies each row in a table. It is one of the most important concepts in database design.

- Must be unique

- Cannot be NULL

- Is used to identify rows in a table

- Can be a single column or a combination of columns

- Each table can have only one primary key

### Example:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);
```


### How Is PRIMARY KEY Different from UNIQUE?

At first glance, PRIMARY KEY and UNIQUE might seem similar since both prevent duplicate values. But there are important differences:

| Feature | PRIMARY KEY | UNIQUE |
| --- | --- | --- |
| Must be unique | Yes | Yes |
| Allows NULL values | No | Yes (one or more NULLs allowed) |
| How many allowed | Only one per table | Can have multiple |
| Required by table | Recommended, often required | Optional |
| Dropping | Cannot be easily dropped | Can be dropped anytime |

<br>

### Dropping Keys

#### Can I Drop a PRIMARY KEY?

Yes, but it is more restricted than dropping a UNIQUE constraint.

```sql
ALTER TABLE users
DROP PRIMARY KEY;
```

This may fail if the primary key is being used elsewhere (like in a foreign key or auto\_increment column).

To drop a UNIQUE constraint:

```sql
ALTER TABLE users
DROP INDEX email;
```
<br>

### Auto Increment and Takeaways

In MySQL, a PRIMARY KEY is often used with the AUTO\_INCREMENT attribute to automatically generate unique values for new rows.

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);
```

This means that every time you insert a new row, MySQL will automatically assign a unique value to the id column.

```sql
ALTER TABLE users
AUTO_INCREMENT = 1000;
```

<br>

### Foreign Keys in MySQL

A foreign key is a column that creates a link between two tables. It ensures that the value in one table must match a value in another table.

**Imagine this scenario**: You have a users table. Now you want to store each userʼs address. Instead of putting address columns inside the users table, you create a separate addresses table, and link it to users using a foreign key.

<br>

### Creating a Table with a Foreign Key

Letʼs create an addresses table where each address belongs to a user.

```sql
CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);
```

<br>

### Managing Foreign Keys
- user\_id is a foreign key.
- It references the id column in the users table.
- This ensures that every address must be linked to a valid user.

<br>

### Dropping a Foreign Key

To drop a foreign key, you need to know its constraint name. MySQL auto-generates it if you donʼt specify one, or you can name it yourself.

```sql
CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);
```

To drop it:

```sql
ALTER TABLE addresses
DROP FOREIGN KEY fk_user;
```

<br>

### Adding a Foreign Key Later (Using ALTER)

Suppose the foreign key was not defined during table creation. You can add it later using ALTER TABLE:

```sql
ALTER TABLE addresses
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id);
```

<br>

### Adding ON DELETE Action

By default, if you delete a user that has related addresses, MySQL will throw an error. You can control this behavior with ON DELETE.

```sql
Example with ON DELETE CASCADE:
```

If you want addresses to be automatically deleted when the user is deleted:

```sql
CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```

<br>

### Other ON DELETE Options

| ON DELETE Option | Behavior |
| --- | --- |
| CASCADE | Deletes all related rows in child table |
| SET NULL | Sets the foreign key to NULL in the child table |
| RESTRICT | Prevents deletion of parent if child exists (default) |

<br>

### SQL JOINs in MySQL

In SQL, JOINs are used to combine rows from two or more tables based on related columns. Usually a foreign key in one table references a primary key in another.

Weʼll use the following two tables:

#### users table

| id | name |
| --- | --- |
| 1 | Aarav |
| 2 | Sneha |
| 3 | Raj |

#### addresses table

| id | user\_id | city |
| --- | --- | --- |
| 1 | 1 | Mumbai |
| 2 | 2 | Kolkata |
| 3 | 4 | Delhi |

Note: user\_id is a foreign key that references users.id.

<br>

### INNER JOIN

Returns only the matching rows from both tables.

```sql
SELECT users.name, addresses.city
FROM users
INNER JOIN addresses
ON users.id = addresses.user_id;
```

```sql
-- syntex of Inner join
SELECT *
FROM Table1
INNER JOIN Table2
ON ForeignKey = Primarykey
```

<br>

#### Output:

| name | city |
| --- | --- |
| Aarav | Mumbai |
| Sneha | Kolkata |

Raj is excluded because there is no matching address. Delhi is excluded because its user\_id (4) is not in users.

<br>

### LEFT JOIN

Returns all rows from the left table (users), and matching rows from the right table (addresses). If no match is found, NULLs are returned.

```sql
SELECT users.name, addresses.city
FROM users
LEFT JOIN addresses
ON users.id = addresses.user_id;
```

#### Output:

| name | city |
| --- | --- |
| Aarav | Mumbai |
| Sneha | Kolkata |
| Raj | NULL |

Raj is shown even though he doesnʼt have an address.

<br>

### RIGHT JOIN

Returns all rows from the right table (addresses), and matching rows from the left table (users). If no match is found, NULLs are returned.

```sql
SELECT users.name, addresses.city
FROM users
RIGHT JOIN addresses
ON users.id = addresses.user_id;
```

### Output:

| name | city |
| --- | --- |
| Aarav | Mumbai |
| Sneha | Kolkata |
| NULL | Delhi |

Delhi is shown even though it points to a user\_id that doesnʼt exist.

<br>

### SQL UNION and UNION ALL

The UNION operator in SQL is used to combine the result sets of two or more SELECT statements. It removes duplicates by default.

If you want to include all rows including duplicates, use `UNION ALL`.

<br>

#### Example Scenario

You already have a users table for active users. Now, weʼll create an admin\_users table to store users who are administrators or have special roles.

We will then combine the names from both tables using UNION.

#### Step 1: Create the admin_users Table

```sql
CREATE TABLE admin_users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    gender ENUM('Male', 'Female', 'Other'),
    date_of_birth DATE,
    salary INT
);
```

<br>

#### Step 2: Insert Sample Data into admin_users

```sql
INSERT INTO admin_users
(id, name, email, gender, date_of_birth, salary)
VALUES
(101, 'Anil Kumar', 'anil@example.com', 'Male', '1985-04-12', 60000),
(102, 'Pooja Sharma', 'pooja@example.com', 'Female', '1992-09-20', 58000),
(103, 'Rakesh Yadav', 'rakesh@example.com', 'Male', '1989-11-05', 54000),
(104, 'Fatima Begum', 'fatima@example.com', 'Female', '1990-06-30', 62000);
```

<br>

#### Step 3: Use UNION to Combine Data

Letʼs combine the active and admin user names.

```sql
SELECT name FROM users
UNION
SELECT name FROM admin_users;
```

This returns a single list of unique names from both tables.

<br>

### UNION ALL Example

If you want to keep duplicate names (if any), use UNION ALL.

```sql
SELECT name FROM users
UNION ALL
SELECT name FROM admin_users;
```

<br>

### Using More Than One Column

```sql
SELECT name, salary FROM users
UNION
SELECT name, salary FROM admin_users;
```

<br>

### Adding Separate Roles

```sql
SELECT name,
'User' AS role
FROM users
UNION
SELECT name,
'Admin' AS role
FROM admin_users;
```

<br>

### Using Order By with UNION

```sql
SELECT name FROM users
UNION
SELECT name FROM admin_users
ORDER BY name;
```

<br>

### Rules of UNION

1. The number of columns and their data types must match in all SELECT statements.
2. UNION removes duplicates by default.
3. UNION ALL keeps duplicates.

<br>

### Self JOIN in MySQL

A Self JOIN is a regular join, but the table is joined with itself.

This is useful when rows in the same table are related to each other. For example, when users refer other users, and we store the ID of the person who referred them in the same users table.

#### Step 1: Add a referred_by_id Column

Weʼll extend the existing users table to include a column called referred\_by\_id, which holds the id of the user who referred them.

```sql
ALTER TABLE users
ADD COLUMN referred_by_id INT;
```

This column:

- Will be NULL for users who were not referred.
- Will contain the id of another user who referred them.

#### Step 2: Insert Referral Data (Optional)

Assuming id = 1 is the first user, and referred others:

```sql
UPDATE users
SET referred_by_id = 1
WHERE id IN (2, 3);
-- User 1 referred Users 2 and 3
UPDATE users
SET referred_by_id = 2
WHERE id = 4;
-- User 2 referred User 4
```

#### Step 3: Use a Self JOIN to Get Referrer Names

We want to get each userʼs name along with the name of the person who referred them.

```sql
SELECT
    a.id,
    a.name AS user_name,
    b.name AS referred_by
FROM users a
LEFT JOIN users b
ON a.referred_by_id = b.id;
```

#### Explanation

- a  refers to the user being queried.
- b  refers to the user who referred them.
- LEFT JOIN is used so that users with NULL in referred\_by\_id are also included.

<br>

### MySQL Views

A view in MySQL is a virtual table based on the result of a SELECT query. It does not store data itself. It always reflects the current data in the base tables.

Views are useful when:

- You want to simplify complex queries
- You want to reuse logic
- You want to hide certain columns from users
- You want a “live snapshot” of filtered data


### Creating a View

Suppose we want a view that lists all users earning more than ₹ 70,000.

```sql
CREATE VIEW high_salary_users AS
SELECT id, name, salary
FROM users
WHERE salary > 70000;
```

#### Querying the View

```sql
SELECT * FROM high_salary_users;
```

This will return all users from the users table where salary is above ₹ 70,000.

<br>

### How Views Stay Updated

#### Step 1: View before update

```sql
SELECT * FROM high_salary_users;
```

Output:

| id | name | salary |
| --- | --- | --- |
| 2 | Sneha | 75000 |
| 5 | Fatima | 80000 |

#### Step 2: Update a userʼs salary

```sql
UPDATE users
SET salary = 72000
WHERE name = 'Raj';
```

*Views Automatically Reflect Changes*

#### Step 3: Query the view again

```sql
SELECT * FROM high_salary_users;
```

New Output:

| id | name | salary |
| --- | --- | --- |
| 2 | Sneha | 75000 |
| 5 | Fatima | 80000 |
| 3 | Raj | 72000 |

Notice how Raj is now included in the view. The view did not need to be updated. Thatʼs because views always reflect live data from the original table.

<br>

### Dropping a View

```sql
DROP VIEW high_salary_users;
```

<br>

### MySQL Indexes

Indexes in MySQL are used to speed up data retrieval. They work like the index of a book, helping the database engine find rows faster, especially for searches, filters, and joins.

1. PRIMARY KEY automatically creates an index
2. UNIQUE automatically creates an index
3. FOREIGN KEY can automatically create an index

#### Viewing Indexes on a Table

To see the indexes on a table, use:

```sql
SHOW INDEXES FROM users;
```

This shows all the indexes currently defined on the users table, including the automatically created primary key index.


#### Creating a Single-Column Index

Suppose you're frequently searching users by their email. You can speed this up by indexing the email column.

```sql
CREATE INDEX idx_email ON users(email);
```

#### What this does:

- Creates an index named idx\_email
- Improves performance of queries like:

```sql
SELECT * FROM users WHERE email = 'example@example.com';
```

<br>

### Working with Multi-Column Indexes

- Indexes consume extra disk space
- Indexes slow down INSERT, UPDATE, and DELETE operations slightly
- Use indexes only when needed (for columns used in WHERE, JOIN, and ORDER BY)

<br>

### Creating a Multi-Column Index

If you often query users using both gender and salary, a multi-column index is more efficient than separate indexes.

```sql
CREATE INDEX idx_gender_salary ON users(gender, salary);
```

#### Usage Example:

```sql
SELECT * FROM users
WHERE gender = 'Female' AND salary > 70000;
```

This query can take advantage of the combined index on gender and salary.


#### Index Order Matters

For a multi-column index on (gender, salary):

- This works efficiently:

```sql
WHERE gender = 'Female' AND salary > 70000
```

- But this may not use the index effectively:

```sql
WHERE salary > 70000
```

Because the first column in the index (gender) is missing in the filter.

<br>

#### Dropping an Index

To delete an index:

```sql
DROP INDEX idx_email ON users;
```

<br>

### Subqueries in MySQL

A subquery is a query nested inside another query. Subqueries are useful for breaking down complex problems into smaller parts.

They can be used in:

- SELECT statements
- WHERE clauses
- FROM clauses


```sql
SELECT id, name, salary
FROM users
WHERE salary > (
    SELECT AVG(salary) FROM users
);
```

<br>

### Subquery with IN

Now letʼs say we want to find users who have been referred by someone who earns more than ₹ 75,000.

```sql
SELECT id, name, referred_by_id
FROM users
WHERE referred_by_id IN (
    SELECT id FROM users WHERE salary > 75000
);
```

<br>

### GROUP BY and HAVING in MySQL

The GROUP BY clause is used to group rows that have the same values in specified columns. It is typically used with aggregate functions like COUNT, SUM, AVG, MIN, or MAX.

The HAVING clause is used to filter groups after aggregation. It is similar to how WHERE filters individual rows.

#### Example Table: users

Assume this is your users table:

| id | name | gender | salary | referred\_by\_id |
| --- | --- | --- | --- | --- |
| 1 | Aarav | Male | 80000 | NULL |
| 2 | Sneha | Female | 75000 | 1 |
| 3 | Raj | Male | 72000 | 1 |
| 4 | Fatima | Female | 85000 | 2 |
| 5 | Priya | Female | 70000 | NULL |

#### GROUP BY Example: Average Salary by Gender

```sql
SELECT gender, AVG(salary) AS average_salary
FROM users
GROUP BY gender;
```


#### WHERE in GROUP BY - It is added before group

Find how many users were referred by each user:

```sql
SELECT referred_by_id, COUNT(*) AS total_referred
FROM users
WHERE referred_by_id IS NOT NULL
GROUP BY referred_by_id;
```


#### HAVING Clause: Filtering Groups - It is added after group

Letʼs say we only want to show genders where the average salary is greater than ₹ 75,000.

```sql
SELECT gender, AVG(salary) AS avg_salary
FROM users
GROUP BY gender
HAVING AVG(salary) > 75000;
```

#### Why not WHERE?

- WHERE is used before grouping.

- HAVING is used after groups are formed. It is the only way to filter aggregated values.


#### Another Example: Groups with More Than 1 Referral

```sql
SELECT referred_by_id, COUNT(*) AS total_referred
FROM users
WHERE referred_by_id IS NOT NULL
GROUP BY referred_by_id
HAVING COUNT(*) > 1;
```

#### Important Summary

| Clause | Purpose | Can use aggregates? |
| --- | --- | --- |
| WHERE | Filters rows before grouping | No |
| GROUP BY | Groups rows based on column values | N/A |
| HAVING | Filters groups after aggregation | Yes |

Use GROUP BY to organize data, and HAVING to filter those groups based on aggregate conditions.

<br>

### ROLLUP

To get subtotals and grand totals, you can use ROLLUP:

```sql
SELECT gender, COUNT(*) AS total_users
FROM users
GROUP BY gender WITH ROLLUP;
```

This gives you a count of users by gender, along with a grand total for all users.

<br>

### Stored Procedures in MySQL

A stored procedure is a saved SQL block that can be executed later. It is useful for encapsulating logic that can be reused multiple times, such as queries, updates, or conditional operations.

### Why Change the Delimiter?

By default, MySQL uses ;  to end SQL statements.

But when defining stored procedures, we use ;  inside the procedure as well. This can confuse MySQL. To avoid this, we temporarily change the delimiter (e.g. to $$ or //) while creating the procedure.

#### Syntax for Creating a Stored Procedure

```sql
DELIMITER $$
CREATE PROCEDURE procedure_name()
BEGIN
    -- SQL statements go here
END$$
DELIMITER ;
```

After the procedure is created, we reset the delimiter back to ; .

<br>

### Creating a Procedure with Input Parameters

Letʼs say you want to create a stored procedure that inserts a new user into the users table.

#### Example:

```sql
DELIMITER $$
CREATE PROCEDURE AddUser(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_gender ENUM('Male', 'Female', 'Other'),
    IN p_dob DATE,
    IN p_salary INT
)
BEGIN
    INSERT INTO users (name, email, gender, date_of_birth, salary)
    VALUES (p_name, p_email, p_gender, p_dob, p_salary);
END$$
DELIMITER ;
```

This creates a procedure named AddUser that accepts five input parameters.

### Calling the Procedure

You can call the procedure using:

```sql
CALL AddUser('Kiran Sharma', 'kiran@example.com',
'Female', '1994-06-15', 72000);
```

This inserts the new user into the users table.

#### Notes

- Input parameters are declared using the IN keyword.
- Stored procedures are stored in the database and can be reused.

#### Viewing Stored Procedures

```sql
SHOW PROCEDURE STATUS WHERE Db = 'startersql';
```

#### Dropping a Stored Procedure

```sql
DROP PROCEDURE IF EXISTS AddUser;
```

### Summary

| Command | Purpose |
| --- | --- |
| DELIMITER $$ | Temporarily change statement delimiter |
| CREATE PROCEDURE | Defines a new stored procedure |
| CALL procedure\_name(...) | Executes a stored procedure |
| DROP PROCEDURE | Removes an existing procedure |


### Triggers in MySQL

A trigger is a special type of stored program that is automatically executed when a specific event occurs in a table, such as INSERT, UPDATE, or DELETE.

Triggers are commonly used for:

- Logging changes
- Enforcing additional business rules
- Automatically updating related data

#### Basic Trigger Structure

```sql
CREATE TRIGGER trigger_name
AFTER INSERT ON table_name
FOR EACH ROW
BEGIN
    -- statements to execute
END;
```

Triggers can be fired:

- BEFORE or AFTER an event
- On INSERT, UPDATE, or DELETE

<br>

### Scenario: Log Every New User Insertion

Suppose we want to log every time a new user is inserted into the users table.

Weʼll create a separate table called user\_log to store log entries.

#### Step 1: Create the Log Table

```sql
CREATE TABLE user_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Step 2: Create the Trigger

We now define a trigger that runs after a new user is added.

```sql
DELIMITER $$
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_log (user_id, name)
    VALUES (NEW.id, NEW.name);
END$$
DELIMITER ;
```

#### Explanation:

- AFTER INSERT means the trigger fires after the user is inserted.
- NEW refers to the new row being added to the users table.
- We insert the new userʼs ID and name into the user\_log table.


#### Step 3: Test the Trigger

```sql
CALL AddUser('Ritika Jain', 'ritika@example.com',
'Female', '1996-03-12', 74000);
```

Now check the user\_log table:

```sql
SELECT * FROM user_log;
```

You should see Ritikaʼs info automatically logged.

#### Dropping a Trigger

If you need to remove a trigger:

```sql
DROP TRIGGER IF EXISTS after_user_insert;
```

#### Summary

| Trigger Component | Description |
| --- | --- |
| BEFORE / AFTER | When the trigger runs |
| INSERT / UPDATE / DELETE | What kind of action triggers it |
| NEW.column | Refers to the new row (for INSERT, UPDATE) |
| OLD.column | Refers to the old row (for UPDATE, DELETE) |
| FOR EACH ROW | Executes for each affected row |

<br>

### TRUNCATE Keyword

TRUNCATE removes all rows from a table, but keeps the table structure.

```sql
TRUNCATE TABLE users;
```

- Faster than DELETE FROM users
- Cannot be rolled back in most cases

<br>

### CHANGE vs MODIFY Column

Both CHANGE and MODIFY are used to alter existing columns in a table.

#### CHANGE: Rename and change datatype

```sql
ALTER TABLE users
CHANGE COLUMN city location VARCHAR(150);
```

This renames city to location and changes its type.

#### MODIFY: Only change datatype

```sql
ALTER TABLE users
MODIFY COLUMN salary BIGINT;
```

This changes only the datatype of salary.

<br>

### Joining the two table. (many to many) - In this we create a additional table and add foreign key to both table

```sql
CREATE TABLE reviewers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE series (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    released_year YEAR,
    genre VARCHAR(100)
);

CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rating DECIMAL(2 , 1 ),
    series_id INT,
    reviewer_id INT,
    FOREIGN KEY (series_id)
        REFERENCES series (id),
    FOREIGN KEY (reviewer_id)
        REFERENCES reviewers (id)
);

INSERT INTO series (title, released_year, genre) VALUES
    ('Archer', 2009, 'Animation'),
    ('Arrested Development', 2003, 'Comedy'),
    ("Bob's Burgers", 2011, 'Animation'),
    ('Bojack Horseman', 2014, 'Animation'),
    ("Breaking Bad", 2008, 'Drama'),
    ('Curb Your Enthusiasm', 2000, 'Comedy'),
    ("Fargo", 2014, 'Drama'),
    ('Freaks and Geeks', 1999, 'Comedy'),
    ('General Hospital', 1963, 'Drama'),
    ('Halt and Catch Fire', 2014, 'Drama'),
    ('Malcolm In The Middle', 2000, 'Comedy'),
    ('Pushing Daisies', 2007, 'Comedy'),
    ('Seinfeld', 1989, 'Comedy'),
    ('Stranger Things', 2016, 'Drama');
 
 
INSERT INTO reviewers (first_name, last_name) VALUES
    ('Thomas', 'Stoneman'),
    ('Wyatt', 'Skaggs'),
    ('Kimbra', 'Masters'),
    ('Domingo', 'Cortes'),
    ('Colt', 'Steele'),
    ('Pinkie', 'Petit'),
    ('Marlon', 'Crafford');
    
 
INSERT INTO reviews(series_id, reviewer_id, rating) VALUES
    (1,1,8.0),(1,2,7.5),(1,3,8.5),(1,4,7.7),(1,5,8.9),
    (2,1,8.1),(2,4,6.0),(2,3,8.0),(2,6,8.4),(2,5,9.9),
    (3,1,7.0),(3,6,7.5),(3,4,8.0),(3,3,7.1),(3,5,8.0),
    (4,1,7.5),(4,3,7.8),(4,4,8.3),(4,2,7.6),(4,5,8.5),
    (5,1,9.5),(5,3,9.0),(5,4,9.1),(5,2,9.3),(5,5,9.9),
    (6,2,6.5),(6,3,7.8),(6,4,8.8),(6,2,8.4),(6,5,9.1),
    (7,2,9.1),(7,5,9.7),
    (8,4,8.5),(8,2,7.8),(8,6,8.8),(8,5,9.3),
    (9,2,5.5),(9,3,6.8),(9,4,5.8),(9,6,4.3),(9,5,4.5),
    (10,5,9.9),
    (13,3,8.0),(13,4,7.2),
    (14,2,8.5),(14,3,8.9),(14,4,8.9);
```

<br>

### Window function - window functions perform aggregate operations on groups of rows, but they produce a result FOR EACH ROW.
basically jab hum group by use karte h tab no of rows reduced ho jati h aut tab value milti h but windows wale case me value milti h but bina rows reduce hue

<br>

### over clasue - The OVER() clause constructs a window. When it's empty, the window will include all records

```sql
SELECT 
    emp_no, department, salary, MIN(salary), MAX(salary)
FROM
    employees;

-- below one do not reduce the column count
SELECT 
    emp_no, 
    department, 
    salary, 
    MIN(salary) OVER(),
    MAX(salary) OVER()
FROM employees;
```

<br>

### over(Partition by department) clasue - the concept remain same that row don't get reduced but the row having same name comes side by side

```sql
SELECT 
    emp_no, 
    department, 
    salary, 
    AVG(salary) OVER(PARTITION BY department) AS dept_avg,
    AVG(salary) OVER() AS company_avg
FROM employees;

-- over(Partition by department Order by ) clasue - within department, it sorted the row
SELECT 
    emp_no, 
    department, 
    salary, 
    SUM(salary) OVER(PARTITION BY department ORDER BY salary) AS rolling_dept_salary,
    SUM(salary) OVER(PARTITION BY department) AS total_dept_salary
FROM employees;

-- We have the rank() and row_number() in the over. row number count the number of rows. dense rank gives rank within rank
SELECT 
    emp_no, 
    department, 
    salary,
    ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary DESC) as dept_row_number,
    RANK() OVER(PARTITION BY department ORDER BY salary DESC) as dept_salary_rank,
    RANK() OVER(ORDER BY salary DESC) as overall_rank,
    DENSE_RANK() OVER(ORDER BY salary DESC) as overall_dense_rank,
    ROW_NUMBER() OVER(ORDER BY salary DESC) as overall_num
FROM employees ORDER BY overall_rank;



-- NTILE in Over -  Divide a partition into N groups
SELECT 
    emp_no, 
    department, 
    salary,
    NTILE(4) OVER(PARTITION BY department ORDER BY salary DESC) AS dept_salary_quartile,
	NTILE(4) OVER(ORDER BY salary DESC) AS salary_quartile
FROM employees;

-- First Value
SELECT 
    emp_no, 
    department, 
    salary,
    FIRST_VALUE(emp_no) OVER(PARTITION BY department ORDER BY salary DESC) as highest_paid_dept,
    FIRST_VALUE(emp_no) OVER(ORDER BY salary DESC) as highest_paid_overall
FROM employees;

-- LAG in values - LAG gives the previous or last value of row, LEAD gives the next value
SELECT 
    emp_no, 
    department, 
    salary,
    salary - LAG(salary) OVER(ORDER BY salary DESC) as salary_diff
FROM employees;
```

### Keep in mind CONSTRAINT is basically add on validation. means existing plus this one