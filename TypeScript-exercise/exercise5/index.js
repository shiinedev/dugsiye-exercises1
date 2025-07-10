function echo(input) {
    return input;
}
console.log(echo(20));
console.log(echo("Abdi Ali"));
console.log(echo({ name: "Ali", age: 20 }));
console.log(echo([10, 20, 30,]));
var result = {
    status: "pending",
    data: "Abdi"
};
console.log("result: ", result);
var user = {
    status: "completed",
    data: { id: 1, name: "ali" }
};
console.log("user: ", user);
function first(items) {
    return items[0];
}
var names = ["farax", "Amiin", "Ali"];
var numbers = [20, 30, 60, 50];
var users = [{ id: 1, name: "Ali" }, { id: 2, name: "faarah" }, { id: 4, name: "Amin" }];
console.log(first(names));
console.log(first(numbers));
console.log(first(users));
