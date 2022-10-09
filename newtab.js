
class Item
{
	/** @param {string} name @param {string} url */
	constructor(name, url)
	{
		this.name = name;
		this.url = url;
	}
}

const list = [
	new Item("Google", "https://www.google.com/"),
	new Item("Youtube", "https://www.youtube.com/"),
	new Item("Translate", "https://translate.google.com.br/?sl=pt&tl=en&op=translate"),
	new Item("Desmos", "https://www.desmos.com/calculator"),
	new Item("Symbolab", "https://www.symbolab.com/"),
	new Item("Sauce", "https://saucenao.com/"),
	new Item("My Git", "https://github.com/AndreSacilotto?tab=repositories"),
	new Item("ZapZap", "https://web.whatsapp.com/"),
	new Item("Drive", "https://drive.google.com/drive/my-drive"),
	new Item("", ""),
	new Item("", ""),
	new Item("", ""),
	new Item("", ""),
	new Item("Extensions", "https://chrome.google.com/webstore/category/extensions"),
	new Item("Source", "https://github.com/Eloston/ungoogled-chromium"),
]

for (let i = 0; i < list.length; i++)
{
	let shortcut = generateShortcut(list[i]);
	document.body.appendChild(shortcut);
}

/** @param {Item} item @returns {HTMLElement} */
function generateShortcut(item)
{
	const a = document.createElement("a");
	a.href = item.url;

	const divImg = document.createElement("div");
	divImg.className = "div-icon";

	const img = document.createElement("img");
	img.alt = item.name;
	img.src = getFaviconUrl2(item.url);

	const divText = document.createElement("div");
	divText.className = "div-text";
	divText.innerHTML = item.name;

	divImg.appendChild(img);
	a.appendChild(divImg);
	a.appendChild(divText);

	return a;
}

var fixed = document.getElementById("fixed-black");
document.getElementById("button-black").onclick = switchBlack;
fixed.onclick = switchBlack;

function switchBlack()
{
	fixed.hidden = !fixed.hidden;
}

/* OLD - Manifest v3.0 workround 
function getFaviconUrl(url)
{
	if(!url || url.length === 0)
		return "";
	const favicon2 = "https://www.google.com/s2/favicons?sz=128&domain_url="
	return encodeURI(favicon2 + url);
}
*/

/** @param {String} url */
function getFaviconUrl2(url)
{	
	if(!url || url.length === 0)
		return "";
	// return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
	let faviconUrl = new URL(`chrome-extension://${chrome.runtime.id}/_favicon/`);
	faviconUrl.searchParams.append('pageUrl', url);
	faviconUrl.searchParams.append('size', '32');
	return faviconUrl.href;
}