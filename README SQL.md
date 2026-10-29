## Contents

- [Cover](#page-1)
- [Chapter 01: Installing MySQL](#page-2)
- [Chapter 02: Linux (Ubuntu) Installation](#page-3)
- [Chapter 03: Getting Started with MySQL](#page-5)
- [Chapter 04: Working with Tables in MySQL](#page-8)
- [Chapter 05: Inserting Data into MySQL Tables](#page-11)
- [Chapter 06: Querying Data in MySQL using SELECT](#page-14)
- [Chapter 07: UPDATE - Modifying Existing Data](#page-20)
- [Chapter 08: DELETE - Removing Data from a Table](#page-23)
- [Chapter 09: MySQL Constraints](#page-26)
- [Chapter 10: SQL Functions (MySQL)](#page-31)
- [Chapter 11: MySQL Transactions and AutoCommit](#page-37)
- [Chapter 12: Understanding PRIMARY KEY in MySQL](#page-40)
- [Chapter 13: Foreign Keys in MySQL](#page-44)
- [Chapter 14: SQL JOINs in MySQL](#page-49)
- [Chapter 15: SQL UNION and UNION ALL](#page-53)
- [Chapter 16: Self JOIN in MySQL](#page-57)
- [Chapter 17: MySQL Views](#page-60)
- [Chapter 18: MySQL Indexes](#page-64)
- [Chapter 19: Subqueries in MySQL](#page-67)
- [Chapter 20: GROUP BY and HAVING in MySQL](#page-70)
- [Chapter 21: Stored Procedures in MySQL](#page-73)
- [Chapter 22: Triggers in MySQL](#page-76)
- [Chapter 23: More on MySQL](#page-79)

---

<a id="page-1"></a>
## Cover — PDF page 1

**CodeWithHarry**

**ULTIMATE MySQL HANDBOOK**

YOUR COMPLETE GUIDE TO MYSQL FROM BASICS TO ADVANCED DATABASE MANAGEMENT

- CLEAR EXPLANATIONS
- PRACTICAL EXAMPLES
- REAL-WORLD PROJECTS
- BEST PRACTICES AND TIPS
- PERFECT FOR BEGINNERS TO ADVANCED
- EASY TO UNDERSTAND CONCEPTS
- HANDS-ON SQL QUERIES
- RELATIONAL DATABASE FUNDAMENTALS
- OPTIMIZE AND SCALE YOUR DATABASES
- SECURE YOUR DATA AND PERFORMANCE

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

**CODE. PRACTICE. BUILD. REPEAT.**

---

<a id="page-2"></a>

## Installing MySQL

**CHAPTER 01 · PDF page 2**

*Beginner Friendly Database Guide*

### What is MySQL Workbench?

MySQL Workbench is a visual tool used for database development and administration. It helps developers and database administrators design databases, write SQL queries, manage servers, create backups, and monitor database performance.

It provides an easy graphical interface for working with MySQL databases without relying completely on command line tools.

### What is a Database Management System (DBMS)?

A Database Management System (DBMS) is software that allows users to create, store, organize, retrieve, and manage data efficiently.

It acts as a bridge between users and databases, making it easier to handle large amounts of information securely and systematically.

### Features of MySQL

1. Open source and free to use database system.
2. High performance and reliable database engine.
3. Works on Windows, Linux, and macOS systems.
4. Provides strong security and user authentication features.

### Windows / macOS Installation

1. Download from: https://dev.mysql.com/downloads/installer/

2. Run the installer and choose Developer Default

3. Follow the setup wizard instructions

4. Set a root password when prompted

5. Install MySQL Workbench for GUI-based management

6. Complete the installation and launch MySQL Workbench

---

<a id="page-3"></a>

## Linux (Ubuntu) Installation

**CHAPTER 02 · PDF page 3**

*MySQL Server Setup Guide*

### Installing MySQL on Ubuntu

Follow these steps to install MySQL Server and create a new database user.

### Step 1: Update Package Index

**TERMINAL COMMAND**

```bash
sudo apt update
```

### Step 2: Install MySQL Server

**TERMINAL COMMAND**

```bash
sudo apt install mysql-server
```

### Step 3: Secure the Installation

**TERMINAL COMMAND**

```bash
sudo mysql_secure_installation
```

Choose your preferred security options during setup.

### Step 4: Create a User 'harry'@'localhost'

Log into MySQL:

**MYSQL LOGIN**

```bash
sudo mysql
```

---

<a id="page-4"></a>

## SQL User Commands

**CHAPTER 02 · PDF page 4**

*Creating a MySQL User*

### Run the following SQL Commands

**SQL COMMANDS**

```sql
CREATE USER 'harry'@'localhost'
IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO
'harry'@'localhost'
WITH GRANT OPTION;

FLUSH PRIVILEGES;

EXIT;
```

### Step 5: Test Login

**TERMINAL COMMAND**

```bash
mysql -u harry -p
```

Enter the password: password

Make sure to replace 'password' with a secure password of your choice in production environments.

---

<a id="page-5"></a>

## Getting Started with MySQL

**CHAPTER 03 · PDF page 5**

*Database Basics and Table Creation*

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

### Step 1: Create a Database

**SQL COMMAND**

```sql
CREATE DATABASE startersql;
```

After creating the database, either:

- Right-click it in MySQL Workbench and select "Set as Default Schema"

- Use this SQL command:

**SQL COMMAND**

```sql
USE startersql;
```

---

<a id="page-6"></a>

## Creating Tables in MySQL

**CHAPTER 03 · PDF page 6**

*Understanding Tables and Data Types*

### Step 2: Create a Table

Now we'll create a simple users table:

**SQL COMMAND**

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

### Step 3: Drop the Database

You can delete the entire database (and all its tables) using:

**SQL COMMAND**

```sql
DROP DATABASE startersql;
```

### Data Types Explained

- INT : Integer type, used for whole numbers.

- VARCHAR(100) : Variable-length string, up to 100 characters.

- ENUM : A string object with a value chosen from a list of permitted values.

- DATE : Stores date values.

---

<a id="page-7"></a>

## Data Types & Constraints

**CHAPTER 03 · PDF page 7**

*Understanding MySQL Data Structures*

### More Data Types

- TIMESTAMP : Stores date and time, automatically set to the current timestamp.

- BOOLEAN : Stores TRUE or FALSE values.

- DECIMAL(10, 2) : Stores exact numeric data values, useful for financial data. The first number is the total number of digits, and the second is the number of digits after the decimal point.

### Constraints Explained

- AUTO\_INCREMENT : Automatically generates a unique number for each row.

- PRIMARY KEY : Uniquely identifies each row in the table.

- NOT NULL : Ensures a column cannot have a NULL value.

- UNIQUE : Ensures all values in a column are different.

- DEFAULT : Sets a default value for a column if no value is provided.

**EXAMPLE**

```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
is_active BOOLEAN DEFAULT TRUE
```

---

<a id="page-8"></a>

## Working with Tables in MySQL

**CHAPTER 04 · PDF page 8**

*Selecting and Renaming Tables*

### Selecting Data from a Table

#### Select All Columns

**SQL COMMAND**

```sql
SELECT * FROM users;
```

This fetches every column and every row from the users table.

#### Select Specific Columns

**SQL COMMAND**

```sql
SELECT name, email FROM users;
```

This only fetches the name and email columns from all rows.

### Renaming a Table

To rename an existing table:

**SQL COMMAND**

```sql
RENAME TABLE users TO customers;
```

To rename it back:

**SQL COMMAND**

```sql
RENAME TABLE customers TO users;
```

---

<a id="page-9"></a>

## Altering Tables in MySQL

**CHAPTER 04 · PDF page 9**

*Modifying Existing Table Structure*

### Altering a Table

You can use ALTER TABLE to modify an existing table.

#### Add a Column

**SQL COMMAND**

```sql
ALTER TABLE users
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
```

#### Drop a Column

**SQL COMMAND**

```sql
ALTER TABLE users
DROP COLUMN is_active;
```

#### Modify a Column Type

**SQL COMMAND**

```sql
ALTER TABLE users
MODIFY COLUMN name VARCHAR(150);
```

### Move a Column to the First Position

To move a column (e.g., email) to the first position:

**SQL COMMAND**

```sql
ALTER TABLE users
MODIFY COLUMN email VARCHAR(100) FIRST;
```

---

<a id="page-10"></a>

## Advanced Table Modifications

**CHAPTER 04 · PDF page 10**

*Managing Column Position and Structure*

### Move a Column After Another Column

To move a column after another column (e.g., move gender after name):

**SQL COMMAND**

```sql
ALTER TABLE users
MODIFY COLUMN gender ENUM('Male', 'Female', 'Other')
AFTER name;
```

### Add Multiple Columns

You can also add multiple columns in a single query.

**SQL COMMAND**

```sql
ALTER TABLE users
ADD COLUMN phone VARCHAR(15),
ADD COLUMN city VARCHAR(100);
```

### Rename a Column

Use RENAME COLUMN to change a column name.

**SQL COMMAND**

```sql
ALTER TABLE users
RENAME COLUMN phone TO mobile_number;
```

---

<a id="page-11"></a>

## Inserting Data into MySQL Tables

**CHAPTER 05 · PDF page 11**

*Adding Records Using INSERT INTO*

To add data into a table, we use the INSERT INTO statement.

### Insert Without Specifying Column Names (Full Row Insert)

This method requires you to provide values for all columns in order, except columns with default values or AUTO\_INCREMENT.

**SQL COMMAND**

```sql
INSERT INTO users VALUES
(1, 'Alice', 'alice@example.com',
'Female', '1995-05-14', DEFAULT);
```

Not recommended if your table structure might change later (e.g., new columns added later).

### Insert by Specifying Column Names (Best Practice)

This method is safer and more readable. You only insert into specific columns.

**SQL COMMAND**

```sql
INSERT INTO users
(name, email, gender, date_of_birth)
VALUES
('Bob', 'bob@example.com',
'Male', '1990-11-23');
```

---

<a id="page-12"></a>

## Multiple Row Inserts

**CHAPTER 05 · PDF page 12**

*Efficient Data Insertion Techniques*

### Insert Multiple Rows at Once

You can insert multiple rows in a single query.

**SQL COMMAND**

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

---

<a id="page-13"></a>

## Efficient Bulk Inserts

**CHAPTER 05 · PDF page 13**

*Adding Multiple Records in One Query*

Writing multiple rows inside a single INSERT INTO statement improves performance and reduces the number of database queries.

This approach is commonly used while importing large datasets or inserting multiple users at once.

### Insert Multiple Rows Efficiently

**SQL COMMAND**

```sql
INSERT INTO users
(name, email, gender, date_of_birth)
VALUES
('Charlie', 'charlie@example.com',
'Other', '1988-02-17'),
('David', 'david@example.com',
'Male', '2000-08-09'),
('Eva', 'eva@example.com',
'Female', '1993-12-30');
```

---

<a id="page-14"></a>

## Querying Data in MySQL using SELECT

**CHAPTER 06 · PDF page 14**

*Retrieving and Filtering Data*

The SELECT statement is used to query data from a table.

### Basic Syntax

**SQL SYNTAX**

```sql
SELECT column1, column2 FROM table_name;
```

To select all columns:

**SQL COMMAND**

```sql
SELECT * FROM users;
```

### Filtering Rows with WHERE

#### Equal To

**SQL COMMAND**

```sql
SELECT * FROM users
WHERE gender = 'Male';
```

---

<a id="page-15"></a>

## Advanced WHERE Conditions

**CHAPTER 06 · PDF page 15**

*Working with Comparisons and NULL*

#### Not Equal To

**SQL COMMAND**

```sql
SELECT * FROM users
WHERE gender != 'Female';
-- OR
SELECT * FROM users
WHERE gender <> 'Female';
```

#### Greater Than / Less Than

**SQL COMMAND**

```sql
SELECT * FROM users
WHERE date_of_birth < '1995-01-01';

SELECT * FROM users
WHERE id > 10;
```

### Greater Than or Equal / Less Than or Equal

**SQL COMMAND**

```sql
SELECT * FROM users
WHERE id >= 5;

SELECT * FROM users
WHERE id <= 20;
```

---

<a id="page-16"></a>

## NULL & BETWEEN

**CHAPTER 06 · PDF page 16**

*Handling Missing Values and Ranges*

### Working with NULL

#### IS NULL

**SQL COMMAND**

```sql
SELECT * FROM users
WHERE date_of_birth IS NULL;
```

#### IS NOT NULL

**SQL COMMAND**

```sql
SELECT * FROM users
WHERE date_of_birth IS NOT NULL;
```

### BETWEEN

**SQL COMMAND**

```sql
SELECT * FROM users
WHERE date_of_birth BETWEEN
'1990-01-01' AND '2000-12-31';
```

---

<a id="page-17"></a>

## Pattern Matching & Sorting

**CHAPTER 06 · PDF page 17**

*LIKE, AND / OR and ORDER BY*

### IN

**SQL COMMAND**

```sql
SELECT * FROM users
WHERE gender IN ('Male', 'Other');
```

### LIKE (Pattern Matching)

**SQL COMMAND**

```sql
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

### AND / OR

**SQL COMMAND**

```sql
SELECT * FROM users
WHERE gender = 'Female'
AND date_of_birth > '1990-01-01';

SELECT * FROM users
WHERE gender = 'Male'
OR gender = 'Other';
```

---

<a id="page-18"></a>

## ORDER BY & LIMIT

**CHAPTER 06 · PDF page 18**

*Sorting and Limiting Query Results*

### ORDER BY

**SQL COMMAND**

```sql
SELECT * FROM users
ORDER BY date_of_birth ASC;

SELECT * FROM users
ORDER BY name DESC;
```

### LIMIT

**SQL COMMAND**

```sql
SELECT * FROM users
LIMIT 5;
-- Top 5 rows
SELECT * FROM users
LIMIT 10 OFFSET 5;
-- Skip first 5 rows
SELECT * FROM users
LIMIT 5, 10;
-- Get 10 rows
-- starting from the 6th row
```

**SQL COMMAND**

```sql
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 10;
```

---

<a id="page-19"></a>

## Quick Quiz

**CHAPTER 06 · PDF page 19**

*Practice SQL Query Reading*

What does the following queries do?

**QUERY 1**

```sql
SELECT * FROM users
WHERE salary > 60000
ORDER BY created_at DESC
LIMIT 5;
```

**QUERY 2**

```sql
SELECT * FROM users
ORDER BY salary DESC;
```

**QUERY 3**

```sql
SELECT * FROM users
WHERE salary BETWEEN
50000 AND 70000;
```

---

<a id="page-20"></a>

## UPDATE - Modifying Existing Data

**CHAPTER 07 · PDF page 20**

*Changing Values in Existing Rows*

The UPDATE statement is used to change values in one or more rows.

### Basic Syntax

**SQL SYNTAX**

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

### Example: Update One Column

**SQL COMMAND**

```sql
UPDATE users
SET name = 'Alicia'
WHERE id = 1;
```

This changes the name of the user with id = 1 to “Alicia”.

### Example: Update Multiple Columns

**SQL COMMAND**

```sql
UPDATE users
SET name = 'Robert', email = 'robert@example.com'
WHERE id = 2;
```

### Without WHERE Clause (Warning)

**SQL COMMAND**

```sql
UPDATE users
SET gender = 'Other';
```

This updates every row in the table. Be very careful when omitting the WHERE clause.

---

<a id="page-21"></a>

## Quick Quiz: Practice Your UPDATE Skills

**CHAPTER 07 · PDF page 21**

*Writing Real SQL Update Queries*

Try answering or running these queries based on your users table.

#### 1. Update the salary of user with id = 5 to ₹ 70,000.

**SQL COMMAND**

```sql
UPDATE users
SET salary = 70000
WHERE id = 5;
```

#### 2. Change the name of the user with email aisha@example.com to Aisha Khan.

**SQL COMMAND**

```sql
UPDATE users
SET name = 'Aisha Khan'
WHERE email = 'aisha@example.com';
```

#### 3. Increase salary by ₹ 10,000 for all users whose salary is less than ₹ 60,000.

**SQL COMMAND**

```sql
UPDATE users
SET salary = salary + 10000
WHERE salary < 60000;
```

#### 4. Set the gender of user Ishaan to Other.

**SQL COMMAND**

```sql
UPDATE users
SET gender = 'Other'
WHERE name = 'Ishaan';
```

---

<a id="page-22"></a>

## More UPDATE Practice Queries

**CHAPTER 07 · PDF page 22**

*Understanding Row Modifications*

#### 5. Reset salary of all users to ₹ 50,000 (Careful - affects all rows).

**SQL COMMAND**

```sql
UPDATE users
SET salary = 50000;
```

Note: This query will overwrite salary for every user. Use with caution!

---

<a id="page-23"></a>

## DELETE - Removing Data from a Table

**CHAPTER 08 · PDF page 23**

*Deleting Rows from Tables*

The DELETE statement removes rows from a table.

### Basic Syntax

**SQL SYNTAX**

```sql
DELETE FROM table_name
WHERE condition;
```

### Example: Delete One Row

**SQL COMMAND**

```sql
DELETE FROM users
WHERE id = 3;
```

### Delete Multiple Rows

**SQL COMMAND**

```sql
DELETE FROM users
WHERE gender = 'Other';
```

---

<a id="page-24"></a>

## Advanced DELETE Operations

**CHAPTER 08 · PDF page 24**

*Removing Data Safely*

### Delete All Rows (but keep table structure)

**SQL COMMAND**

```sql
DELETE FROM users;
```

### Drop the Entire Table (use with caution)

**SQL COMMAND**

```sql
DROP TABLE users;
```

This removes the table structure and all data permanently.

### Best Practices

- Always use WHERE unless you're intentionally deleting everything.

- Run a SELECT query with the same condition first before deleting data.

- Always back up important data before performing destructive operations.

**SQL CHECK QUERY**

```sql
SELECT * FROM users
WHERE id = 3;
```

---

<a id="page-25"></a>

## Quick Quiz: Practice DELETE Queries

**CHAPTER 08 · PDF page 25**

*Understand What These Queries Will Do*

What will happen if you run the following queries?

**QUERY 1**

```sql
DELETE FROM users
WHERE salary < 50000;
```

**QUERY 2**

```sql
DELETE FROM users
WHERE salary IS NULL;
```

**QUERY 3**

```sql
DELETE FROM users
WHERE gender = 'Male'
AND salary > 100000;
```

**QUERY 4**

```sql
DELETE FROM users
WHERE created_at > '2025-01-01';
```

---

<a id="page-26"></a>

## MySQL Constraints

**CHAPTER 09 · PDF page 26**

*Constraints in MySQL are rules applied to table columns to ensure the accuracy, validity, and integrity of the data.*

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

---

<a id="page-27"></a>

## 2. NOT NULL Constraint

**CHAPTER 09 · PDF page 27**

Ensures that a column cannot contain NULL values.

#### Example:

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

---

<a id="page-28"></a>

## 3. CHECK Constraint

**CHAPTER 09 · PDF page 28**

Ensures that values in a column satisfy a specific condition.

#### Example: Allow only dates of birth after Jan 1, 2000

```sql
ALTER TABLE users
ADD CONSTRAINT chk_dob
CHECK (date_of_birth > '2000-01-01');
```

Naming the constraint (chk\_dob) helps if you want to drop it later.

### 4. DEFAULT Constraint

Sets a default value for a column if none is provided during insert.

#### Example:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    is_active BOOLEAN DEFAULT TRUE
);
```

#### Add DEFAULT using ALTER TABLE:

```sql
ALTER TABLE users
ALTER COLUMN is_active
SET DEFAULT TRUE;
```

---

<a id="page-29"></a>

## 5. PRIMARY KEY Constraint

**CHAPTER 09 · PDF page 29**

Uniquely identifies each row. Must be NOT NULL and UNIQUE.

#### Example:

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);
```

#### Add later with ALTER TABLE:

```sql
ALTER TABLE users
ADD PRIMARY KEY (id);
```

---

<a id="page-30"></a>

## 6. AUTO_INCREMENT

**CHAPTER 09 · PDF page 30**

Used with PRIMARY KEY to automatically assign the next number.

#### Example:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);
```

### Summary Table

| Constraint | Purpose |
| --- | --- |
| UNIQUE | Prevents duplicate values |
| NOT NULL | Ensures value is not NULL |
| CHECK | Restricts values using a condition |
| DEFAULT | Sets a default value |
| PRIMARY KEY | Uniquely identifies each row |
| AUTO\_INCREMENT | Automatically generates unique numbers |

---

<a id="page-31"></a>

## SQL Functions (MySQL)

**CHAPTER 10 · PDF page 31**

*Aggregate and String Functions*

SQL functions help you analyze, transform, or summarize data in your tables.

Weʼll use the users table which includes:

```sql
id, name, email, gender, date_of_birth, salary, created_at
```

### 1. Aggregate Functions

### COUNT()

Count total number of users:

```sql
SELECT COUNT(*) FROM users;
```

Count users who are Female:

```sql
SELECT COUNT(*) FROM users
WHERE gender = 'Female';
```

### MIN() and MAX()

Get the minimum and maximum salary:

```sql
SELECT MIN(salary) AS min_salary,
MAX(salary) AS max_salary
FROM users;
```

---

<a id="page-32"></a>

## Aggregate & String Functions

**CHAPTER 10 · PDF page 32**

*Data Analysis Functions*

### SUM()

Calculate total salary payout:

```sql
SELECT SUM(salary) AS total_payroll
FROM users;
```

### AVG()

Find average salary:

```sql
SELECT AVG(salary) AS avg_salary
FROM users;
```

### Grouping with GROUP BY

Average salary by gender:

```sql
SELECT gender,
AVG(salary) AS avg_salary
FROM users
GROUP BY gender;
```

---

<a id="page-33"></a>

## String Functions

**CHAPTER 10 · PDF page 33**

*Working with Text Data*

### 2. String Functions

### LENGTH()

Length of user names:

```sql
SELECT name,
LENGTH(name) AS name_length
FROM users;
```

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

### CONCAT()

Combine name and email:

```sql
SELECT CONCAT(name, ' <', email, '>')
AS user_contact
FROM users;
```

---

<a id="page-34"></a>

## Date Functions

**CHAPTER 10 · PDF page 34**

*Working with Dates and Time*

### 3. Date Functions

### NOW()

Current date and time:

```sql
SELECT NOW();
```

### YEAR(), MONTH(), DAY()

Extract parts of date\_of\_birth:

```sql
SELECT name,
YEAR(date_of_birth) AS birth_year
FROM users;
```

### DATEDIFF()

Find number of days between today and birthdate:

```sql
SELECT name,
DATEDIFF(CURDATE(), date_of_birth)
AS days_lived
FROM users;
```

---

<a id="page-35"></a>

## Date & Mathematical Functions

**CHAPTER 10 · PDF page 35**

*Advanced Calculations in SQL*

### TIMESTAMPDIFF()

Calculate age in years:

```sql
SELECT name,
TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE())
AS age
FROM users;
```

### 4. Mathematical Functions

### ROUND(), FLOOR(), CEIL()

```sql
SELECT salary,
ROUND(salary) AS rounded,
FLOOR(salary) AS floored,
CEIL(salary) AS ceiled
FROM users;
```

### MOD()

Find even or odd user IDs:

```sql
SELECT id,
MOD(id, 2) AS remainder
FROM users;
```

---

<a id="page-36"></a>

## Conditional Functions

**CHAPTER 10 · PDF page 36**

*Logical Conditions in SQL*

### 5. Conditional Functions

### IF()

```sql
SELECT name,
gender,
IF(gender = 'Female', 'Yes', 'No')
AS is_female
FROM users;
```

### Summary Table

| Function | Purpose |
| --- | --- |
| COUNT() | Count rows |
| SUM() | Total of a column |
| AVG() | Average of values |
| MIN() / MAX() | Lowest / highest value |
| LENGTH() | String length |
| CONCAT() | Merge strings |
| YEAR() / DATEDIFF() | Date breakdown / age |
| ROUND() | Rounding numbers |
| IF() | Conditional logic |

---

<a id="page-37"></a>

## MySQL Transactions and AutoCommit

**CHAPTER 11 · PDF page 37**

*Managing Transactions in MySQL*

By default, MySQL operates in AutoCommit mode. This means that every SQL statement is treated as a transaction and is committed automatically. However, for more control over when changes are saved, you can turn AutoCommit off and manage transactions manually.

### 1. Disabling AutoCommit

When AutoCommit is off, you can explicitly control when to commit or rollback changes.

### To disable AutoCommit:

```sql
SET autocommit = 0;
```

This turns off AutoCommit, meaning that changes you make wonʼt be saved to the database unless you explicitly tell MySQL to commit them.

Important: Until you execute a COMMIT, your changes are not permanent.

### 2. COMMIT: Save Changes to the Database

Once youʼve made changes and youʼre confident that everything is correct, you can use the COMMIT command to save those changes.

### To commit a transaction:

```sql
COMMIT;
```

This saves all the changes made since the last COMMIT or ROLLBACK. After this point, the changes become permanent.

---

<a id="page-38"></a>

## Rollback and Transactions

**CHAPTER 11 · PDF page 38**

*Reverting Database Changes Safely*

### 3. ROLLBACK: Revert Changes to the Last Safe Point

If you make an error or decide you donʼt want to save your changes, you can rollback the transaction to its previous state.

### To rollback a transaction:

```sql
ROLLBACK;
```

This undoes all changes since the last COMMIT or ROLLBACK.

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

---

<a id="page-39"></a>

## AutoCommit Best Practices

**CHAPTER 11 · PDF page 39**

*Working Safely with Transactions*

### 4. Enabling AutoCommit Again

If you want to turn AutoCommit back on (so that every statement is automatically committed), you can do so with:

```sql
SET autocommit = 1;
```

### Best Practices

- Use COMMIT when you want to make changes permanent.

- Use ROLLBACK to discard changes if something goes wrong.

- Consider disabling AutoCommit when performing complex updates to avoid saving partial or incorrect data.

- Always test transaction queries carefully before applying them in production databases.

---

<a id="page-40"></a>

## Understanding PRIMARY KEY in MySQL

**CHAPTER 12 · PDF page 40**

*Primary Keys and Unique Constraints*

A PRIMARY KEY is a constraint in SQL that uniquely identifies each row in a table. It is one of the most important concepts in database design.

### What is a Primary Key?

- A PRIMARY KEY:

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

---

<a id="page-41"></a>

## UNIQUE and Constraints

**CHAPTER 12 · PDF page 41**

*Comparing PRIMARY KEY and UNIQUE*

### How Is PRIMARY KEY Different from UNIQUE?

At first glance, PRIMARY KEY and UNIQUE might seem similar since both prevent duplicate values. But there are important differences:

| Feature | PRIMARY KEY | UNIQUE |
| --- | --- | --- |
| Must be unique | Yes | Yes |
| Allows NULL values | No | Yes (one or more NULLs allowed) |
| How many allowed | Only one per table | Can have multiple |
| Required by table | Recommended, often required | Optional |
| Dropping | Cannot be easily dropped | Can be dropped anytime |

### Example with UNIQUE

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(100)
);
```

In this example:

- id is the unique identifier for each row.

- email must be unique, but is not the primary key.

---

<a id="page-42"></a>

## Dropping Keys

**CHAPTER 12 · PDF page 42**

*Managing Constraints in MySQL*

### Can I Drop a PRIMARY KEY?

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

---

<a id="page-43"></a>

## Auto Increment and Takeaways

**CHAPTER 12 · PDF page 43**

*Best Practices with Primary Keys*

### Auto Increment

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

### Key Takeaways

- Use PRIMARY KEY for the main identifier of a row.

- Use UNIQUE for enforcing non-duplicate values in other columns (like email or phone).

- You can have only one primary key, but you can have many unique constraints.

- Combine AUTO\_INCREMENT with PRIMARY KEY for automatically generated IDs.

- Always choose a stable and unique column for your primary key.

---

<a id="page-44"></a>

## Foreign Keys in MySQL

**CHAPTER 13 · PDF page 44**

*Understanding Relationships Between Tables*

A foreign key is a column that creates a link between two tables. It ensures that the value in one table must match a value in another table.

This is used to maintain data integrity between related data.

### Why Use Foreign Keys?

Imagine this scenario:

You have a users table. Now you want to store each userʼs address. Instead of putting address columns inside the users table, you create a separate addresses table, and link it to users using a foreign key.

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

---

<a id="page-45"></a>

## Managing Foreign Keys

**CHAPTER 13 · PDF page 45**

*Creating and Removing Constraints*

### Explanation

- user\_id is a foreign key.

- It references the id column in the users table.

- This ensures that every address must be linked to a valid user.

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

---

<a id="page-46"></a>

## ALTER Operations

**CHAPTER 13 · PDF page 46**

*Adding Foreign Keys Later*

### Adding a Foreign Key Later (Using ALTER)

Suppose the foreign key was not defined during table creation. You can add it later using ALTER TABLE:

```sql
ALTER TABLE addresses
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id);
```

---

<a id="page-47"></a>

## ON DELETE Actions

**CHAPTER 13 · PDF page 47**

*Controlling Delete Behavior*

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

---

<a id="page-48"></a>

## Foreign Key Summary

**CHAPTER 13 · PDF page 48**

*Delete Options and Final Notes*

Or alter it later:

```sql
ALTER TABLE addresses
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```

### Other ON DELETE Options

| ON DELETE Option | Behavior |
| --- | --- |
| CASCADE | Deletes all related rows in child table |
| SET NULL | Sets the foreign key to NULL in the child table |
| RESTRICT | Prevents deletion of parent if child exists (default) |

### Summary

- Foreign keys connect tables and enforce valid references.

- You can create them inline or with ALTER TABLE.

- You can drop them by name.

- Use ON DELETE to control what happens when the parent row is deleted.

---

<a id="page-49"></a>

## SQL JOINs in MySQL

**CHAPTER 14 · PDF page 49**

*Combining Data from Multiple Tables*

In SQL, JOINs are used to combine rows from two or more tables based on related columns. Usually a foreign key in one table references a primary key in another.

Weʼll use the following two tables:

### users table

| id | name |
| --- | --- |
| 1 | Aarav |
| 2 | Sneha |
| 3 | Raj |

### addresses table

| id | user\_id | city |
| --- | --- | --- |
| 1 | 1 | Mumbai |
| 2 | 2 | Kolkata |
| 3 | 4 | Delhi |

Note: user\_id is a foreign key that references users.id.

---

<a id="page-50"></a>

## INNER JOIN

**CHAPTER 14 · PDF page 50**

*Matching Rows from Both Tables*

### 1. INNER JOIN

Returns only the matching rows from both tables.

```sql
SELECT users.name, addresses.city
FROM users
INNER JOIN addresses
ON users.id = addresses.user_id;
```

### Output:

| name | city |
| --- | --- |
| Aarav | Mumbai |
| Sneha | Kolkata |

Raj is excluded because there is no matching address. Delhi is excluded because its user\_id (4) is not in users.

### Visual Representation:

```text
users          addresses
-----          ---------
| 1 |          | 1 |
| 2 |          | 2 |
| 3 |          |   |
=> only matching pairs
```

---

<a id="page-51"></a>

## LEFT JOIN

**CHAPTER 14 · PDF page 51**

*All Left Rows with Matching Right Rows*

### 2. LEFT JOIN

Returns all rows from the left table (users), and matching rows from the right table (addresses). If no match is found, NULLs are returned.

```sql
SELECT users.name, addresses.city
FROM users
LEFT JOIN addresses
ON users.id = addresses.user_id;
```

### Output:

| name | city |
| --- | --- |
| Aarav | Mumbai |
| Sneha | Kolkata |
| Raj | NULL |

Raj is shown even though he doesnʼt have an address.

### Visual Representation:

```text
users          addresses
-----          ---------
| 1 |          | 1 |
| 2 |          | 2 |
| 3 |          |   |
=> all users + matched addresses (or NULL)
```

---

<a id="page-52"></a>

## RIGHT JOIN and Summary

**CHAPTER 14 · PDF page 52**

*Matching Right Side Data*

### 3. RIGHT JOIN

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

### Visual Representation:

```text
users          addresses
-----          ---------
| 1 |          | 1 |
| 2 |          | 2 |
|   |          | 4 |
=> all addresses + matched users (or NULL)
```

### Summary Table

> **Source limitation:** The table contents are cut off beyond the bottom edge of this page in the original PDF.

---

<a id="page-53"></a>

## SQL UNION and UNION ALL

**CHAPTER 15 · PDF page 53**

*Combining Results from Multiple Queries*

The UNION operator in SQL is used to combine the result sets of two or more SELECT statements. It removes duplicates by default.

If you want to include all rows including duplicates, use UNION ALL.

### Example Scenario

You already have a users table for active users. Now, weʼll create an admin\_users table to store users who are administrators or have special roles.

We will then combine the names from both tables using UNION.

### Step 1: Create the admin_users Table

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

---

<a id="page-54"></a>

## Using UNION

**CHAPTER 15 · PDF page 54**

*Combining Query Results*

### Step 2: Insert Sample Data into admin_users

```sql
INSERT INTO admin_users
(id, name, email, gender, date_of_birth, salary)
VALUES
(101, 'Anil Kumar', 'anil@example.com',
'Male', '1985-04-12', 60000),
(102, 'Pooja Sharma', 'pooja@example.com',
'Female', '1992-09-20', 58000),
(103, 'Rakesh Yadav', 'rakesh@example.com',
'Male', '1989-11-05', 54000),
(104, 'Fatima Begum', 'fatima@example.com',
'Female', '1990-06-30', 62000);
```

### Step 3: Use UNION to Combine Data

Letʼs combine the active and admin user names.

```sql
SELECT name FROM users
UNION
SELECT name FROM admin_users;
```

This returns a single list of unique names from both tables.

---

<a id="page-55"></a>

## Advanced UNION Usage

**CHAPTER 15 · PDF page 55**

*Multiple Columns and Sorting*

### UNION ALL Example

If you want to keep duplicate names (if any), use UNION ALL.

```sql
SELECT name FROM users
UNION ALL
SELECT name FROM admin_users;
```

### Using More Than One Column

You can also select multiple columns as long as both SELECT queries return the same number of columns

#### with compatible types.

```sql
SELECT name, salary FROM users
UNION
SELECT name, salary FROM admin_users;
```

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

---

<a id="page-56"></a>

## UNION Summary

**CHAPTER 15 · PDF page 56**

*Rules and Best Practices*

### Using Order By with UNION

```sql
SELECT name FROM users
UNION
SELECT name FROM admin_users
ORDER BY name;
```

### Rules of UNION

1. The number of columns and their data types must match in all SELECT statements.

2. UNION removes duplicates by default.

3. UNION ALL keeps duplicates.

### When to Use UNION

- When you have two similar tables (like current and archived data).

- When you need to combine filtered results from multiple sources.

- When performing cross-category reporting.

### Summary

| Operator | Behavior |
| --- | --- |
| UNION | Combines results, removes duplicates |
| UNION ALL | Combines results, keeps duplicates |

---

<a id="page-57"></a>

## Self JOIN in MySQL

**CHAPTER 16 · PDF page 57**

*Joining a Table with Itself*

A Self JOIN is a regular join, but the table is joined with itself.

This is useful when rows in the same table are related to each other. For example, when users refer other users, and we store the ID of the person who referred them in the same users table.

### Step 1: Add a referred_by_id Column

Weʼll extend the existing users table to include a column called referred\_by\_id, which holds the id of the user who referred them.

```sql
ALTER TABLE users
ADD COLUMN referred_by_id INT;
```

This column:

- Will be NULL for users who were not referred.

- Will contain the id of another user who referred them.

### Step 2: Insert Referral Data (Optional)

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

---

<a id="page-58"></a>

## Using Self JOIN

**CHAPTER 16 · PDF page 58**

*Getting Referrer Information*

### Step 3: Use a Self JOIN to Get Referrer Names

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

### Explanation

- a  refers to the user being queried.

- b  refers to the user who referred them.

- LEFT JOIN is used so that users with NULL in referred\_by\_id are also included.

### Sample Output

| id | user\_name | referred\_by |
| --- | --- | --- |
| 1 | Aarav | NULL |
| 2 | Sneha | Aarav |
| 3 | Raj | Aarav |
| 4 | Fatima | Sneha |

---

<a id="page-59"></a>

## Self JOIN Summary

**CHAPTER 16 · PDF page 59**

*Important Concepts and Best Practices*

### Summary

- Use Self JOIN when you need to join a table with itself.

- In referral-based relationships, store the referrerʼs id in the same table.

- Use aliases like a  and b  to differentiate the two instances of the same table.

- Self JOIN is commonly used in employee-manager structures, referral systems, and hierarchical data.

---

<a id="page-60"></a>

## MySQL Views

**CHAPTER 17 · PDF page 60**

*Working with Virtual Tables*

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

### Querying the View

```sql
SELECT * FROM high_salary_users;
```

This will return all users from the users table where salary is above ₹ 70,000.

---

<a id="page-61"></a>

## How Views Stay Updated

**CHAPTER 17 · PDF page 61**

*Views Automatically Reflect Changes*

Letʼs see what happens when the underlying data changes.

### Step 1: View before update

```sql
SELECT * FROM high_salary_users;
```

Output:

| id | name | salary |
| --- | --- | --- |
| 2 | Sneha | 75000 |
| 5 | Fatima | 80000 |

### Step 2: Update a userʼs salary

```sql
UPDATE users
SET salary = 72000
WHERE name = 'Raj';
```

---

<a id="page-62"></a>

## How Views Stay Updated

**CHAPTER 17 · PDF page 62**

*Views Automatically Reflect Changes*

### Step 3: Query the view again

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

---

<a id="page-63"></a>

## Dropping a View

**CHAPTER 17 · PDF page 63**

*Removing Existing Views*

To remove a view:

```sql
DROP VIEW high_salary_users;
```

### Summary

- Views act like saved SELECT queries

- Views are not duplicated data

- Changes to base tables are reflected automatically

- Great for simplifying complex queries or creating filtered access

---

<a id="page-64"></a>

## MySQL Indexes

**CHAPTER 18 · PDF page 64**

*Improving Query Performance*

Indexes in MySQL are used to speed up data retrieval. They work like the index of a book, helping the database engine find rows faster, especially for searches, filters, and joins.

### Viewing Indexes on a Table

To see the indexes on a table, use:

```sql
SHOW INDEXES FROM users;
```

This shows all the indexes currently defined on the users table, including the automatically created primary key index.

### Creating a Single-Column Index

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

---

<a id="page-65"></a>

## Working with Multi-Column Indexes

**CHAPTER 18 · PDF page 65**

*Optimizing Complex Searches*

### Important Notes

- Indexes consume extra disk space

- Indexes slow down INSERT, UPDATE, and DELETE operations slightly

- Use indexes only when needed (for columns used in WHERE, JOIN, and ORDER BY)

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

### Index Order Matters

For a multi-column index on (gender, salary):

- This works efficiently:

```sql
WHERE gender = 'Female' AND salary > 70000
```

---

<a id="page-66"></a>

## Managing MySQL Indexes

**CHAPTER 18 · PDF page 66**

*Best Practices and Removal*

- But this may not use the index effectively:

```sql
WHERE salary > 70000
```

Because the first column in the index (gender) is missing in the filter.

### Dropping an Index

To delete an index:

```sql
DROP INDEX idx_email ON users;
```

### Summary

| Feature | Description |
| --- | --- |
| SHOW INDEXES | View current indexes on a table |
| CREATE INDEX | Create single or multi-column indexes |
| DROP INDEX | Remove an index |
| Use when | Query performance on large tables is a concern |
| Avoid on | Columns that are rarely queried or always unique |

---

<a id="page-67"></a>

## Subqueries in MySQL

**CHAPTER 19 · PDF page 67**

*Nested Queries and Dynamic Filtering*

A subquery is a query nested inside another query. Subqueries are useful for breaking down complex problems into smaller parts.

They can be used in:

- SELECT statements

- WHERE clauses

- FROM clauses

### Example Scenario: Salary Comparison

Suppose we want to find all users who earn more than the average salary of all users.

### Scalar Subquery Example

This subquery returns a single value, the average salary. We then compare each user's salary with it.

```sql
SELECT id, name, salary
FROM users
WHERE salary > (
    SELECT AVG(salary) FROM users
);
```

#### Explanation:

- The inner query: SELECT AVG(salary) FROM users returns the average salary.

- The outer query selects all users with a salary greater than that average.

---

<a id="page-68"></a>

## Using Subqueries

**CHAPTER 19 · PDF page 68**

*Filtering and Derived Values*

### Subquery with IN

Now letʼs say we want to find users who have been referred by someone who earns more than ₹ 75,000.

```sql
SELECT id, name, referred_by_id
FROM users
WHERE referred_by_id IN (
    SELECT id FROM users WHERE salary > 75000
);
```

#### Explanation:

- The inner query returns a list of user IDs who earn more than ₹ 75,000.

- The outer query selects users whose referred\_by\_id is in that list.

### Other Places Subqueries Are Used

You can also use subqueries:

- Inside SELECT columns (called scalar subqueries)

- In the FROM clause to create derived tables

Example in SELECT:

```sql
SELECT name, salary,
    (SELECT AVG(salary) FROM users) AS average_salary
FROM users;
```

This shows each userʼs salary along with the overall average.

---

<a id="page-69"></a>

## Subquery Summary

**CHAPTER 19 · PDF page 69**

*Quick Recap of Common Use Cases*

### Summary

| Subquery Type | Use Case |
| --- | --- |
| Scalar Subquery | Returns one value (e.g. AVG, MAX) |
| Subquery with IN | Returns multiple values |
| Subquery in SELECT | Shows related calculated value |
| Subquery in FROM | Acts as a virtual table |

Subqueries are powerful tools when filtering based on computed or dynamic conditions.

---

<a id="page-70"></a>

## GROUP BY and HAVING in MySQL

**CHAPTER 20 · PDF page 70**

*Grouping and Filtering Aggregated Data*

The GROUP BY clause is used to group rows that have the same values in specified columns. It is typically used with aggregate functions like COUNT, SUM, AVG, MIN, or MAX.

The HAVING clause is used to filter groups after aggregation. It is similar to how WHERE filters individual rows.

### Example Table: users

Assume this is your users table:

| id | name | gender | salary | referred\_by\_id |
| --- | --- | --- | --- | --- |
| 1 | Aarav | Male | 80000 | NULL |
| 2 | Sneha | Female | 75000 | 1 |
| 3 | Raj | Male | 72000 | 1 |
| 4 | Fatima | Female | 85000 | 2 |
| 5 | Priya | Female | 70000 | NULL |

### GROUP BY Example: Average Salary by Gender

```sql
SELECT gender, AVG(salary) AS average_salary
FROM users
GROUP BY gender;
```

#### Explanation:

- This groups users by gender.

- Then calculates the average salary for each group.

---

<a id="page-71"></a>

## Using GROUP BY and HAVING

**CHAPTER 20 · PDF page 71**

*Aggregation and Group Filtering*

### GROUP BY with COUNT

Find how many users were referred by each user:

```sql
SELECT referred_by_id, COUNT(*) AS total_referred
FROM users
WHERE referred_by_id IS NOT NULL
GROUP BY referred_by_id;
```

#### Output:

| referred\_by\_id | total\_referred |
| --- | --- |
| 1 | 2 |
| 2 | 1 |

### HAVING Clause: Filtering Groups

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

---

<a id="page-72"></a>

## ROLLUP and Group Summaries

**CHAPTER 20 · PDF page 72**

*Advanced Aggregation Features*

### Another Example: Groups with More Than 1 Referral

```sql
SELECT referred_by_id, COUNT(*) AS total_referred
FROM users
WHERE referred_by_id IS NOT NULL
GROUP BY referred_by_id
HAVING COUNT(*) > 1;
```

### Summary

| Clause | Purpose | Can use aggregates? |
| --- | --- | --- |
| WHERE | Filters rows before grouping | No |
| GROUP BY | Groups rows based on column values | N/A |
| HAVING | Filters groups after aggregation | Yes |

Use GROUP BY to organize data, and HAVING to filter those groups based on aggregate conditions.

### ROLLUP

To get subtotals and grand totals, you can use ROLLUP:

```sql
SELECT gender, COUNT(*) AS total_users
FROM users
GROUP BY gender WITH ROLLUP;
```

This gives you a count of users by gender, along with a grand total for all users.

---

<a id="page-73"></a>

## Stored Procedures in MySQL

**CHAPTER 21 · PDF page 73**

*Reusable SQL Blocks and Procedures*

A stored procedure is a saved SQL block that can be executed later. It is useful for encapsulating logic that can be reused multiple times, such as queries, updates, or conditional operations.

### Why Change the Delimiter?

By default, MySQL uses ;  to end SQL statements.

But when defining stored procedures, we use ;  inside the procedure as well. This can confuse MySQL. To avoid this, we temporarily change the delimiter (e.g. to $$ or //) while creating the procedure.

### Syntax for Creating a Stored Procedure

```sql
DELIMITER $$
CREATE PROCEDURE procedure_name()
BEGIN
    -- SQL statements go here
END$$
DELIMITER ;
```

After the procedure is created, we reset the delimiter back to ; .

---

<a id="page-74"></a>

## Creating Stored Procedures

**CHAPTER 21 · PDF page 74**

*Using Input Parameters*

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

---

<a id="page-75"></a>

## Managing Stored Procedures

**CHAPTER 21 · PDF page 75**

*Viewing and Removing Procedures*

### Notes

- Input parameters are declared using the IN keyword.

- Stored procedures are stored in the database and can be reused.

### Viewing Stored Procedures

```sql
SHOW PROCEDURE STATUS WHERE Db = 'startersql';
```

### Dropping a Stored Procedure

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

---

<a id="page-76"></a>

## Triggers in MySQL

**CHAPTER 22 · PDF page 76**

*Automatically Executed Database Events*

A trigger is a special type of stored program that is automatically executed when a specific event occurs in a table, such as INSERT, UPDATE, or DELETE.

Triggers are commonly used for:

- Logging changes

- Enforcing additional business rules

- Automatically updating related data

### Basic Trigger Structure

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

### Scenario: Log Every New User Insertion

Suppose we want to log every time a new user is inserted into the users table.

Weʼll create a separate table called user\_log to store log entries.

---

<a id="page-77"></a>

## Creating a Trigger

**CHAPTER 22 · PDF page 77**

*Logging Inserted Users*

### Step 1: Create the Log Table

```sql
CREATE TABLE user_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 2: Create the Trigger

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

---

<a id="page-78"></a>

## Managing Triggers

**CHAPTER 22 · PDF page 78**

*Testing and Removing Triggers*

### Step 3: Test the Trigger

```sql
CALL AddUser('Ritika Jain', 'ritika@example.com',
'Female', '1996-03-12', 74000);
```

Now check the user\_log table:

```sql
SELECT * FROM user_log;
```

You should see Ritikaʼs info automatically logged.

### Dropping a Trigger

If you need to remove a trigger:

```sql
DROP TRIGGER IF EXISTS after_user_insert;
```

### Summary

| Trigger Component | Description |
| --- | --- |
| BEFORE / AFTER | When the trigger runs |
| INSERT / UPDATE / DELETE | What kind of action triggers it |
| NEW.column | Refers to the new row (for INSERT, UPDATE) |
| OLD.column | Refers to the old row (for UPDATE, DELETE) |
| FOR EACH ROW | Executes for each affected row |

---

<a id="page-79"></a>

## More on MySQL

**CHAPTER 23 · PDF page 79**

*Additional Useful MySQL Features*

This section covers some essential MySQL features and operators that help you write more powerful and flexible queries.

### 1. Logical Operators

Logical operators are used to combine multiple conditions in a WHERE clause.

| Operator | Description | Example |
| --- | --- | --- |
| AND | All conditions must be true | salary > 50000 AND gender = 'Male' |
| OR | At least one condition is true | gender = 'Male' OR gender = 'Other' |
| NOT | Reverses a condition | NOT gender = 'Female' |

### 2. Add a Column to an Existing Table

Use ALTER TABLE to add a column:

```sql
ALTER TABLE users
ADD COLUMN city VARCHAR(100);
```

This adds a new column named city to the users table.

---

<a id="page-80"></a>

## Wildcards and LIMIT

**CHAPTER 23 · PDF page 80**

*Pattern Matching and Pagination*

### 3. Wildcard Operators

Wildcards are used with the LIKE operator for pattern matching in text.

| Wildcard | Description | Example |
| --- | --- | --- |
| % | Matches any sequence | WHERE name LIKE 'A%' (starts with A) |
| \_ | Matches a single character | WHERE name LIKE '\_a%' (second letter is ‘aʼ) |

### 4. LIMIT with OFFSET

LIMIT is used to limit the number of rows returned. OFFSET skips rows before returning results.

```sql
SELECT * FROM users
ORDER BY id
LIMIT 5 OFFSET 10;
```

This skips the first 10 rows and returns the next 5.

Alternative syntax:

```sql
SELECT * FROM users
ORDER BY id
LIMIT 10, 5;
```

This also skips 10 and returns 5 (LIMIT offset, count).

---

<a id="page-81"></a>

## DISTINCT and TRUNCATE

**CHAPTER 23 · PDF page 81**

*Filtering Unique Data and Clearing Tables*

### 5. DISTINCT Keyword

DISTINCT is used to return only unique values.

```sql
SELECT DISTINCT gender FROM users;
```

Returns a list of unique gender values from the users table.

### 6. TRUNCATE Keyword

TRUNCATE removes all rows from a table, but keeps the table structure.

```sql
TRUNCATE TABLE users;
```

- Faster than DELETE FROM users

- Cannot be rolled back in most cases

### 7. CHANGE vs MODIFY Column

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



### For the databse
```sql
SHOW DATABASES;  // to show all the databases
CREATE DATABASE <database-name>; // create the particluar database
DROP DATABASE <database-name>; //To drop or delete a database:
USE <database-name>; // To use a database or to go into particluar database
SELECT DATABASE(); // To check which database you are working or which you have selected
```

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


```sql
VARCHAR(140) -- it means that we can use the variable character of length 140
INT -- Means using the integer or the whole number
UNSIGNED -- means number can not be negative, if used it also increased efficiency

-- for decimal storage of data
DECIMAL(a,b)  -- a means the total length to number while b is the length after deciamal
float -- precision issue after 7 digits after decimal
double -- precision issue after 15 digits after decimal
```


### Constraints in sql
1. **Unique** - functionality is same

```sql
CREATE TABLE contacts (
	name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE
);
INSERT INTO contacts (name, phone) VALUES ('billybob', '8781213455');

-- This insert would result in an error:
INSERT INTO contacts (name, phone) VALUES ('billybob', '8781213455');
```

2. **Check** - It checks the condition, on the basis of true(1) or false(0) runs the value

```sql
CREATE TABLE users (
	username VARCHAR(20) NOT NULL,
    age INT CHECK (age > 0)
);

CREATE TABLE palindromes (
  word VARCHAR(100) CHECK(REVERSE(word) = word)
)
```

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


### To create table. Here 'not null' means we must provide value when adding a row. Default is the default value,

### PRIMARY KEY means that column should be unique (we don't require NOT NULL in primary key)

### When we have added the auto increment then we don't need to insert/add values to that column. It will fill automatically by adding 1 in last added value
```sql
CREATE TABLE <table_name> (
    <column1_name> INT AUTO_INCREMENT PRIMARY KEY,
    <column2_name> VARCHAR(50) NOT NULL DEFAULT 'unnamed',
    <column3_name> INT NOT NULL DEFAULT 99
);
```

### To add string like 'he's' we add like 'he\'s' || Use the singla and double quote combination 

### All the Table Queries

```sql
SHOW TABLES -- to get all the tables
SHOW COLUMNS FROM <table_name>  -- as name stated
DESC <table_name>  -- same functionality of above
DROP TABLE <table_name>  -- to delete the table
INSERT INTO <table_name> (<column1_name>, <column2_name>) VALUES ("<column1_value>", <column2_name>)  -- to insert values into the table
INSERT INTO pastries(<column1_name>, <column2_name>) VALUES ('<column1_value>', <column2_value>),('<column1_value>', <column2_value>),('Lazy Bear', 1); -- To Insert multiple values at same time


SELECT * from <table_name>   -- To get the all column values from the table
SELECT <column_name> from <table_name>  -- to get all the column
SELECT <column1_name>,<column2_name>,<column3_name> from <table_name>   -- to get 2 or more column from table
SELECT * FROM <table_name> WHERE <column_name> = <column_value>;  -- to get value in specific condition eg. SELECT * FROM cats WHERE age = 4; 
SELECT <column1_name>,<column2_name> FROM <table_name> WHERE <column_name> = <column_value>;
```

### Updating in the database

```sql
UPDATE <table_name> SET <column1_name> = 'some static value',<column2_name> = 'some new static value'  -- Updating whole single column with single value
UPDATE <table_name> SET <tobe_update_column_name> = 'new value' WHERE <search_column> = 'search column value'

-- ALTER TABLE - is used to add, delete, or modify columns in an existing table, also used to add and drop various constraints on an existing table.

-- Alter- add column
ALTER TABLE companies ADD COLUMN employee_count INT NOT NULL DEFAULT 1;

-- Alter - Drop or delete column
ALTER TABLE companies DROP COLUMN phone;

-- Alter - Renaming table
ALTER TABLE companies RENAME COLUMN old_name TO company_new_name;

-- Alter - Modify the data type
ALTER TABLE companies MODIFY company_name VARCHAR(100) DEFAULT 'unknown';

-- Alter - Constraints
ALTER TABLE houses ADD CONSTRAINT positive_pprice CHECK (purchase_price >= 0);

-- Delete row in table
DELETE FROM cats;  // to delete all rows in column
DELETE FROM <table_name> WHERE <column_name> = 'some value' eg DELETE FROM cats WHERE name='Egg';
```

### Functions in SQL

```sql
-- Concatenation of column
SELECT CONCAT(<column1_name>,<column2_name>,'random text') AS <new_column_name> FROM <table_name>;

-- Concatenate with separator
SELECT CONCAT_WS('-',<column1_name>,<column2_name>) AS <new_column_name> FROM <table_name>;

-- Substring, It return the cut string, we can also use negative value
SELECT SUBSTRING(<column_name>,starting_point,length); eg SELECT SUBSTRING(title, 1, 10) AS 'short title' FROM books;

-- Combining string function
SELECT CONCAT(SUBSTRING(title, 1, 10),'...') AS 'short title' FROM books;

-- Replace (str,from_str,to_str) --- This function is case sensitive
SELECT REPLACE(title, 'e ', '3') FROM books;

-- Reverse, exception is that it don't work for null
SELECT REVERSE('abc');

-- char Length of string, there is differenc between LENGTH and CHAR_LENGTH. Length return the value in bytes
SELECT LENGTH(@dolphin), CHAR_LENGTH(@dolphin);   // retrun value is 6,2

SELECT UPPER('Hej');
SELECT LOWER('QUADRATICALLY');

-- To insert a value, INSERT(string, position, length to be replace, newstr to be added)
SELECT INSERT('Quadratic', 3, 4, 'What');  gives 'QuWhattic'

LEFT(string, length from left) eg SELECT LEFT('foobarbar', 5); gives 'fooba' 
RIGHT(string, length from right) eg SELECT RIGHT('foobarbar', 4); gives 'rbar' 
 
REPEAT(str,count) eg  SELECT REPEAT('MySQL', 3); gives 'MySQLMySQLMySQL'
-- We have the trim for the different scenerio

-- To select unique value from column
SELECT DISTINCT <column_name> FROM <table_name>
SELECT DISTINCT <column1_name>,<column2_name> FROM <table_name>  // for distinct combination if column1 and column2

-- Sorting our results, ORDER By used at the end, ascending by default
SELECT <column_name> FROM <table_name> ORDER BY <column_name>
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY <column_name> DESC       // for descending the sort
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY 2   // means sort the column2
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY <column1_name>,<column2_name>   // means sort by column1 and when column1 have 2 values then sort it by column 2 

-- To Limit the data, Limit 5 means show first 5 data
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY <column_name> DESC LIMIT 5
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY <column_name> DESC LIMIT <start_point>,count to show

-- For searching or you can say includes of js, we use the LIKE of SQL. % means 0 or more characters, _ means search with that much character length
WHERE <column_name> LIKE '%search_text%'
WHERE <column_name> LIKE '__'
SELECT * FROM books WHERE title LIKE '%\_%';  // To select books with an underscore '_' in title:


-- AGGREFATE FUNCTIONS - functions that can operate on multiple rows or multiple pieces of data at once to tell us the min or max or avg or sum etc

-- Count function- it basically gives the number of rows
SELECT COUNT(*) FROM <table_name>    // gives all the rows in table. Instead of * we can also use the <column_name>
 
-- eg
SELECT COUNT(DISTINCT released_year) FROM books
SELECT COUNT(*) FROM books WHERE title LIKE '%the%'


-- Group By - It summarizes or aggregate identical data into single rows
SELECT author_lname, COUNT(*) FROM books GROUP BY author_lname 
SELECT author_lname, COUNT(*) FROM books GROUP BY author_lname, author_fname

-- Min and Max
SELECT MIN(<column_name>) FROM <table_name>
SELECT MAX(<column_name>) FROM <table_name>

-- Subqueries - when we have query inside a query its a subqueries. The part in the bracket runs first and then the rest run
SELECT title, pages FROM books WHERE pages = (SELECT MAX(pages) FROM books)
SELECT CONCAT(author_fname, ' ', author_lname) AS author,  COUNT(*) FROM books GROUP BY author;


-- SUM 
SELECT SUM(<column_name>) FROM <Table>

-- Average
SELECT AVG(<column_name>) FROM <Table>
SELECT released_year, AVG(stock_quantity),COUNT(*) FROM books GROUP BY released_year;

-- Logical operator(&& is written as AND, || is written as OR)
SELECT * FROM books WHERE title NOT LIKE '%e%';
SELECT title, author_lname, released_year FROM books WHERE released_year > 2010 AND author_lname = 'Eggers' AND title LIKE '%novel%';
SELECT title, pages FROM books WHERE pages < 200  OR title LIKE '%stories%';
SELECT title, released_year FROM books WHERE released_year NOT BETWEEN 2004 AND 2014;   // it is NOT BETWEEN case


-- Multiple OR replaced by 
SELECT title, author_lname FROM books WHERE author_lname IN ('Carver', 'Lahiri', 'Smith');
SELECT title, author_lname FROM books WHERE author_lname NOT IN ('Carver', 'Lahiri', 'Smith');
```


### Joining the two table. (One to many)

- We join the two table by one column which is common in both the table. For joining, we mark the foreign key 
- advantage of using the foreign key is that it checks the that adding value is already available or not.

```
FOREIGN KEY (<same_table_column>) REFERENCES <other_table_name>(<other_table_column_name>)
```

eg
```sql
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50)
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE,
    amount DECIMAL(8,2),
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO customers (first_name, last_name, email) 
VALUES ('Boy', 'George', 'george@gmail.com'),
       ('George', 'Michael', 'gm@gmail.com'),
       ('David', 'Bowie', 'david@gmail.com'),
       ('Blue', 'Steele', 'blue@gmail.com'),
       ('Bette', 'Davis', 'bette@aol.com');
       
       
INSERT INTO orders (order_date, amount, customer_id)
VALUES ('2016-02-10', 99.99, 1),
       ('2017-11-11', 35.50, 1),
       ('2014-12-12', 800.67, 2),
       ('2015-01-03', 12.50, 2),
       ('1999-04-11', 450.25, 5);

```

### Inner Join -- Ishme jisme sab hota h wahi aata h null wala nhi aata h

```sql
-- Our first inner join!
SELECT * FROM customers
JOIN orders ON orders.customer_id = customers.id;

SELECT first_name, last_name, order_date, amount FROM customers
JOIN orders ON orders.customer_id = customers.id;

-- The order doesn't matter here:
SELECT * FROM orders
JOIN customers ON customers.id = orders.customer_id;

// Inner Join with Group by
SELECT 
    first_name, last_name, SUM(amount) AS total
FROM
    customers
        JOIN
    orders ON orders.customer_id = customers.id
GROUP BY first_name , last_name
ORDER BY total;
```

### Left Join - In inner join we only show the the comman parts full detail but in left join we takes all row of left table and show corresponding value

```sql
SELECT 
    first_name, last_name, order_date, amount
FROM
    customers
        LEFT JOIN
    orders ON orders.customer_id = customers.id;


SELECT 
    order_date, amount, first_name, last_name
FROM
    orders
        LEFT JOIN
    customers ON orders.customer_id = customers.id;
```

### Left Join with Group By

```sql
SELECT 
    first_name, 
    last_name, 
    IFNULL(SUM(amount), 0) AS money_spent
FROM
    customers
        LEFT JOIN
    orders ON customers.id = orders.customer_id
GROUP BY first_name , last_name;
```


### Right Join

```sql
SELECT 
    first_name, last_name, order_date, amount
FROM
    customers
        RIGHT JOIN
    orders ON customers.id = orders.customer_id;
```

### On delete cascade - In this if we want to delete the data of one table, it can't be deleted because of foreign key so we it. so if we delete it from one place it gets deletd from other places also

```sql
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50)
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE,
    amount DECIMAL(8 , 2 ),
    customer_id INT,
    FOREIGN KEY (customer_id)
        REFERENCES customers (id)
        ON DELETE CASCADE
);
```


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

### VIEWS - Views are the stored queries that when invoked produce a result set. It is not real table, its a virtual table.
Basically real data se query bna k ek virtual table bnana h phir usi se value nikalni h. ya simple badi badi query table ko choti choti banana
limitation of view/virtual table is that some functions do not work on it eg delete when aggregation is done, for further visit the website

```sql
-- INSTEAD OF TYPING THIS QUERY ALL THE TIME...
SELECT 
    title, released_year, genre, rating, first_name, last_name
FROM
    reviews
        JOIN
    series ON series.id = reviews.series_id
        JOIN
    reviewers ON reviewers.id = reviews.reviewer_id;

-- WE CAN CREATE A VIEW: full_reviews is the view
CREATE VIEW full_reviews AS
SELECT title, released_year, genre, rating, first_name, last_name FROM reviews
JOIN series ON series.id = reviews.series_id
JOIN reviewers ON reviewers.id = reviews.reviewer_id;

-- NOW WE CAN TREAT THAT VIEW AS A VIRTUAL TABLE 
-- (AT LEAST WHEN IT COMES TO SELECTING)
SELECT * FROM full_review;

-- Replacing the views 
CREATE VIEW ordered_series AS
SELECT * FROM series ORDER BY released_year;

CREATE OR REPLACE VIEW ordered_series AS
SELECT * FROM series ORDER BY released_year DESC;

ALTER VIEW ordered_series AS
SELECT * FROM series ORDER BY released_year;

DROP VIEW ordered_series;  // This is to drop/delete the view


-- Having clause in Group By
SELECT 
    title, 
    AVG(rating),
    COUNT(rating) AS review_count
FROM full_reviews 
GROUP BY title HAVING COUNT(rating) > 1;


-- Rollup clause in Group By - this provide an additional row which has the value of total(sum, avg) which action(sum, avg) done on each
SELECT 
    title, AVG(rating)
FROM
    full_reviews
GROUP BY title WITH ROLLUP;


SELECT 
    title, COUNT(rating)
FROM
    full_reviews
GROUP BY title WITH ROLLUP;
```

### Window function - window functions perform aggregate operations on groups of rows, but they produce a result FOR EACH ROW.
basically jab hum group by use karte h tab no of rows reduced ho jati h aut tab value milti h but windows wale case me value milti h but bina rows reduce hue

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