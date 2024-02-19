let cep = document.getElementById("cep");

let infoElement = document.getElementById("info-el");
let infoImageElement = document.getElementById("info-img");
let infoParagraphElement = document.getElementById("info-p");

const typesWarns = {
  error: "../../res/error.svg",
  done: "../../res/check.svg",
  warn: "../../res/warn.svg",
};

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
      updateFn("done", "CEP Encontrado!");
    } catch (err) {
      updateFn("error", err);
    }
  } else {
    updateFn("warn", "Nenhum cep informado!");
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
  if (mode.cep) updateFn("warn", `Modo alterado para CEP`);
  if (mode.address) updateFn("warn", `Modo alterado para Endereço`);
};

const clearFn = () => {
  cep.value = "";
};

const updateFn = (type, msg) => {
  setTimeout(() => {
    infoImageElement.src = typesWarns[type];
    infoParagraphElement.textContent = msg;
    infoElement.classList.toggle("active");
    setTimeout(() => {
      infoElement.classList.toggle("active");
      infoImageElement.src = "";
      infoParagraphElement.textContent = "";
    }, 3000);
  }, 1000);
};
