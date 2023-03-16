const button = document.getElementById('mybgm');
const iframe = document.getElementById('myif');
button.addEventListener('click', () => {
  iframe.src = 'https://www.youtube.com/embed/74_yqNBhQbA';
  iframe.contentWindow.postMessage(
    '{"event":"command","func":"playVideo","args":""}',
    '*'
  );
});
