let cep = document.getElementById("cep");

// Info for Notifications
let infoElement = document.getElementById("info-el");
let infoImageElement = document.getElementById("info-img");
let infoParagraphElement = document.getElementById("info-p");

// Fields for Response
let infoField = document.querySelector(".info-fields");
let addressField = document.getElementById("address-field");
let districtField = document.getElementById("district-field");
let ufField = document.getElementById("uf-field");
let cityField = document.getElementById("city-field");
let complementField = document.getElementById("complement-field");

const typesWarns = {
  error: "../../res/error.svg",
  done: "../../res/check.svg",
  warn: "../../res/warn.svg",
};

let mode = { cep: true, address: false };

let apiURL = "https://viacep.com.br/ws/";

let schemaCEP = {
  cep: "",
  district: "",
  complement: "",
  uf: "",
  city: "",
  address: "",
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
      schemaCEP.district = info.bairro;
      schemaCEP.complement = info.complemento;
      schemaCEP.city = info.localidade;
      schemaCEP.address = info.logradouro;
      schemaCEP.uf = info.uf;
      updateFn("done", "CEP Encontrado!");
      showFn();
    } catch (err) {
      updateFn("error", err);
    }
  } else {
    updateFn("warn", "Nenhum cep informado!");
  }
  apiURL = "https://viacep.com.br/ws/";
};

const showFn = async () => {
  await infoField.classList.toggle("active");
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
  if (cep.value == "") return updateFn("error", "Campo se encontra vazio!");
  updateFn("warn", "Campo limpo com sucesso!");
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
    }, 2000);
  }, 1000);
};
