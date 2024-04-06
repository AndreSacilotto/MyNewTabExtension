class Item {
	/** @param {string} name @param {string} url */
	constructor(name, url) {
		this.name = name;
		this.url = url;
	}
}

//#region VARS

const container = document.getElementById("options");
const saveBtn = document.getElementById("btn-save");
const alertBtn = document.getElementById("btn-alert");
const defaultBtn = document.getElementById("btn-default");
/** @type {HTMLInputElement} */
const imageSizeInput = document.getElementById("img-size");

function createItemInput(label = "", name = "", url = "") {

	const div = document.createElement("div");
	div.className = "input-element";

	const labelEl = document.createElement("label");
	labelEl.innerHTML = label;
	div.appendChild(labelEl);

	const inputName = document.createElement("input");
	inputName.type = "text";
	inputName.placeholder = "Shorcut Name...";
	inputName.value = name;
	div.appendChild(inputName);
	
	const inputUrl = document.createElement("input");
	inputUrl.type = "text";
	inputUrl.placeholder = "Shorcut Url..."
	inputUrl.value = url;
	div.appendChild(inputUrl);

	return { div, label: labelEl, inputName, inputUrl };
}

const itemsStorageKey = "items";
const sizeStorageKey = "size";

/** @type {Item[]} */
const defaultList = [
	new Item("Youtube", "https://www.youtube.com/"),
	new Item("Translate", "https://translate.google.com.br/?sl=pt&tl=en&op=translate"),
	new Item("", ""),
	new Item("Regex", "https://regex101.com/"),
	new Item("Desmos", "https://www.desmos.com/calculator"),

	new Item("Drive", "https://drive.google.com/drive/my-drive"),
	new Item("", ""),
	new Item("", ""),
	new Item("R3", "https://www.4devs.com.br/calculadora_regra_tres_simples"),
	new Item("Symbolab", "https://www.symbolab.com/"),

	new Item("", ""),
	new Item("", ""),
	new Item("ZapZap", "https://web.whatsapp.com/"),
	new Item("My Git", "https://github.com/AndreSacilotto?tab=repositories"),
	new Item("Source", "https://github.com/Eloston/ungoogled-chromium"),
]

//#region MAIN

//Create the elements

const inputElements = defaultList.map((x, index) => {
	const item = new Item(x.name, x.url);
	const itemInput = createItemInput(Math.floor(index / 5) + "\t" + index % 5, item.name, item.url)
	container.appendChild(itemInput.div);
	return { item, input: itemInput }
});

(async function LoadFromStorage() {
	
	const result = await chrome.storage.local.get([itemsStorageKey, sizeStorageKey]);
	if(!result)
	 	return;

		console.log(result);
	/** @type {Item[]} */
	const storageList = result[itemsStorageKey];
	if(result && storageList && storageList.length > 0)
	{
		for (let i = 0; i < inputElements.length && i < storageList.length; i++) {
			const a = inputElements[i];
			a.item = storageList[i];
			a.input.inputName.value = a.item.name || "";
			a.input.inputUrl.value = a.item.url || "";
		}
	}

	const storageSize = result[sizeStorageKey];
	if(result && storageSize)
		imageSizeInput.value = storageSize;
})();

inputElements.forEach(x => {
	x.input.inputName.onchange = () => x.item.name = x.input.inputName.value || "";
	x.input.inputUrl.onchange = () => x.item.url = x.input.inputUrl.value || "";
})

//#region EVENTS

function createStorageObj() {
	const obj = {};
	obj[sizeStorageKey] = imageSizeInput.value;
	obj[itemsStorageKey] = inputElements.map(x => x.item);
	return obj;
}

saveBtn.onclick = async () => {
	const obj = createStorageObj();
	await chrome.storage.local.set(obj);
	console.log("Value is set");
}

defaultBtn.onclick = () =>{
	for (let i = 0; i < inputElements.length; i++) {
		const el = inputElements[i];
		el.item = new Item(defaultList[i].name, defaultList[i].url);
		el.input.inputName.value = defaultList[i].name;
		el.input.inputUrl.value = defaultList[i].url;
	}
	console.log("Set to default");
	console.log(inputElements);
}

alertBtn.onclick = () =>{
	const obj = createStorageObj();
	const str = JSON.stringify(obj);
	console.log(str);
	alert(str);
}
