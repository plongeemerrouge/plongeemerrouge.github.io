window.addEventListener("DOMContentLoaded", (event) => {
	onDOMLoaded()
  });

async function onDOMLoaded()
{
	await includeHTML()
	window.scrollTo(0, 0);
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

/* --- DIAPORAMA IMAGES --- */

function plusSlides(n) 
{
	showSlides(slideIndex += n);
}

function currentSlide(n) 
{
	showSlides(slideIndex = n);
}

function showSlides(n) 
{
	var i;
	var slides = document.getElementsByClassName("custom-slider");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].className += " active";
}
		