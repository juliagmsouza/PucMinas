function main() {
   const form = document.getElementById('catForms');
   form.addEventListener('click', () => {
      const textarea = document.getElementById('comment-cats');
      const p = document.getElementById('comments');
      const date = new Date();
      p.style.display = 'block';
      p.innerHTML = '<strong>BikeVibe: </strong>' + textarea.value + `<small class="float-right">${date.toLocaleString()}</small>`
      textarea.value = '';
   });
   const btn1 = document.getElementById('followBtn1');
   btn1.addEventListener('click', () => {
      btn1.textContent = btn1.textContent === 'Seguir' ? 'Deixar de seguir' : 'Seguir';
   });
   const btn2 = document.getElementById('followBtn2');
   btn2.addEventListener('click', () => {
      btn2.textContent = btn2.textContent === 'Seguir' ? 'Deixar de seguir' : 'Seguir';
   });
   const btn3 = document.getElementById('followBtn3');
   btn3.addEventListener('click', () => {
      btn3.textContent = btn3.textContent === 'Seguir' ? 'Deixar de seguir' : 'Seguir';
      btn3.classList.add('btn-primary')
   });
};

main();