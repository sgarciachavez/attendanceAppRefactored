/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


///////////////////////
// Model Object
///////////////////////
class Model{
  constructor(){
    this.len = 12;
  }
  updateData(obj){
    localStorage.attendance = JSON.stringify(obj);
  }
  getData(){
    return JSON.parse(localStorage.attendance);
  }
  updateStudent(obj){
    let data = this.getData();
    let days = data[obj.name];
    let flag = days[obj.day];
    days[obj.day] = !flag;
    this.updateData(data);
  }
}
///////////////////////
// View Object
///////////////////////
class View{
  constructor(){
    this.len = 12; //number of days
    this.displayHeaderInfo();
  }

  displayHeaderInfo(){
    //display header Info the day number
    let htmlStr = '<tr><th class="name-col">Student Name</th>';
    for(let i=0; i < this.len; i++){
      let s = i+1;
      htmlStr += '<th>' + s + '</th>';
    }
    htmlStr += '<th class="missed-col">Days Missed-col</th></tr>'
    $("thead").html(htmlStr);
  }

  displayStudentInfo(attendance){
    let htmlStr = "";

    for(let s in attendance){
      let name = s;
      let days = attendance[s];
      let missedCount = 0;

      htmlStr += '<tr class="student"><td class="name-col">' + name + '</td>';
      for(let d in days){
        let id = d + " " + name;
        let flag = days[d];

        if(flag){
          htmlStr += '<td class="attend-col"><input id="'+id+'" type="checkbox" checked></td>';
        }else{
          missedCount++;
          htmlStr += '<td class="attend-col"><input id="'+id+'" type="checkbox"></td>';
        }
      }
      htmlStr += '<td class="missed-col">'+ missedCount +'</td></tr>';

      $("tbody").html(htmlStr);
    }
  }
}

let model = new Model();
let view = new View();


//This function serves as the Octupus/Controller
/* STUDENT APPLICATION */
$(function() {
    var attendance = model.getData();

    view.displayStudentInfo(attendance);

    $("tbody").click(function(evt){
      let id = evt.target.id;
      let student = {};
      let index = id.indexOf(" ");
      let len = id.length
      student.day = id.substr(0, index).trim();
      student.name = id.substr(index, len).trim();
      if(student.name.length > 0){
        model.updateStudent(student);
        view.displayStudentInfo(model.getData());
      }
    });

}());
