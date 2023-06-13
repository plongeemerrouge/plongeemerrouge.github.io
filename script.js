window.addEventListener("DOMContentLoaded", (event) => {
	onDOMLoaded()
  });

async function onDOMLoaded()
{
	await includeHTML()
	window.scrollTo(0, 0);
    LoadGalleries();
}

async function includeHTML() 
{
  /* Loop through a collection of all HTML elements: */
  let elements = document.getElementsByTagName("*");
  let promises = new Array();
  for (let element of elements) 
  {
	/*search for elements with a certain atrribute:*/
	let file = element.getAttribute("html-file");
	
	if (!file) continue;
	promises.push(replaceWithFile(element,file));
  }

  await Promise.all(promises)
}

async function replaceWithFile(element, file)
{
	element.innerHTML = await fetch(file).then(response => 
		{
			if (response.ok)
			{
				return response.text(); 
			}
			return "Page not Found";
		});
	element.removeAttribute("html-file");
}

/* --- TAB --- */

function  selectTab(object, n)
{
    var tabHeader = object.parentElement
    var tabContent = tabHeader.parentElement.getElementsByClassName("tab-content")[0];
    
    for (header of tabHeader.children)
    {
        header.className = header.className.replace(" active", "");
    }

    for (item of tabContent.children)
    {
        item.style.display = "none";
    }

    tabHeader.children[n].className += " active";
    tabContent.children[n].style.display = "block";
}

/* --- DIAPORAMA IMAGES --- */

function LoadGalleries()
{
    let galleries = document.getElementsByClassName("gallery");
    for (gallery of galleries)
    {
        LoadGallery(gallery);
    }
}

function LoadGallery(gallery)
{
    var slideIndex = parseInt(gallery.getAttribute("index"));
    showSlide(slideIndex, gallery);
}

function previousSlide(button) 
{
    var gallery = button.parentElement
    var slideIndex = parseInt(gallery.getAttribute("index"));
	slideIndex = showSlide(slideIndex-1, gallery);
    gallery.setAttribute("index", slideIndex);
}

function nextSlide(button) 
{
    var gallery = button.parentElement
    var slideIndex = parseInt(gallery.getAttribute("index"));
	slideIndex = showSlide(slideIndex+1, gallery);
    gallery.setAttribute("index", slideIndex);
}

function showSlide(n, gallery) 
{
    var slides = gallery.getElementsByClassName("slides")[0];
    
    for (slide of slides.children)
    {
        slide.style.display = "none";
    }

    if (n >= slides.children.length) {n = 0}
    if (n < 0) {n = slides.children.length - 1}

    slides.children[n].style.display = "block";

    var dots = gallery.getElementsByClassName("dots")[0].children;

	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	dots[n].className += " active";
    return n;
}
		