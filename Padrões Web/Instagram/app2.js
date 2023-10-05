function main() {
   const form = document.getElementById('catForms');
   console.log('form', form)
   form.addEventListener('submit', () => {
      console.log('adanona')
    const textarea = document.getElementById('comment-cats');
    const p = document.getElementById('comments');
    p.style.display = 'block';
    p.textContent = textarea.value;
   });
};

main();