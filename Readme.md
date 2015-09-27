tsd query jquery --action install
tsd query router --action install
tsd query angular2 --action install
tsd query firebase --action install
tsd query es6-promise --action install
tsd query  q --action install
tsd query  rx --action install
tsd query  rx-lite --action install

https://github.com/ludohenin/angularjs-ts-seed

 var todoRef = this.dataRef.child("todo");
        todoRef.set({
            id: 1,
            title: 'sdfas',
            description: 'sdfa',
            createDate: ''
        });

		 var postID = newPostRef.key();

ref.on("child_added", function (snapshot, prevChildKey)
{
    var newPost = snapshot.val();
    console.log("Author: " + newPost.author);
    console.log("Title: " + newPost.title);
    console.log("Previous Post ID: " + prevChildKey);
});

ref.on("child_changed", function (snapshot)
{
    var changedPost = snapshot.val();
    console.log("The updated post title is " + changedPost.title);
});

ref.on("child_removed", function (snapshot)
{
    var deletedPost = snapshot.val();
    console.log("The blog post titled '" + deletedPost.title + "' has been deleted");
});

ref.once("value", function (data)
{
    // do some stuff once
});

ref.orderByChild("height").on("child_added", function (snapshot)
{
    console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});

ref.orderByKey().on("child_added", function (snapshot)
{
    console.log(snapshot.key());
});

scoresRef.orderByValue().on("value", function (snapshot)
{
    snapshot.forEach(function (data)
    {
        console.log("The " + data.key() + " dinosaur's score is " + data.val());
    });
});

ref.orderByChild("weight").limitToLast(2).on("child_added", function (snapshot)
{
    console.log(snapshot.key());
});

ref.orderByChild("height").limitToFirst(2).on("child_added", function (snapshot)
{
    console.log(snapshot.key());
});

scoresRef.orderByValue().limitToLast(3).on("value", function (snapshot)
{
    snapshot.forEach(function (data)
    {
        console.log("The " + data.key() + " dinosaur's score is " + data.val());
    });
});

ref.orderByChild("height").startAt(3).on("child_added", function (snapshot)
{
    console.log(snapshot.key())
});

ref.once('value', function (snap)
{
    var result = 'is not';
    // iterate all the elements :((
    snap.forEach(function (ss)
    {
        if (ss.val() === 'alpha')
        {
            result = 'is';
            return true;
        }
    });
    console.log('Mary ' + result + ' a member of alpha group');
});