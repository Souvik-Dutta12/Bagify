document.addEventListener("DOMContentLoaded", function () {
    const plusButton = document.querySelectorAll(".cirplus")[0];
    const minusButton = document.querySelectorAll(".cirplus")[1];
    const countBox = document.querySelector(".box");
    const limitMessage = document.createElement("div");
    limitMessage.style.display = "none";
    limitMessage.style.position = "absolute";
    limitMessage.style.top = "50%";
    limitMessage.style.left = "50%";
    limitMessage.style.transform = "translate(-50%, -50%)";
    limitMessage.style.background = "rgba(0, 0, 0, 0.8)";
    limitMessage.style.color = "white";
    limitMessage.style.padding = "10px 20px";
    limitMessage.style.borderRadius = "5px";
    document.body.appendChild(limitMessage);

    let count = parseInt(countBox.textContent);

    function updateBackend(value) {
        fetch("/update-count", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ count: value })
        })
        .then(response => response.json())
        .then(data => console.log("Success:", data))
        .catch(error => console.error("Error:", error));
    }

    plusButton.addEventListener("click", function () {
        if (count < 25) {
            count++;
            countBox.textContent = count.toString();
            updateBackend(count);
        } else {
            showLimitMessage("Maximum limit reached (25)");
        }
    });

    minusButton.addEventListener("click", function () {
        if (count > 0) {
            count--;
            countBox.textContent = count.toString();
            updateBackend(count);
        } else {
            showLimitMessage("Minimum limit reached (0)");
        }
    });

    function showLimitMessage(message) {
        limitMessage.textContent = message;
        limitMessage.style.display = "block";
        setTimeout(() => {
            limitMessage.style.display = "none";
        }, 2000);
    }
});