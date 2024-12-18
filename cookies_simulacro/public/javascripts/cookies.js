const aceptar = document.getElementById('aceptar');
const rechazar = document.getElementById('rechazar')
const cookies = document.getElementById('cookies');

aceptar.addEventListener('click', () => {
    cookies.style.display = 'none';
    const cookiesAceptadas = true;
    fetch('/login/cookies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cookiesAceptadas })
        });
});