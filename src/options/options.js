//#region CLASSES
class Item {
	/** @param {string} name @param {string} url */
	constructor(name, url) {
		this.name = name;
		this.url = url;
	}
}

//#region ELEMENTS

const container = document.getElementById("options");
const saveBtn = document.getElementById("btn-save");
const importBtn = document.getElementById("btn-import");
const exportBtn = document.getElementById("btn-export");

/** @type {HTMLInputElement} */
const imageSizeInput = document.getElementById("img-size");

//#region VARS

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
	new Item("R3", "https://andresacilotto.github.io/R3/r3.html"),
	new Item("Symbolab", "https://www.symbolab.com/"),

	new Item("", ""),
	new Item("", ""),
	new Item("ZapZap", "https://web.whatsapp.com/"),
	new Item("My Git", "https://github.com/AndreSacilotto?tab=repositories"),
	new Item("Source", "https://github.com/Eloston/ungoogled-chromium"),
]

//#region CREATE ELEMENTS

const inputElements = defaultList.map((x, index) => {
	const label = Math.floor(index / 5) + "\t" + index % 5; // always 5 columns 
	const itemInput = createItemInput(label, x.name, x.url)
	container.appendChild(itemInput.div);
	return itemInput;
});

LoadFromData(await GetStorageData());

//#region FUNCS

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


async function GetStorageData() {
	const result = await chrome.storage.local.get(["size", "items"]);
	if (!result)
		return null;
	return result;
}

/** @param { { size: string, items: Item[] } } storage  */
function LoadFromData(storage) {
	if(!storage)
		return;

	console.log(storage);

	if (storage.size)
		imageSizeInput.value = storage.size;
	
	/** @type {Item[]} */
	if (storage.items && storage.items.length > 0)
	{
		for (let i = 0; i < inputElements.length && i < storage.items.length; i++)
		{
			const a = inputElements[i];
			a.item = storage.items[i];
			a.inputName.value = a.item.name || "";
			a.inputUrl.value = a.item.url || "";
		}
	}
}

function createStorageObj() {
	return {
		size: imageSizeInput.value,
		items: inputElements.map(x => new Item(x.inputName.value, x.inputUrl.value))
	};
}

//#region EVENTS

saveBtn.onclick = () => {
	const obj = createStorageObj();
	chrome.storage.local.set(obj).then(() => { console.log("Value is set") })
}

// defaultBtn.onclick = () =>{
// 	for (let i = 0; i < inputElements.length; i++) {
// 		const el = inputElements[i];
// 		el.item = new Item(defaultList[i].name, defaultList[i].url);
// 		el.input.inputName.value = defaultList[i].name;
// 		el.input.inputUrl.value = defaultList[i].url;
// 	}
// 	console.log("Set to default", inputElements);
// }

importBtn.onclick = () => {
	const result = prompt("JSON Object:");

	/** @type {JSON | string} */
	let json;
	try { json = JSON.parse(result) }
	catch { json = ""; }

	if (json != "")
		chrome.storage.local.set(json).then(() => {
			console.log("Succefully imported Json");
			LoadFromData(json);
		});
	else
		alert("Invalid Json");
}

exportBtn.onclick = () => {
	const obj = createStorageObj();
	const str = JSON.stringify(obj);
	console.log(str);
	alert(str);
}
