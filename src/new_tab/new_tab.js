//#region CLASSES
class Item
{
	/** @param {string} name @param {string} url */
	constructor(name, url)
	{
		this.name = name;
		this.url = url;
	}
}

//#region ELEMENTS
document.getElementById("btn-options").onclick = () => chrome.runtime.openOptionsPage();

const container = document.getElementById("shortcut-container");

const overlay = document.getElementById("fixed-black");
overlay.onclick = () => overlay.hidden = !overlay.hidden;
document.getElementById("btn-black").onclick = overlay.onclick;

//#region CREATE ELEMENTS

/** @type { { size: string, items: Item[] } } */
const storage = await GetStorageData();

storage.items.forEach(item => container.appendChild(generateShortcut(item.name, item.url)));

//#region FUNCS

async function GetStorageData() {
	const result = await chrome.storage.local.get(["size", "items"]);
	// console.log(result);
	return result || {};
}

/** @param {string} name @param {string} url @returns {HTMLElement} */
function generateShortcut(name, url)
{
	const a = document.createElement("a");
	if(url && url !== "")
		a.href = url;

	if(url){
		const divImg = document.createElement("div");
		divImg.className = "div-icon";
		a.appendChild(divImg);

		const img = document.createElement("img");
		img.alt = name;
		img.src = getFaviconUrl(url);
		divImg.appendChild(img);
	}
	
	if(name && name !== ""){
		const elText = document.createElement("p");
		elText.innerHTML = name;
		a.appendChild(elText);
	}

	return a;
}

/** @param {String} url @returns {String} */
function getFaviconUrl(url)
{	
	if(!url || url.length === 0)
		return "";

	let faviconUrl;
	const faviconSize = storage.size || 32;

	if(chrome.runtime){
		faviconUrl = new URL(`chrome-extension://${chrome.runtime.id}/_favicon/`);
		faviconUrl.searchParams.append('pageUrl', url);
		faviconUrl.searchParams.append('size', faviconSize);
	}
	else{
		// faviconUrl = new URL(`https://www.google.com/s2/favicons?sz=${faviconSize}&domain_url=${url}`);
		faviconUrl = new URL("https://www.google.com/s2/favicons");
		faviconUrl.searchParams.append('domain_url', url);
		faviconUrl.searchParams.append('sz', faviconSize);
	}

	return faviconUrl.href;
}