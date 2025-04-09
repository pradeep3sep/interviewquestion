// For the databse

SHOW DATABASES;  // to show all the databases
CREATE DATABASE <database-name>; // create the particluar database
DROP DATABASE <database-name>; //To drop or delete a database:
USE <database-name>; // To use a database or to go into particluar database
SELECT DATABASE(); // To check which database you are working or which you have selected


// Data Types

//for Date and Time
DATE  -- for date, format is yyyy-mm-dd
TIME -- for time
DATETIME -- for both date and time
SELECT CURTIME();    // for cureent time
SELECT CURDATE();    // for current date
SELECT NOW();        // for current time stamp
eg INSERT INTO people (name, birthdate, birthtime, birthdt) VALUES ('Hazel', CURDATE(), CURTIME(), NOW());

below is to get day,date,month from timestamp
SELECT birthdate, DAY(birthdate), DAYOFWEEK(birthdate), DAYOFYEAR(birthdate) FROM people;
SELECT birthdate, MONTHNAME(birthdate), YEAR(birthdate) FROM people;
SELECT birthdt, MONTH(birthdt), DAY(birthdt), HOUR(birthdt), MINUTE(birthdt) FROM people;
SELECT birthdate, DATE_FORMAT(birthdate, '%a %b %D') FROM people;
SELECT birthdt, DATE_FORMAT(birthdt, 'BORN ON: %r') FROM people;


https://dev.mysql.com/doc/refman/8.0/en/integer-types.html
VARCHAR(140) // it means that we can use the variable character of length 140
INT // Means using the integer or the whole number
UNSIGNED // means number can not be negative, if used it also increased efficiency

// for decimal storage of data
DECIMAL(a,b)  a means the total length to number while b is the length after deciamal
float - precision issue after 7 digits after decimal
double - precision issue after 15 digits after decimal
which to choose --------- https://dev.mysql.com/doc/refman/8.0/en/choosing-types.html


// Constraints in sql
// Unique - functionality is same
eg CREATE TABLE contacts (
	name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE
);
INSERT INTO contacts (name, phone)
VALUES ('billybob', '8781213455');

-- This insert would result in an error:
INSERT INTO contacts (name, phone)
VALUES ('billybob', '8781213455');

//Check - It checks the condition, on the basis of true(1) or false(0) runs the value
eg CREATE TABLE users (
	username VARCHAR(20) NOT NULL,
    age INT CHECK (age > 0)
);

CREATE TABLE palindromes (
  word VARCHAR(100) CHECK(REVERSE(word) = word)
)

// Named Constraints - named constraints provide the named failed case, otherwise if we don't use it will show table_1 or table_2 failed
eg CREATE TABLE users2 (
    username VARCHAR(20) NOT NULL,
    age INT,
    CONSTRAINT age_not_negative CHECK (age >= 0)
);

CREATE TABLE palindromes2 (
  word VARCHAR(100),
  CONSTRAINT word_is_palindrome CHECK(REVERSE(word) = word)
);

// Constraint with combination unique
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


// To create table. Here 'not null' means we must provide value when adding a row. Default is the default value,
//PRIMARY KEY means that column should be unique (we don't require NOT NULL in primary key)
// When we have added the auto increment then we don't need to insert/add values to that column. It will fill automatically by adding 1 in last added value
CREATE TABLE <table_name> (
    <column1_name> INT AUTO_INCREMENT PRIMARY KEY,
    <column2_name> VARCHAR(50) NOT NULL DEFAULT 'unnamed',
    <column3_name> INT NOT NULL DEFAULT 99
);

// To add string like 'he's' we add like 'he\'s' || Use the singla and double quote combination 
SHOW TABLES // to get all the tables
SHOW COLUMNS FROM <table_name>  // as name stated
DESC <table_name>  // same functionality of above
DROP TABLE <table_name>  // to delete the table
INSERT INTO <table_name> (<column1_name>, <column2_name>) VALUES ("<column1_value>", <column2_name>)  // to insert values into the table
INSERT INTO pastries(<column1_name>, <column2_name>) VALUES ('<column1_value>', <column2_value>),('<column1_value>', <column2_value>),('Lazy Bear', 1); //To Insert multiple values at same time


SELECT * from <table_name>   // To get the all column values from the table
SELECT <column_name> from <table_name>  // to get all the column
SELECT <column1_name>,<column2_name>,<column3_name> from <table_name>   // to get 2 or more column from table
SELECT * FROM <table_name> WHERE <column_name> = <column_value>;  // to get value in specific condition eg. SELECT * FROM cats WHERE age = 4; 
SELECT <column1_name>,<column2_name> FROM <table_name> WHERE <column_name> = <column_value>;


// Updating in the database
UPDATE <table_name> SET <column1_name> = 'some static value',<column2_name> = 'some new static value'  // Updating whole single column with single value
UPDATE <table_name> SET <tobe_update_column_name> = 'new value' WHERE <search_column> = 'search column value'

// ALTER TABLE - is used to add, delete, or modify columns in an existing table, also used to add and drop various constraints on an existing table.

