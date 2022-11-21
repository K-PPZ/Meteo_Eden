const token = import.meta.env.VITE_KEY

let btn = document.getElementById("btn_submit");
let input = document.getElementById("input");
let form = document.getElementById("form");
let meteo = document.getElementById("meteo");
let erreur = document.getElementById("erreur");
let t = [];

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${token}`)
    const res = await req.json();

    console.log(req);
    console.log(res);

    
    if (res.cod != 404 && input.value.length > 0 && !t.find(el => el == res.name)) {
        t.push(res.name);
        console.log(t);
        let newArt = document.createElement("article");
        meteo.appendChild(newArt);

        let trash = document.createElement("img");
        newArt.appendChild(trash);
        trash.id = "trash";
        trash.setAttribute("src", "./img/trash.svg");

        trash.addEventListener("click", () => {
            meteo.removeChild(newArt);
        });

        let newP = document.createElement("p");
        newP.textContent = res.name;
        newArt.appendChild(newP);

        let newSup = document.createElement("sup");
        newSup.innerText = res.sys.country;
        newSup.id = "sup1";
        newP.appendChild(newSup);

        let Sup2 = document.createElement("sup");
        let temp = document.createElement("div");
        let p2 = document.createElement("p");
        newArt.appendChild(temp);
        temp.appendChild(p2);
        p2.innerText = res.wind.deg / 10;
        p2.appendChild(Sup2);
        p2.id = "p2";
        Sup2.innerText = "°C";

        let img = document.createElement("img");
        newArt.appendChild(img);
        img.setAttribute("src", `https://openweathermap.org/img/w/${res.weather[0].icon}.png`);

        let p3 = document.createElement("p");
        newArt.appendChild(p3);
        p3.textContent = res.weather[0].description;
        
        erreur.textContent = "";
    } else if (res.cod == 404 || input.value.length <= 0) {
        erreur.textContent = "Please search for a valid city 😫";
    } else if (t.find(el => el == res.name)) {
        erreur.textContent = "Please search for a uniq city 😫";
    }

        input.value = "";
});