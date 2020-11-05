window.onload = function () {
    show(0);
};

//Questions
var questions = [
    {
        id: 1,
        question: "What is the full form of RAM ?",
        answer: "Random Access Memory",
        options: [
            "Random Access Memory",
            "Randomly Access Memory",
            "Run Aceapt Memory",
            "None of these",
        ],
    },
    {
        id: 2,
        question: "What is the full form of CPU ?",
        answer: "Central Processing Unit",
        options: [
            "Central Program Unit",
            "Central Processing Unit",
            "Central Preload Unit",
            "None of these",
        ],
    },
    {
        id: 3,
        question: "What is the full form of E-mail ?",
        answer: "Electronic Mail",
        options: [
            "Electronic Mail",
            "Electric Mail",
            "Engine Mail",
            "None of these",
        ],
    },
];


function submitForm() {
    var name = document.getElementById("name");

    var playerName = {
        name: name.value,
    };

    // console.log(playerName)
    firebase.database().ref("Player Name").set(playerName);
    name.value = "";
    window.location.assign("quiz.html")
}

var question_count = 0;
var point = 0;

function next() {
    var user_answer = document.querySelector("li.option.active").innerHTML;

    if (user_answer == questions[question_count].answer) {
        point += 10;
        firebase.database().ref("Points").set(point);
    } else {
        point += 0;
        firebase.database().ref("Points").set(point);
    }

    if (question_count == questions.length - 1) {
        window.location.assign("result.html")
        return;
    }

    question_count++;
    show(question_count);
}

function show(count) {
    var question = document.getElementById("questions");

    // old method
    // question.innerHTML = "<h2>" + questions[count].question + "</h2>" ;

    //new method
    question.innerHTML = `
            <h2>Q${question_count + 1} ${questions[count].question}</h2>
            <ul class="option_group">
            <li class="option" >${questions[count].options[0]}</li>
            <li class="option" >${questions[count].options[1]}</li>
            <li class="option">${questions[count].options[2]}</li>
            <li class="option">${questions[count].options[3]}</li>
            </ul>
    `;

    toggleActive();
}

function toggleActive() {
    let option = document.querySelectorAll("li.option");

    for (let i = 0; i < option.length; i++) {
        option[i].onclick = function () {
            for (let j = 0; j < option.length; j++) {
                if (option[j].classList.contains("active")) {
                    option[j].classList.remove("active");
                }
            }
            option[i].classList.add("active");
        };
    }
}

var name = firebase.database().ref("Player Name/name").once("value", function (data) {
    document.querySelector(".name").innerHTML = data.val()
})
var points = firebase.database().ref("Points").once("value", function (data) {
    document.querySelector(".points").innerHTML = data.val()
})
