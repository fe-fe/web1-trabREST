const msgbox = document.querySelector(".msgs");

const select = document.getElementById("select");

const modal = document.querySelector(".modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalFav = document.getElementById("modalFav");
const modalCancel = document.getElementById("modalCancel");
const modalSave = document.getElementById("modalSave");
const modalDelete = document.getElementById("modalDelete");
var fav = false;
var id = 0;

const newMsgTitle = document.getElementById("newMsgTitle");
const newMsgText = document.getElementById("newMsgText");
const criarForm = document.getElementById("criarForm");


async function getTitles(modo){
    msgbox.innerHTML = "";

    let link = "http://localhost:3000/msgs"
    if (modo == "favoritas") {
        link += "/fav"
    }

    let response = await fetch(link, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        var msgs = await response.json();
        msgs.forEach((m) => {
            let msg = document.createElement("button");
            msg.id = m.id
            if (m.fav == 1) {
                msg.innerText = "★"
            }
            msg.innerText += m.titulo

            msg.classList = "basic fade2 f-medium msg pi2"
            msgbox.appendChild(msg);
        })
    }

    var msgLinks = document.querySelectorAll(".msg");

    msgLinks.forEach((mlink) => {
        mlink.addEventListener("click", async () => {
            id = mlink.id;
            let response = await fetch(`http://localhost:3000/msgs/${mlink.id}`,
                {method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
    
            if (response.ok) {
                let selectMsg = await response.json()
                modalTitle.value = selectMsg.titulo
                modalText.value = selectMsg.msg
                if (!selectMsg.fav) {
                    modalFav.classList.add("fa-star-o")
                } else {
                    modalFav.classList.add("fa-star")
                }
                modal.style.display = "flex"



            }
        }) 
    })

}


window.addEventListener("load", () => getTitles(select.value));

criarForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let response = await fetch("http://localhost:3000/msgs", {
        method: "POST",
        body: JSON.stringify({
            titulo: newMsgTitle.value,
            msg: newMsgText.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.ok) {
        let newMsg = await response.json();
        console.log(newMsg);
    }

    newMsgText.value = ""
    newMsgTitle.value = ""

    getTitles(select.value)
    
})


modalCancel.addEventListener("click", () => {
    modal.style.display = "none";
})


modalFav.addEventListener("click", () => {
    if (fav) {
        modalFav.classList.remove("fa-star");
        modalFav.classList.add("fa-star-o")
    } else {
        modalFav.classList.remove("fa-star-o")
        modalFav.classList.add("fa-star");
    }
    fav = !fav
})

modalSave.addEventListener("click", async () => {
    let savedMsg = await fetch(`http://localhost:3000/msgs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            titulo: modalTitle.value,
            msg: modalText.value,
            fav: fav
        })
    })
    modal.style.display = "none"
    getTitles(select.value);
})

select.addEventListener("change", () => {
    console.log("novo valor " + select.value)
    getTitles(select.value);
})

modalDelete.addEventListener("click", async () => {
    const response = await fetch(`http://localhost:3000/msgs/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application-json"}      
    })

    modal.style.display = "none";

    if (response.ok) {
        getTitles(select.value);
    }
})