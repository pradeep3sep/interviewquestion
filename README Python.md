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