// Alter- add column
eg ALTER TABLE companies 
ADD COLUMN phone VARCHAR(15);

ALTER TABLE companies
ADD COLUMN employee_count INT NOT NULL DEFAULT 1;

// Alter - Drop or delete column
eg ALTER TABLE companies DROP COLUMN phone;

// Alter - Renaming table
ALTER TABLE companies RENAME COLUMN old_name TO company_new_name;

// Alter - Modify the data type
ALTER TABLE companies
MODIFY company_name VARCHAR(100) DEFAULT 'unknown';

// Alter - Constraints
ALTER TABLE houses ADD CONSTRAINT positive_pprice CHECK (purchase_price >= 0);


// Delete row in table
DELETE FROM cats;  // to delete all rows in column
DELETE FROM <table_name> WHERE <column_name> = 'some value' eg DELETE FROM cats WHERE name='Egg';



Functions in SQL

// Concatenation of column
SELECT CONCAT(<column1_name>,<column2_name>,'random text') AS <new_column_name> FROM <table_name>;

// Concatenate with separator
SELECT CONCAT_WS('-',<column1_name>,<column2_name>) AS <new_column_name> FROM <table_name>;

//Substring, It return the cut string, we can also use negative value
SELECT SUBSTRING(<column_name>,starting_point,length); eg SELECT SUBSTRING(title, 1, 10) AS 'short title' FROM books;

//Combining string function
SELECT CONCAT(SUBSTRING(title, 1, 10),'...') AS 'short title' FROM books;

// Replace (str,from_str,to_str) --- This function is case sensitive
SELECT REPLACE(title, 'e ', '3') FROM books;

// Reverse, exception is that it don't work for null
SELECT REVERSE('abc');

// char Length of string, there is differenc between LENGTH and CHAR_LENGTH. Length return the value in bytes
SELECT LENGTH(@dolphin), CHAR_LENGTH(@dolphin);   // retrun value is 6,2

// SELECT UPPER('Hej');
// SELECT LOWER('QUADRATICALLY');

// To insert a value, INSERT(string, position, length to be replace, newstr to be added)
SELECT INSERT('Quadratic', 3, 4, 'What');  gives 'QuWhattic'

// LEFT(string, length from left) eg SELECT LEFT('foobarbar', 5); gives 'fooba' 
// RIGHT(string, length from right) eg SELECT RIGHT('foobarbar', 4); gives 'rbar' 
 
// REPEAT(str,count) eg  SELECT REPEAT('MySQL', 3); gives 'MySQLMySQLMySQL'
We have the trim for the different scenerio

// To select unique value from column
SELECT DISTINCT <column_name> FROM <table_name>
SELECT DISTINCT <column1_name>,<column2_name> FROM <table_name>  // for distinct combination if column1 and column2

// Sorting our results, ORDER By used at the end, ascending by default
SELECT <column_name> FROM <table_name> ORDER BY <column_name>
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY <column_name> DESC       // for descending the sort
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY 2   // means sort the column2
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY <column1_name>,<column2_name>   // means sort by column1 and when column1 have 2 values then sort it by column 2 

// To Limit the data, Limit 5 means show first 5 data
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY <column_name> DESC LIMIT 5
SELECT <column1_name>,<column2_name> FROM <table_name> ORDER BY <column_name> DESC LIMIT <start_point>,count to show

// For searching or you can say includes of js, we use the LIKE of SQL. % means 0 or more characters, _ means search with that much character length
WHERE <column_name> LIKE '%search_text%'
WHERE <column_name> LIKE '__'
SELECT * FROM books WHERE title LIKE '%\_%';  // To select books with an underscore '_' in title:


// AGGREFATE FUNCTIONS - functions that can operate on multiple rows or multiple pieces of data at once to tell us the min or max or avg or sum etc

// Count function- it basically gives the number of rows
SELECT COUNT(*) FROM <table_name>    // gives all the rows in table. Instead of * we can also use the <column_name>
eg SELECT COUNT(DISTINCT released_year) FROM books
eg SELECT COUNT(*) FROM books WHERE title LIKE '%the%'


// Group By - It summarizes or aggregate identical data into single rows
eg SELECT author_lname, COUNT(*) FROM books GROUP BY author_lname 
eg SELECT author_lname, COUNT(*) FROM books GROUP BY author_lname, author_fname

// Min and Max
eg SELECT MIN(<column_name>) FROM <table_name>
SELECT MAX(<column_name>) FROM <table_name>

// Subqueries - when we have query inside a query its a subqueries. The part in the bracket runs first and then the rest run
eg SELECT title, pages FROM books WHERE pages = (SELECT MAX(pages) FROM books)
eg SELECT CONCAT(author_fname, ' ', author_lname) AS author,  COUNT(*) FROM books GROUP BY author;


// SUM 
eg SELECT SUM(<column_name>) FROM <Table>

// Average
ef SELECT AVG(<column_name>) FROM <Table>
SELECT released_year, AVG(stock_quantity),COUNT(*) FROM books GROUP BY released_year;



