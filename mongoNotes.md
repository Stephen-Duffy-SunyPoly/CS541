# Mongo Notes
## Basics
Unline a standard database query that is semantic English, mongo queries look more like JavaScript code, becaus ei gues it is:
```js
db.users.find()
```
is basically
```sql
SELECT * FROM users;
```


Data stored in mongo is typically represent as JSON  
adding a bunch of data might look like this, Note that the table does not exist before this.
```js
db.users.insertMany([
    {
        name: "Alice",
        age: 32,
        city: "New York",
        interests: ["music", "hiking"]
        },
    {
        name: "Bob",
        age: 25,
        city: "Boston",
        interests: ["gaming", "music"]
        },
    {
        name: "Charlie",
        age: 41,
        city: "New York",
        interests: ["hiking", "photography"]
        },
    {
        name: "Diana",
        age: 29,
        city: "Chicago",
        interests: ["gaming", "cooking"]
    }
])
```

Each field in the JSON represents a column in the data, because this appears to be JavaScript, datatypes are not what we would clasicaly think of as dataypes. everything can be resspresnetd as a JSON object

Supplying a JOSN Object to the find function acts similarly to a basic `WHERE` clause in SQL. It will attempt to return results that exactly match the passed in object also known as matching the "shape" of the object:
```js
db.users.find({
    age: 32
})
```
is equivalent to:
```sql
SELECT * FROM users WHERE age = 32;
```

for anything other than strictly equal combined with anding together we need to employ inline condition specifiers:
```js
db.users.find({
   age: {$gt: 30}
})
```
Here `$gt` represents Greater Than
for an OR opperation the whole object gets encased an array supplied to the or condition:
```js
db.users.find({
    $or: [
        { city: "New York" },
        { city: "Boston" }
    ]
})
```

but, you can also specify that it can match a single parameter to any in a provided list using the `$in` condition
```js
db.users.find({
    city: { $in: ["New York", "Boston"] }
})
```

This is nice and all but this has been returning every column at all times, would it supersize you to learn another JSON object parameter is involved in refining that selection?
```js
db.users.find(
    {},
    { name: 1, age: 1, _id: 0 }
)
```
This returns: yes the name, yes the age, not the row id.

If on of our columns contains a list of data, Mongo can automatically search this list for a match for us:
```js
db.users.find({
    interests: "hiking"
})
```
This returns any row where the interests list contains the string hiking. This can be combined with the `$in` condition to return results where a list contains any of the results
```js
db.users.find({
    interests: { $in: ["hiking", "cooking"] }
})
```

## Nested Documents
Haven't mentioned this yet, but a row is referred to as a document

Nested documents can be accessed by using the . notation in the request field:
```js
db.users.find({
  "address.city": "New York"
})
```

## Updating Documents
In SQL you might have a statement like this:
```sql
UPDATE users SET age = 33 WHERE name = 'Alice';
```
In mongo this is accomplished like this:
```js
db.users.updateOne(
    { name: "Alice" },
    { $set: { age: 33 } }
)
```
If a column is a list, you can add and remove items from them directly:
```js
db.users.updateOne(
    { name: "Alice" },
    {$push: { interests: "coding" }}
)
db.users.updateOne(
    { name: "Alice" },
    { $pull: { interests: "music" } }
)
```
You can not add and remove from the same list at the same time tho.

## Aggregation
Like SQL, Mongo content ways to query information about data in aggregate:
```sql
SELECT city, COUNT(*) FROM users GROUP BY city;
```
can be achieved in mongo through the use of the aggregate function
```js
db.users.aggregate([
    {
        $group: {
            _id: "$city",
            count: { $sum: 1 }
        }
    }
])
```
Note the use of the $ before the column name, this signifies that the result should be grouped by the individual values of this column and not just name each row.

If you wanted to add a where clause to the aggregation, that can be achieved through the `$match` condition:
```js
db.users.aggregate([
    {
        $match: {
            age: { $gte: 30 }
        }
    },
    {
        $group: {
            _id: "$city",
            averageAge: { $avg: "$age" },
            count: { $sum: 1 }
        }
    },
    {
        $sort: {
            averageAge: -1
        }
    }
])
```


Here is a list of querying features:

