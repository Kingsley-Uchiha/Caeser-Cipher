
const form = document.querySelector('form');

const copy = document.querySelector('button.copy');

copy.addEventListener('click', async e => {
      const content = document.querySelector('.output p').textContent;
      await navigator.clipboard.writeText(content);

      copy.textContent = "Copied";
      const copied = await navigator.clipboard.readText();
      console.log(copied);

      setTimeout(() => {
            copy.textContent = "Copy";
      }, 1000);
})

form.addEventListener('submit', async e => {
      e.preventDefault();

      const text = form.text.value;
      const codeType = form.code.value;
      const shiftNumber = form.shiftNumber.value;
      const alphas = await getAlphas();

      console.log(text);
      console.log(codeType);
      console.log(shiftNumber);

      const output = code(text, codeType, shiftNumber, await alphas);
      // showOutput(output);
      const outputCont = document.querySelector('.output p');

      outputCont.innerHTML = ``
      for (let i = 0; i < output.length; i++) {
            setTimeout(() => {
                  outputCont.textContent += output[i]
            }, 1000);
      }
});

const showOutput = (output) => {
      const outputCont = document.querySelector('.output p');

      outputCont.innerHTML = ``
      for (let i = 0; i < output.length; i++) {
            setTimeout(() => {
                  outputCont.textContent += output[i]
            }, 1000);
      }
}

const code = (text, type, shift, alphas) => {
      if (shift >= 26) {
            return;
      }

      if (!shift) shift = 1;
      const textArr = text.toLowerCase().split('');
      console.log(textArr);

      if (type === 'Encode') shift = Number(shift);
      else if (type === 'Decode') shift = Number(-shift);

      console.log(shift);

      for (let i = 0; i < textArr.length; i++) {

            for (let j = 0; j < alphas.length; j++) {
                  if (textArr[i] === alphas[j]) {
                        
                        if ((j + 1 + shift) > alphas.length) {
                              textArr[i] = alphas[(j + shift) - alphas.length];
                        } else if ((j + shift) < 0) {
                              textArr[i] = alphas[alphas.length + (j + shift)];
                        } else {
                              textArr[i] = alphas[j + shift];
                        }

                        break;
                  }
            }

      }

      const result = textArr.join('');
      console.log(result);
      return result;
}

const getAlphas = async () => {
      const data = await fetch('./alpha.json');
      const alphas = await data.json();
      return alphas;
}