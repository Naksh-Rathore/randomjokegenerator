console.log("Thanks to Official Joke API");

if (!localStorage.getItem("favJokes")) {
    localStorage.setItem("favJokes", JSON.stringify([]));
}
let favJokes = JSON.parse(localStorage.getItem("favJokes"));

const jokeElement = document.getElementById("jokeElement");
const favJokeDisplay = document.getElementById("favJokeDisplay");

favJokeDisplay.textContent = favJokes.join(" || ");

async function getJoke() {
    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");

        if (!response.ok) {
            throw new Error("API could not be found");
        }

        return response.json();
    } 

    catch (error) {
        console.error(error);
    }
}

async function generateJoke() {
    const data = await getJoke();
    const joke = data.setup + " " + data.punchline;
    
    jokeElement.textContent = joke;
}

function favJoke() {
        if(!favJokes.includes(jokeElement.textContent) && jokeElement.textContent !== "") {
            
            favJokes.push(jokeElement.textContent);
            favJokeDisplay.textContent = favJokes.join(" || ");
    
            localStorage.setItem("favJokes", JSON.stringify(favJokes));
        }
}

function removeJokes() {
    favJokes = [];
    localStorage.setItem("favJokes", JSON.stringify(favJokes));

    favJokeDisplay.textContent = "";
}
