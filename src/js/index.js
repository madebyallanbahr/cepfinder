let cep = document.getElementById("cep");
let mode = { cep: true, address: false };
let apiURL = "https://viacep.com.br/ws/";
let schemaCEP = {
  cep: "",
  bairro: "",
  complement: "",
  uf: "",
  local: "",
  logradouro: "",
};
let selectorInfo = document.getElementById("info-get");
let divInfo = document.getElementById("details");

const searchFn = async () => {
  if (cep.value.length == 8 && mode.cep) {
    apiURL = apiURL.concat(cep.value, "/json");
    console.log(apiURL);
    try {
      const response = await fetch(apiURL);
      const info = await response.json();
      if (info.erro) throw "CEP Inválido!";
      schemaCEP.cep = info.cep;
      schemaCEP.bairro = info.bairro;
      schemaCEP.complement = info.complemento;
      schemaCEP.local = info.localidade;
      schemaCEP.logradouro = info.logradouro;
      schemaCEP.uf = info.uf;
      updateFn();
    } catch (err) {
      console.warn(err);
    }
  }
  apiURL = "https://viacep.com.br/ws/";
};

const switchFn = () => {
  let modeCEP = mode.cep ? (mode.cep = false) : (mode.cep = true);
  let modeAddress = mode.address
    ? (mode.address = false)
    : (mode.address = true);
  mode.address = modeAddress;
  mode.cep = modeCEP;
};

const clearFn = () => {
  cep.value = "";
};

// const updateFn = () => {
//   setTimeout(() => {
//     divInfo.classList.toggle("active");
//   }, 1000);
//   setTimeout(() => {
//     divInfo.classList.toggle("active");
//   }, 5000);
// };
