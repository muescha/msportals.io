console.log("We live from import")

const personalLinksKey = "personalLinks";

function addLinkToLocalStorage(newLink) {

    console.log(newLink);
    let personalLinks = readLocalStorageToArray(personalLinksKey)
    if (personalLinks === null) {
        personalLinks = [newLink]
    } else {
        personalLinks.push(newLink)
    }

    writeArrayToLocalStorage(personalLinksKey,personalLinks)

}

function removeLinkFromLocalStorage(link) {
    console.log(link)
    currentLinks = readLocalStorageToArray(personalLinksKey)
    newLinks = currentLinks.filter(portal => {return portal.primaryURL != link})
    writeArrayToLocalStorage(personalLinksKey,newLinks)

}

function readLocalStorageToArray(key) {
    localStorageArray = JSON.parse(localStorage.getItem(key));
    return localStorageArray
}

function writeArrayToLocalStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}

function generatePersonalLinksHTML() {

    let personalLinks = readLocalStorageToArray(personalLinksKey)
    let groups = new Set(personalLinks.map(i => i.groupName))

    groups.forEach(group => {
        let groupPortals = personalLinks.filter(portal => portal.groupName === group)
        console.log(groupPortals)

        let portalGroup = document.createElement("div")
        portalGroup.classList = "portal-group"
        document.getElementsByClassName("entry")[0].appendChild(portalGroup)

        let heading = document.createElement("h2")
        heading.innerText = groupPortals[0].groupName
        portalGroup.appendChild(heading)

        groupPortals.forEach(portal => {

            portalRow = document.createElement("div")
            portalRow.classList = "portal"

            portalRowName = document.createElement("span")
            portalRowName.classList = "portal-name"

            portalRemove = document.createElement("span")
            portalRemove.classList = "portal-remove"
            portalRemove.dataset.href = portal.primaryURL
            portalRemove.innerText = "➖ "

            portalRowName.appendChild(portalRemove)
            portalRowName.innerHTML += portal.portalName

            portalRow.appendChild(portalRowName)
            portalGroup.appendChild(portalRow)

            if (portal.note) {
                console.log(portal.note)
                portalNote = document.createElement("span")
                portalNote.classList = "portal-note"
                portalNote.innerHTML = "&ensp;" + portal.note
                portalRowName.appendChild(portalNote)
            }

            portalDetails = document.createElement("div")
            portalDetails.classList = "portal-details"

            portalURLSpan = document.createElement("span")
            portalURLSpan.classList = "portal-url"

            portalURL = document.createElement("a")
            portalURL.href = portal.primaryURL
            portalURL.target = "_blank"
            portalURL.innerText = portal.primaryURL

            portalURLSpan.appendChild(portalURL)
            portalDetails.appendChild(portalURLSpan)

            if (portal.secondaryURLs) {
                portalSecondaryURLs = document.createElement("span")
                portalSecondaryURLs.classList = "portal-secondary-urls"
                portalSecondaryURLs.innerHTML = "&ensp;• "

                portal.secondaryURLs.forEach(url => {
                    secondaryURL = document.createElement("a")
                    secondaryURL.href = url.url
                    secondaryURL.target = "_blank"
                    secondaryURL.innerText = url.icon
                    portalSecondaryURLs.appendChild(secondaryURL)
                })

                portalDetails.appendChild(portalSecondaryURLs)
            }

            portalRow.appendChild(portalDetails)

        })

    })

    Array.from(document.getElementsByClassName("portal-remove")).forEach((e) =>
    e.addEventListener("click", (event) => {        
        let removePortalURL = event.target.dataset.href
        removeLinkFromLocalStorage(removePortalURL)
        removePersonalLinksHTML()
        generatePersonalLinksHTML()

    })
  );


}

function removePersonalLinksHTML() {
    document.getElementsByClassName("entry")[0].innerHTML = ""
}

/*
let test = {
    "portalName" : "",
    "primaryURL" : "https://partner.microsoft.com/dashboard/"
}


let testStr = '{"portalName":"Microsoft Call Quality Dashboard","primaryURL":"https://partner.microsoft.com/dashboard/"}'
let test2Str = '{"portalName":"Stream Admin Center","primaryURL":"https://test.com/"}'

let arr = [testStr,testStr]

*/