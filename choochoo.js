    $(document).ready(function()
    {
     
function Choochoo(TrainName,Destination,FirstArrival,Frequency){
this.TrainName=TrainName,
this.Destination=Destination,
this.FirstArrival=FirstArrival,
this.Frequency=Frequency
};
var db="";
var config = {
apiKey: "AIzaSyDi0dZ12zCslLwaY0kO30ScRMxJYWJdRbM",
authDomain: "train-e7479.firebaseapp.com",
databaseURL: "https://train-e7479.firebaseio.com",
projectId: "train-e7479",
storageBucket: "train-e7479.appspot.com",
messagingSenderId: "522441704687"
};
firebase.initializeApp(config);

initialize();
function initialize()
{
 db= firebase.database();
GetTrainSchedual(db);
//CreateTrainSchedule(db);
}
$('#AddTrain').click(function(){
  var obj={
    name:$('#TrainName').val(),
        Destination:$('#Destination').val(),
        FirstArrival:$('#FirstTrain').val(),
        Frequency:$('#Frequency').val()
             };
   var addstr="Trains/";
   var ques=db.ref(addstr);
    ques.push(obj);
  
});

function GetTrainSchedual(database)
{
	
	var addstr="Trains/";
var ref=database.ref(addstr);
ref.on("value",gotData,errData);
}


function gotData(data){

	var trains=data.val();
	var keys=Object.keys(trains);
   for(var e=0;e<keys.length;e++)
   {
   	var key=keys[e];
    var tFrequency = trains[key].Frequency;

    // Time is 3:30 AM
    var firstTime = trains[key].FirstArrival;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
   	var markup="<tr>"+"<td>"+trains[key].name+"</td>"+"<td>"+trains[key].Destination+"</td>"+
    "<td>"+
    trains[key].Frequency+"</td>"+"<td>"+moment(nextTrain).format("hh:mm")+"</td>"+"</tr>";
   
    $(markup).appendTo($("#traintimetable"));
     }

};
function errData(){};


function CreateTrainSchedule(database)
{
var trains=[];
var trainOne=new Choochoo("TrainOne","StoneBriar","06:00","25");
trains.push(trainOne);
var trainTwo=new Choochoo("trainTwo","Zoo","06:00","25");
trains.push(trainTwo);
var trainThree=new Choochoo("TrainThree","SMU","06:00","25");
trains.push(trainThree);
var trainFour=new Choochoo("TrainFour","Uptown","06:00","25");
trains.push(trainFour);
var trainFive=new Choochoo("TrainFive","Collin Creek","06:00","25");
trains.push(trainFive);
var trainSix=new Choochoo("TrainSix","Courtesy Nissan","06:00","25");
trains.push(trainSix);

var addstr="Trains/";
var ques=database.ref(addstr);

for(var t=0;t<trains.length;t++)
	{
		var obj={
		name:trains[t].TrainName,
        Destination:trains[t].Destination,
        FirstArrival:trains[t].FirstArrival,
        Frequency:trains[t].Frequency
	           };
		ques.push(obj);
	}

}
});



