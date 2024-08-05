class Data {
  constructor(id, title, description, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
  toPlainObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
    };
  }
}
class ListName {
  constructor() {
    this.arr = [];
  }
  add(data) {
    this.arr.push(data);
  }
  remove(id) {
    this.arr = this.arr.filter((item) => item.id !== id);
  }
}
class Datewise {
  constructor() {
    this.listName = new ListName();
    this.DatewiseArray = {};
  }
  addday(day) {
    if (!this.DatewiseArray[day]) {
      this.DatewiseArray[day] = [];
    }
  }
  removeday(day) {
    delete this.DatewiseArray[day];
  }
  addDataToList(day, id, title, description, priority) {
    if (!this.DatewiseArray[day]) {
      this.addday(day);
    }
    let data = new Data(id, title, description, priority);
    this.DatewiseArray[day].push(data);
    this.listName.add(data);
  }
  removeDataFromList(day, id) {
    if (this.DatewiseArray[day]) {
      this.DatewiseArray[day] = this.DatewiseArray[day].filter(
        (item) => item.id !== id
      );
    }
    this.listName.remove(id);
  }
  toPlainObject() {
    const plainObject = {};
    for (const day in this.DatewiseArray) {
      plainObject[day] = this.DatewiseArray[day].map((data) =>
        data.toPlainObject()
      );
    }
    return plainObject;
  }
}
let val = new Datewise();
val.addday("Monday");
val.addday("Tuesday");
val.addday("Wednesday");
val.addday("Thursday");
val.addday("Friday");
val.addday("Saturday");
val.addday("Sunday");

val.addDataToList("Monday", 1, "mani", "swimming", "High");
val.addDataToList("Monday", 2, "mani", "swimming", "High");
val.addDataToList("Wednesday", 3, "mani", "swimming", "High");
console.log(val.toPlainObject());
