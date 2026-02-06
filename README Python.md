# selfPython

0> NumPy Quickstart - https://numpy.org/doc/stable/user/quickstart.html

1> We use three single tick to add multi line console
eg. printf('''Hi, this
    is multi line
    console''')

2> Logical operators, In JS we have "&&", "||", "!" alternate in python is "and", "or", "not"

3> The conversion of one data type into the other data type is known as type casting. Logical string can be converted to integer and vice-verca, int to float vice-verca.
eg a = "345"
   a = int(a)
   print(type(a))

4> Input function, this function allows the user to take the input from the keyboard as a string
eg a = input("Please enter any value")
   print(a)

5>  String Slicing
    name = 'Harry'
    print(name[0:3])

    the above code gives the result of values from 0 index to 2, not the 3rd index ie "Har"

6> np.ones(2,3) used to create the two dimensional array with unit 0
    np.ones(2,3) used to create the two dimensional array with unit 1
    np.random.seed(101) used to create same random number everytime

7> createdArray.reshape((2,5)) changes the shape of the existing array to 2 rows and 5 columns
8> myNewArray = existingArray.copy() creates the new copy in it



### Pandas Learning

```py
import pandas as pd


df = pd.read_csv('/content/Cleaned_DataSet.csv')

# It shows the preview of top 5 the data
df.head()

# Do same but from the bottom
df.tail()

# It gives the rows & column size
df.shape

# gives details about you table, how many column have value and its type, etc
df.info()

# To fetch any particluar column of table
df['director_name']

# To have multiple column name
df[['director_name','gross','color']]


# To fetch the rows
df.iloc[3] - will get the 3 index data
df.iloc[1:3] - slicing happens,means to 1 to 3, except 3
df.iloc[1:11:2] - means data from 1 to 10,  and skipping 2nd row after value
df.iloc[[1,5,6]] - gives the row 1, 5 and 6 only

# We can also use the iloc to fetch the column
df.iloc[:,[1,5,6]] - means i need the column of index 1,5 and 6
df.iloc[:,1:] - i need the all the coulmn after the 1

# it gives the count of value in that cloumn, eg is below i want the langugage and count of values inside that coulmn
df['language'].value_counts()

# Data filtering

## We want the rows which have the coumn name 'language' and its value be 'English'
mask = df['language'] == 'English'
df[mask]
```