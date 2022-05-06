/* Grab DOM elements and store as variables */
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")

/* All saved leads */
let myLeads = []

/* Leads from local storage */
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

/* Save lead */
const saveLead = () =>
{
    myLeads.push(inputEl.value)
    inputEl.value = ""
    
    /* Save the myLeads array to localStorage */
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    renderLeads()
}

/* Events listeners to save lead */
inputEl.addEventListener("keydown", (e) => {if(e.key === "Enter"){saveLead()}})
inputBtn.addEventListener("click", saveLead)

/* Render leads, triggered by saveLead function */
const renderLeads = () =>
{
    /* All HTML for list items */
    let listItems = ""

    /* Add each item in myLeads as a HTML list item */
    for (let i = 0; i < myLeads.length; i++)
    {
        listItems += `
            <li>
                <a target="_blank" href="${myLeads[i]}">
                    ${myLeads[i]}
                </a>
            </li>`
    }
    /* Render listItems inside ul */
    ulEl.innerHTML = listItems
}

/* Render leads from local storage if any */
if (leadsFromLocalStorage > 0)
{
    renderLeads()
}
