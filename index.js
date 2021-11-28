window.onload = timeClock()

function timeClock() {
    const currentTime = new Date()
    const month = currentTime.getMonth();
    const day = String(currentTime.getDay()).padStart(2, "0");
    const hour = String(currentTime.getHours()).padStart(2, "0");
    const minute = String(currentTime.getMinutes()).padStart(2, "0");
    const second = String(currentTime.getSeconds()).padStart(2, "0");
    const clockElem = document.querySelector("#timeText");
    const dayNightCycle = document.querySelector("#dayCycle");
    let dayNightText = "";

    if (hour < 13) {
        dayNightText = "AM";
    } else {
        dayNightText = "PM";
    };

    dayNightCycle.innerHTML = `${dayNightText}`;
    clockElem.innerHTML = `${hour}:${minute}`;
};

setInterval(timeClock, 1000);

const login = document.querySelector(".loginWrap");

const loginBtn = document.querySelector(".login");
const loginForm = document.querySelector(".formWrap");
const loginInput = document.querySelector(".submitText");

const userIcon = document.querySelector(".greetingsBox")
const userLog = document.querySelector(".greetingsWrap");
const userLogText = document.querySelector(".greetingsText");

const listForm = document.querySelector(".doListWrapper");
const listInput = listForm.querySelector("input");

const randomQuote = document.querySelector(".randomQuote");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_TYPE = "username";
const LIST_ITEM = `List`;

const savedUsername = localStorage.getItem(USERNAME_TYPE);


// Login Handler Code (from here)

if (savedUsername === null) {
    login.classList.remove(HIDDEN_CLASSNAME);
} else {
    userLogText.innerHTML = savedUsername;
    userLog.classList.remove(HIDDEN_CLASSNAME);
};

loginBtn.addEventListener("click", function(){
    loginForm.classList.toggle(HIDDEN_CLASSNAME);
});

function handleLogin(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    login.classList.add(HIDDEN_CLASSNAME);

    const username = loginInput.value;
    localStorage.setItem(USERNAME_TYPE, username);

    userLogText.innerHTML = `${username}`;
    userLog.classList.remove(HIDDEN_CLASSNAME);
};

function handleLogOut() {
    
}

loginForm.addEventListener("submit", handleLogin);
userIcon.addEventListener("click", handleLogOut)



// To Do List Handler (from here)

let listArray = [];
const listElement = document.querySelector(".workList");

function makeList(newItem) {
    const li = document.createElement("li");
    listElement.appendChild(li);
    const span = document.createElement("span");
    li.appendChild(span);
    span.innerText = newItem;
};

function addList(event) {
    event.preventDefault();
    const workname = listInput.value;
    listInput.value = "";
    const worknameObj = {
        text: workname,
        id: Date.now(),
    }
    listArray.push(worknameObj);
    createFunc(worknameObj);
    saveFunc();
};

listForm.addEventListener("submit", addList);

const savedLocalArray = localStorage.getItem(LIST_ITEM)

if (savedLocalArray !== null) {
    const parsedList = JSON.parse(savedLocalArray);
    listArray = parsedList;
    parsedList.forEach(createFunc);
}

function deleteListItem (event) {
    const targetElem = event.target.parentElement;
    const trueTarget = targetElem.parentElement
    targetElem.remove();
    listArray = listArray.filter((todo) => todo.id !== parseInt(trueTarget.id));
    saveFunc();
    console.log(listArray)
}

function createFunc(element) {
    const li = document.createElement("li");
    li.id = element.id
    listElement.appendChild(li);
    const div = document.createElement("div");
    const innerSpan = document.createElement("span");

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete")
    delBtn.addEventListener("click", deleteListItem);
    innerSpan.addEventListener("click", ListItemDone)
    li.appendChild(div);
    div.appendChild(innerSpan)
    innerSpan.innerHTML = element.text;
    div.appendChild(delBtn);
    delBtn.innerHTML = "X";
}

function saveFunc() {
    localStorage.setItem(LIST_ITEM, JSON.stringify(listArray));
}

function ListItemDone (event) {
    const eventTarg = event.target;
    eventTarg.classList.toggle("cancelLine");
}