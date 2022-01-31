/// MONGODB LAB 1 (Part 1)
// List all people. (200)
db.people.find();

// Count all people. (200)
db.people.find().count();

// List all people in Arizona. (6)
db.people.find({ state: "Arizona" });

// List all males in Arizona. (2)
db.people.find({ state: "Arizona", gender: "Male" });

// List all people in Arizona plus New Mexico. (8)
db.people.find({ $or: [{ state: "Arizona" }, { state: "New Mexico" }] });

// List all people under age 40. (90)
db.people.find({ age: { $lt: 40 } });

// List all females in Florida between the ages of 40 and 45 (inclusive). (4)
db.people.find({
  gender: "Female",
  state: "Florida",
  age: { $lte: 45, $gte: 40 },
});

// List people whose first name starts with "H". (2)
db.people.find({ first_name: /^H/ });
db.people.find({ first_name: /^h/i });

// List all people in Michigan, sorted by first name. (6)
db.people.find({ state: "Michigan" }).sort({ first_name: 1 });

// List all people who live in Virginia or are named Virginia.
db.people.find({ $or: [{ state: "Virginia" }, { first_name: "Virginia" }] });

// List the names of people under age 30. Only display their first and last name. (38)
db.people.find(
  {
    age: { $lt: 30 },
  },
  {
    // these values display the keys, true = 1 false = 0
    first_name: true,
    last_name: true,
  }
);

// List all people in Montana. Display all information except age. (2)
db.people.find({ state: "Montana" }, { age: false }); // false or 0 work the same
db.people.find({ state: "Montana" }, { age: 0 });
// List the email addresses of people with a ".edu" email. Only display the email. (12)
db.people.find({ email: /.edu$/ }, { email: true });
db.people.find({ email: /.edu$/ }, { email: 1 });

// Count all people with at least one child under age four. (69)
db.people.find({ "children.age": { $lt: 4 } }).count();

// List people who have no children. (43)
db.people.find({ children: [] });

// List people who have at least one child. (157)
db.people.find({ "children.age": { $gte: 1 } }).count();
db.people.find({ children: { $ne: [] } }).count();

/// MONGODB LAB 1 (Part 2)

// ---------------------1-------------
// Add a person to the collection. You pick the data,
//.. but they should have an empty array for children.

db.people.insertOne({
  first_name: "Marty",
  last_name: "McFly",
  email: "delorean@movies.com",
  gender: "male",
  age: "22",
  state: "California",
  children: [],
});

//   -----------------2---------------
// Add another person. They should have at least two children.
db.people.insertOne({
  first_name: "Emmet",
  last_name: "Brown",
  email: "fluxCapacitor@movies.com",
  gender: "male",
  age: "22",
  state: "California",
  children: [
    { name: "Lucy", age: 7 },
    { name: "Ricky", age: 12 },
  ],
});

//   -----------------3---------------
// Update one person named Clarence. He moved from North Dakota to South Dakota.

db.people.updateOne(
  { first_name: "Clarence" },
  { $set: { state: "South Dakota" } }
);

//   -----------------4---------------
// Update Rebecca Hayes. Remove her email address.

db.people.updateOne(
  { first_name: "Rebecca", last_name: "Hayes" },
  { $set: { email: "" } }
);

//   -----------------5---------------
// Update everyone from Missouri. They all had a birthday today,
// add one to their age. (expect 4 matches)

db.people.updateMany({ state: "Missouri" }, { $inc: { age: 1 } });

//   -----------------6---------------
// Jerry Baker has updated information. Replace with a new document.....

db.people.updateOne(
  { _id: ObjectId("61f3fdb2277655a5f51b3175") },
  {
    $set: {
      last_name: "Baker-Mendez",
      email: "jerry@classic.ly",
      age: 28,
      state: "Vermont",
      children: [
        {
          name: "Alan",
          age: 18,
        },
        { name: "Jenny", age: 3 },
      ],
    },
  }
);

//   -----------------7---------------
// Delete Wanda Bowman.
db.people.deleteOne({ first_name: "Wanda", last_name: "Bowman" });

//   -----------------8---------------
//  Delete everyone who does not have an email address specified.
//  (expect 36 matches - maybe more depending what you added above)

db.people.deleteMany({ email: null });

//  ------------------9---------------
// Add several documents to a new submissions collection. Do it all in one command.
db.submissions.insertMany([
  {
    title: "The River Bend",
    upvotes: 10,
    downvotes: 2,
    artist: ObjectId("61f3fdb2277655a5f51b30f6"),
  },
  {
    title: "Nine Lives",
    upvotes: 7,
    downvotes: 0,
    artist: ObjectId("61f3fdb2277655a5f51b3124"),
  },
  {
    title: "Star Bright",
    upvotes: 19,
    downvotes: 3,
    artist: ObjectId("61f3fdb2277655a5f51b31a7"),
  },
  {
    title: "Why Like This?",
    upvotes: 1,
    downvotes: 5,
    artist: ObjectId("61f3fdb2277655a5f51b312d"),
  },
  {
    title: "Non Sequitur",
    upvotes: 11,
    downvotes: 1,
    artist: ObjectId("61f3fdb2277655a5f51b30f4"),
  },
]);

//  ------------------10---------------
//Add 2 upvotes for "The River Bend".
db.submissions.updateOne({ title: "The River Bend" }, { $inc: { upvotes: 2 } });

//  ------------------11---------------
//Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.updateMany(
  { submissions: { $gte: 10 } },
  { $set: { round2: true } }
);