// Logical operator(&& is written as AND, || is written as OR)
SELECT * FROM books WHERE title NOT LIKE '%e%';
SELECT title, author_lname, released_year FROM books WHERE released_year > 2010 AND author_lname = 'Eggers' AND title LIKE '%novel%';
SELECT title, pages FROM books WHERE pages < 200  OR title LIKE '%stories%';
SELECT title, released_year FROM books WHERE released_year NOT BETWEEN 2004 AND 2014;   // it is NOT BETWEEN case

// Multiple OR replaced by 
SELECT title, author_lname FROM books WHERE author_lname IN ('Carver', 'Lahiri', 'Smith');
SELECT title, author_lname FROM books WHERE author_lname NOT IN ('Carver', 'Lahiri', 'Smith');




// Joining the two table. (One to many)

// We join the two table by one column which is common in both the table. For joining, we mark the foreign key 
// advantage of using the foreign key is that it checks the that adding value is already available or not.

FOREIGN KEY (<same_table_column>) REFERENCES <other_table_name>(<other_table_column_name>)

eg

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



// Inner Join -- Ishme jisme sab hota h wahi aata h null wala nhi aata h
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

// Left Join - In inner join we only show the the comman parts full detail but in left join we takes all row of left table and show corresponding value
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


// Left Join with Group By
SELECT 
    first_name, 
    last_name, 
    IFNULL(SUM(amount), 0) AS money_spent
FROM
    customers
        LEFT JOIN
    orders ON customers.id = orders.customer_id
GROUP BY first_name , last_name;



// Right Join
SELECT 
    first_name, last_name, order_date, amount
FROM
    customers
        RIGHT JOIN
    orders ON customers.id = orders.customer_id;


// On delete cascade - In this if we want to delete the data of one table, it can't be deleted because of foreign key so we it. so if we delete it from one place it gets deletd from other places also
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



// Joining the two table. (many to many) - In this we create a additional table and add foreign key to both table
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

// video 255 jarur dekho if check wala




// VIEWS - Views are the stored queries that when invoked produce a result set. It is not real table, its a virtual table.
Basically real data se query bna k ek virtual table bnana h phir usi se value nikalni h. ya simple badi badi query table ko choti choti banana
limitation of view/virtual table is that some functions do not work on it eg delete when aggregation is done, for further visit the website

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

// Replacing the views 
CREATE VIEW ordered_series AS
SELECT * FROM series ORDER BY released_year;

CREATE OR REPLACE VIEW ordered_series AS
SELECT * FROM series ORDER BY released_year DESC;

ALTER VIEW ordered_series AS
SELECT * FROM series ORDER BY released_year;

DROP VIEW ordered_series;  // This is to drop/delete the view


// Having clause in Group By
SELECT 
    title, 
    AVG(rating),
    COUNT(rating) AS review_count
FROM full_reviews 
GROUP BY title HAVING COUNT(rating) > 1;


// Rollup clause in Group By - this provide an additional row which has the value of total(sum, avg) which action(sum, avg) done on each
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

// Window function - window functions perform aggregate operations on groups of rows, but they produce a result FOR EACH ROW.
basically jab hum group by use karte h tab no of rows reduced ho jati h aut tab value milti h but windows wale case me value milti h but bina rows reduce hue

//over clasue - The OVER() clause constructs a window. When it's empty, the window will include all records
SELECT 
    emp_no, department, salary, MIN(salary), MAX(salary)
FROM
    employees;

// below one do not reduce the column count
SELECT 
    emp_no, 
    department, 
    salary, 
    MIN(salary) OVER(),
    MAX(salary) OVER()
FROM employees;

//over(Partition by department) clasue - the concept remain same that row don't get reduced but the row having same name comes side by side
SELECT 
    emp_no, 
    department, 
    salary, 
    AVG(salary) OVER(PARTITION BY department) AS dept_avg,
    AVG(salary) OVER() AS company_avg
FROM employees;

//over(Partition by department Order by ) clasue - within department, it sorted the row
SELECT 
    emp_no, 
    department, 
    salary, 
    SUM(salary) OVER(PARTITION BY department ORDER BY salary) AS rolling_dept_salary,
    SUM(salary) OVER(PARTITION BY department) AS total_dept_salary
FROM employees;

// We have the rank() and row_number() in the over. row number count the number of rows. dense rank gives rank within rank
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



// NTILE in Over -  Divide a partition into N groups
SELECT 
    emp_no, 
    department, 
    salary,
    NTILE(4) OVER(PARTITION BY department ORDER BY salary DESC) AS dept_salary_quartile,
	NTILE(4) OVER(ORDER BY salary DESC) AS salary_quartile
FROM employees;

// First Value
SELECT 
    emp_no, 
    department, 
    salary,
    FIRST_VALUE(emp_no) OVER(PARTITION BY department ORDER BY salary DESC) as highest_paid_dept,
    FIRST_VALUE(emp_no) OVER(ORDER BY salary DESC) as highest_paid_overall
FROM employees;

// LAG in values - LAG gives the previous or last value of row, LEAD gives the next value
SELECT 
    emp_no, 
    department, 
    salary,
    salary - LAG(salary) OVER(ORDER BY salary DESC) as salary_diff
FROM employees;