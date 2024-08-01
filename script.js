document.addEventListener("DOMContentLoaded", () => {
    fetch("messages.json")
      .then((response) => response.json())
      .then((messages) => {
        const descElement = document.getElementById("desc");
        const typingSpeed = 20;
        let previousMessage = localStorage.getItem("previousMessage") || "";
  
        function typeMessage(html) {
          let textIndex = 0;
          descElement.innerHTML = "";
  
          function type() {
            if (textIndex < html.length) {
              const currentChar = html[textIndex];
              descElement.innerHTML += currentChar;
              textIndex++;
              setTimeout(type, typingSpeed);
            }
          }
  
          type();
        }
  
        function getRandomMessage(exclude) {
          const availableMessages = messages.random_messages.filter(
            (msg) => msg !== exclude
          );
          return availableMessages[
            Math.floor(Math.random() * availableMessages.length)
          ];
        }
  
        function changeMessage() {
          let newMessage = getRandomMessage(previousMessage);
          localStorage.setItem("previousMessage", newMessage);
          previousMessage = newMessage;
          typeMessage(newMessage);
        }
  
        changeMessage();
      })
      .catch((error) => {
        console.error("Some error happened, it's objectively your fault.");
      });
  });
  