| Feature                     | Description                                                                                                                                                                                                                      |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| insertMany()                | Add multiple records to a table                                                                                                                                                                                                  |
| find()                      | Retrieve data from a table                                                                                                                                                                                                       |
| \$gt / \$gte / \$lt / \$lte | Standard comparison conditions (< <= > >=)                                                                                                                                                                                       |
| $in                         | Match if one of the following values is in the field                                                                                                                                                                             |
| $or                         | Match if any of the following shapes are satisfied                                                                                                                                                                               |
| $and                        | Matcn if ALL of the following shapes are satisfied                                                                                                                                                                               |
| projection                  | Basically limit the fields returned. this is what the seccond parameter in the find function is called, can also be applied as a funcion on its own. Usually you can not mix allowing and disallowing, appart from the _id field |
| sort()                      | Function applied to the result of a find or agrate, orders the result by a specific colunm value                                                                                                                                 |
| limit()                     | Function applied to the result of a find or agrate, only returns a maximum number of results                                                                                                                                     |
| updateOne()                 | Updates the values stored in a single row                                                                                                                                                                                        |
| $set                        | Set the value of a field ion an update                                                                                                                                                                                           |
| $push                       | Add an element to a list in an update                                                                                                                                                                                            |
| $pull                       | Remove an element from a list in an update                                                                                                                                                                                       |
| =====                       |                                                                                                                                                                                                                                  |
| aggregate()                 | Synthesizes data from exsisting data in a pipeline fassion                                                                                                                                                                       |
| $match                      | A contidion for data to be used in futher agrogation                                                                                                                                                                             |
| $group                      | How data should be grouped for later in the pipeline                                                                                                                                                                             |
| $project                    | Pipeline version of the projection funcion                                                                                                                                                                                       |
| $sort                       | similar to the sort funciom but for the aggrodation pipeline                                                                                                                                                                     |
| $unwind                     | Pipeline stage that takes each element in a list and turns them into their own documents                                                                                                                                         |

```js
db.users.aggregate([
    { $unwind: "$interests" }
])
```
Returns a number of rows where the interest column in each row contains only 1 value. Each value from the list gets its own row. 

## Lookups
This is Mongo's replacement for sql's JOINs. It is important to note tho that Mongo does not aim to be relational, so cross table data is intended to be less common.

Another Table (pretend it says product not project):
```js
db.orders.insertMany([
    {
        ammount: 20,
        project: "beans",
        orderer: "Alice"
    },
    {
        ammount: 40,
        project: "tin can",
        orderer: "Alice"
    },
    {
        ammount: 14,
        project: "duct tape",
        orderer: "Alice"
    },
    {
        ammount: 150,
        project: "duct tape",
        orderer: "Bob"
    },
    {
        ammount: 1,
        project: "tin can",
        orderer: "Bob"
    },
    {
        ammount: 9000,
        project: "beans",
        orderer: "Diana"
    }
])
```

In SQL you might query:
```sql
SELECT * FROM users JOIN orders ON users.name = orders.orderer;
```

In mongo this can be achieved through:
```js
db.users.aggregate([
    {
        $lookup: {
            from: "orders",
            localField: "name",
            foreignField: "orderer",
            as: "orders"
        }
    }
])
```
Note: this attaches a list of order documents to each row instead of the inner join mechanic of SQL, if you wanted to achieve that here,
```js
db.users.aggregate([
    {
        $lookup: {
            from: "orders",
            localField: "name",
            foreignField: "orderer",
            as: "orders"
        }
    },
    {
        $unwind: "$orders"
    }
])
```
Note: this will put the entire order document into a single column in each row, better but not complete result parity.

lookup can also get much more complicated, you can embed a pipeline inside a lookup block.

## String processing
Most string processing take place inside an aggregation pipeline

String concatenation can is done through:
```js
{
  $concat: ["$firstName", " ", "$lastName"]
}

db.users.aggregate([
    {
        $project: {
            fullName: {
                $concat: ["$firstName", " ", "$lastName"]
            }
        }
    }
])
```

Case management functions:
```js
{
  $toLower: "$email"
}
{
    $toUpper: "$name"
}
```

substrings:
```js
{
  $substrCP: ["$name", 0, 5]
}
```

splitting:
```js
{
    $split: ["$email", "@"]
}
```
This will return a list as one might expect

Regex:
```js
db.users.aggregate([
    {
        $match: {
            $expr: {
                $regexMatch: {
                    input: "$email",
                    regex: /@gmail\.com$/
                }
            }
        }
    }
])
```
this roughly approximates the sql
```sql
WHERE email LIKE '%@gmail.com'
```

regex can also be used directly:
```js
db.users.find({
  name: /^alice/i
})
```
name starts with Alice, case-insensitively

case Insensitive comparison:
```js
{
  $strcasecmp: ["$name", "alice"]
}
```