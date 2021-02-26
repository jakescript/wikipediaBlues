if(location.origin === "https://en.wikipedia.org"){
    chrome.runtime.sendMessage({ message: "loading" })
    const text = document.querySelectorAll("p")
    let content = Array.from(text)
    if(content.length > 50){
        content = content.slice(0,50)
    }

    content = content.reduce((acc, currentVal) => {
        if(currentVal.innerText){
            let temp = currentVal.innerText.replace(/[^\w\s]/gi, '')
            acc.push(temp.replace(/[0-9]/g, ''))
        }
        return acc
    }, [])

    content = content.join(". ")
    chrome.runtime.sendMessage({ content })
}

