document.getElementById('save').addEventListener('click', ev => {
  const tempo = document.getElementById('tempo').value;
  const release = document.getElementById('release').value;
  chrome.storage.sync.set({ tempo, release }, ()=>{

    chrome.runtime.sendMessage({ message: "SETTINGS_CHANGE" })

    const status = document.getElementById("status")
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  })
});
