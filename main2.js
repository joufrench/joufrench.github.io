var data; // Declare a variable to store the fetched data

fetch("./translations.json")
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
  var form = document.getElementById("lang");
  var next = document.getElementById("sub");
  var inputed = document.getElementById("conju");
  var yesno = document.querySelector(".yesno");
  var rate = document.getElementById("rate");
  var correct_ans = document.getElementById("correct_ans");
  

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
    else if (ans.includes(answer_given)){
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
})

document.getElementById("mode").addEventListener("change", function(event) {
  mode = event.target.value;
  if (mode === "german"){
    window.location.href = "german.html";
  }
  if (mode === "all"){
    window.location.href = "index.html";
  }
  console.log("Mode changed to:", mode);
});

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    answer_given = inputed.value
    if (answer_given == null){
      return;
    }
    else if (ans.includes(answer_given)){
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
    tense_list = ["DE","EN"]
    var lang = form.value;

    if (lang == "all_t"){
      var random_ten_Index = Math.floor(Math.random() * tense_list.length);
      lang = tense_list[random_ten_Index]
    }

    var tense_displayable = ""
    if (lang == "DE"){
      tense_displayable = "(German)"
      tense = "DE"
    }
    else if(lang == "EN"){
      tense_displayable = "(English)"
      tense = "EN"
    }


    //display verb and tense
    var randomIndex = Math.floor(Math.random() * possible.length);
    var verb_location = document.getElementById("verb_display");
    verb_location.innerHTML = possible[randomIndex] + " " + tense_displayable;

    //find possible[randomIndex] in translate - 

    var correct_ans = document.getElementById("correct_ans")
    var corrct_placeholder = data[possible[randomIndex]]

    //console.log(corrct_placeholder)
    
    correct_ans.innerHTML = corrct_placeholder
    return (corrct_placeholder)
}

