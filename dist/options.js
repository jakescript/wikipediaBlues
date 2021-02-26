document.getElementById('save').addEventListener('click', ev => {
  const tempo = document.getElementById('tempo').value;
  chrome.storage.sync.set({ tempo }, ()=>{

    chrome.runtime.sendMessage({ message: "TEMPO_SET" })

    const status = document.getElementById("status")
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  })
});
