const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const tabBtn = document.querySelector("#tab-btn")
const deleteBtn = document.querySelector("#delete-btn")
const ulEl = document.querySelector("#ul-el")

let myLeads = []

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

const saveLead = () =>
{
    myLeads.push(inputEl.value)
    inputEl.value = ""
    
    /* Save the myLeads array to localStorage */
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)
}
inputEl.addEventListener("keydown", (e) => {if(e.key === "Enter"){saveLead()}})
inputBtn.addEventListener("click", saveLead)

const render = (leads) =>
{
    let listItems = ""

    for (let i = 0; i < leads.length; i++)
    {
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems
}

if (leadsFromLocalStorage)
{
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

const saveCurrentTab = () =>
{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>
    {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
}
tabBtn.addEventListener("click", saveCurrentTab) 

const deleteAllLeads = () =>
{
    localStorage.clear()
    myLeads = []
    render(myLeads)
}
deleteBtn.addEventListener("dblclick", deleteAllLeads)
