var data; // Declare a variable to store the fetched data

fetch("./output.json")
  .then(function(response) {
    return response.text();
  })
  .then(function(fetchedData) {
     data = JSON.parse(fetchedData); // Save the  data into the variable
    //console.log(fetchedData); // You can also log the data here if needed
  });


  var optionsBtn = document.getElementById("cho");
  var mode = document.getElementById("mode");
  var end = document.getElementById("verb_ending");
  var form = document.getElementById("tense");
  var next = document.getElementById("sub");
  var inputed = document.getElementById("conju");
  var yesno = document.querySelector(".yesno");
  var rate = document.getElementById("rate");
  var correct_ans = document.getElementById("correct_ans")

  var wrong = 0
  var right = 0

  cho.addEventListener('click',()=>{
    possible = make_list()
    ans = update_verb(possible)
  })

  next.addEventListener('click',()=>{
    answer_given = inputed.value
    if (answer_given == null){
      return;
    }
    else if (answer_given == ans){
      right += 1
      yesno.innerHTML = ("Correct")
      possible = make_list()
      ans = update_verb(possible)
      correct_ans.style.opacity = 0;
      conju.value =""
    }
    else{
      yesno.innerHTML = ("Incorect")
      wrong+=1
      correct_ans.style.opacity = 1;
    }
   rate.innerHTML = right + "/" + (wrong+right)
})

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    answer_given = inputed.value
    if (answer_given == null){
      return;
    }
    else if (answer_given == ans){
      right += 1
      yesno.innerHTML = ("Correct")
      possible = make_list()
      ans = update_verb(possible)
      correct_ans.style.opacity = 0;
      conju.value =""
    }
    else{
      yesno.innerHTML = ("Incorect")
      wrong+=1
      correct_ans.style.opacity = 1;
    }
   rate.innerHTML = right + "/" + (wrong+right)
    

    event.preventDefault();
  }});

function make_list(){
  possible = []
  var ending = end.value;
  var all_words = Object.keys(data)
  if (ending == "all_e"){
    for (const element of all_words) {
          possible.push(element);
    }
  }
  else if (ending == "ir"){
    for (const element of all_words) {
      if (element.endsWith("ir") && element.endsWith("oir") == false) {
          possible.push(element);
    }}
  }
  else{
  for (const element of all_words) {
    if (element.endsWith(ending)) {
        possible.push(element);
  }}
  }

  return possible
}

function update_verb(possible){
    person = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"]
    person_alt = ["tu", "nous", "vous"]
    tense_list = ["P","pc","I","F","Y","C"]
    var tense = form.value;

    if (tense == "all_t"){
      var random_ten_Index = Math.floor(Math.random() * tense_list.length);
      tense = tense_list[random_ten_Index]
    }

    var tense_displayable = ""
    if (tense == "P"){
      tense_displayable = "(Présent)"
    }
    else if(tense == "pc"){
      tense_displayable = "(Passé Composé)"
      tense = "K"
    }
    else if(tense == "I"){
      tense_displayable = "(Imparfait)"
    }
    else if(tense == "F"){
      tense_displayable = "(Future Simple)"
    }
    else if(tense == "Y"){
      tense_displayable = "(Impértif)"
    }
    else if(tense == "C"){
      tense_displayable = "(Conditionnel)"
    } 

    //display verb and tense
    var randomIndex = Math.floor(Math.random() * possible.length);
    var verb_location = document.getElementById("verb_display");
    verb_location.innerHTML = possible[randomIndex] + " " + tense_displayable;

    //display person
    if (tense != "Y"){
      var person_random_index = Math.floor(Math.random() * person.length);
      var person_display = document.getElementById("person_display")
      person_display.innerHTML = person[person_random_index]
    }
    else{
      var person_random_index = Math.floor(Math.random() * person_alt.length);
      var person_display = document.getElementById("person_display")
      person_display.innerHTML = person_alt[person_random_index]
      if (person_random_index == 0){
        person_random_index = 1
      }
      else if (person_random_index == 1){
        person_random_index = 3
      }
      else if (person_random_index == 2){
        person_random_index = 4
      }
    }


    var correct_ans = document.getElementById("correct_ans")
    if (tense == "K" && person_random_index<=2){
      person_random_index = 0
    }
    else if(tense == "K" && person_random_index>=3){
      person_random_index = 1
    }
    
    
    var corrct_placeholder = data[possible[randomIndex]][tense][person_random_index]
    
    correct_ans.innerHTML = corrct_placeholder
    return (corrct_placeholder)
}

