import { api, postForm } from "../../../service/api";

async function getRandomJoke() {
   const request = await api.get("random");
   const response = request.data;
   return response;
}

let Home = {
   is_private: false,

   render: async () => {
      const joke = await getRandomJoke();

      let view = /*html*/ `
      <div class="app-container">
        <div class="chuck-jokes">
            <h1>Chuck Norris Jokes</h1>
            <p id="joke-display">${joke.value}</p>
            <button id="update-button">Update Joke</button>
        </div>
        <hr />
        <div class="form-container">
            <h3>Simple Form</h3>
            <form>
                <input type="text" id="name" placeholder="Name *" required />
                <input type="text" id="email" placeholder="Email *" required />
                <input type="number" step="none" id="phone" placeholder="Phone *" required/>
                <button type="submit" id="submit">Submit</button>
            </form>
            <div class="info"></div>
        </div>
    </div>
    <footer>
      <h3>Arthur Polon</h3>
      <div class="links">
        <a href="https://github.com/arthurpolon" target="__blank">Github</a>
        <a href="https://www.linkedin.com/in/arthur-polon-55a3b420a/" target="__blank">LinkedIn</a>
      </div>
    </footer>
    `;

      return view;
   },

   after_render: async () => {
      const inputForm = document.querySelector("form");
      const formName = document.querySelector("#name");
      const formEmail = document.querySelector("#email");
      const formPhone = document.querySelector("#phone");
      const updateButton = document.querySelector("#update-button");
      const jokeDisplay = document.querySelector("#joke-display");
      const infoDisplay = document.querySelector(".info");

      inputForm.addEventListener("submit", (e) => {
         e.preventDefault();
         let name = formName.value.trim();
         let email = formEmail.value.trim();
         let phone = formPhone.value.trim();

         let data = {
            name,
            email,
            phone,
         };

         postForm
            .post("", data)
            .then(() => {
               infoDisplay.textContent = "Submitted Successfully.";
               setTimeout(() => {
                  infoDisplay.textContent = "";
               }, 3000);
               e.target.reset()
            })
            .catch((e) => {
               infoDisplay.textContent =
                  "Something went wrong. Check console for further informations.";
               console.log(e);
               setTimeout(() => {
                  infoDisplay.textContent = "";
               }, 5000);
            });
      });

      updateButton.addEventListener("click", async () => {
         const joke = await getRandomJoke();

         jokeDisplay.textContent = joke.value;
      });
   },
};

export default Home;
