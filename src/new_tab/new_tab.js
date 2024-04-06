
class Item
{
	/** @param {string} name @param {string} url */
	constructor(name, url)
	{
		this.name = name;
		this.url = url;
	}
}

// DATA

const list = [
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
	
	new Item("Sauce", "https://saucenao.com/"),
	new Item("", ""),
	new Item("ZapZap", "https://web.whatsapp.com/"),
	new Item("My Git", "https://github.com/AndreSacilotto?tab=repositories"),
	new Item("Source", "https://github.com/Eloston/ungoogled-chromium"),
]

// FUNCTIONS
document.getElementById("btn-options").onclick = () => chrome.runtime.openOptionsPage();

const container = document.getElementById("shortcut-container");

list.forEach(item => container.appendChild(generateShortcut(item)));

/** @param {Item} item @returns {HTMLElement} */
function generateShortcut(item)
{
	const a = document.createElement("a");
	if(item.url && item.url !== "")
		a.href = item.url;

	if(item.url){
		const divImg = document.createElement("div");
		divImg.className = "div-icon";
		a.appendChild(divImg);

		const img = document.createElement("img");
		img.alt = item.name;
		img.src = getFaviconUrl(item.url);
		divImg.appendChild(img);
	}
	
	if(item.name && item.name !== ""){
		const elText = document.createElement("p");
		elText.innerHTML = item.name;
		a.appendChild(elText);
	}

	return a;
}

var fixed = document.getElementById("fixed-black");
document.getElementById("btn-black").onclick = switchBlack;
fixed.onclick = switchBlack;

function switchBlack()
{
	fixed.hidden = !fixed.hidden;
}

/** @param {String} url @returns {String} */
function getFaviconUrl(url)
{	
	if(!url || url.length === 0)
		return "";

	let faviconUrl;
	const faviconSize = 32;

	if(chrome.runtime){
		faviconUrl = new URL(`chrome-extension://${chrome.runtime.id}/_favicon/`);
		faviconUrl.searchParams.append('pageUrl', url);
		faviconUrl.searchParams.append('size', 32);
	}
	else{
		faviconUrl = new URL(`https://www.google.com/s2/favicons?sz=${size}&domain_url=${url}`);
		// faviconUrl.searchParams.append('sz', size);
		// faviconUrl.searchParams.append('domain_url', url);
	}

	return faviconUrl.href;
}