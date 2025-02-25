# Frontend Mentor - Galleria slideshow site solution

This is a solution to the [Galleria slideshow site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate the slideshow and view each painting in a lightbox


### Screenshot

![screenshot mobile](https://github.com/Lo-Deck/Galleria-slideshow-site/blob/main/screenshot/Galleria%20slideshow%20site-mobile.png).
![screenshot mobile-inner-page](https://github.com/Lo-Deck/Galleria-slideshow-site/blob/main/screenshot/Galleria%20slideshow%20site-mobile-inner-page.png).
![screenshot tablet](https://github.com/Lo-Deck/Galleria-slideshow-site/blob/main/screenshot/Galleria%20slideshow%20site-tablet.png).
![screenshot tablet-inner-page](https://github.com/Lo-Deck/Galleria-slideshow-site/blob/main/screenshot/Galleria%20slideshow%20site-tablet-inner-page.png).
![screenshot desktop](https://github.com/Lo-Deck/Galleria-slideshow-site/blob/main/screenshot/Galleria%20slideshow%20site-desktop.png).
![screenshot desktop-inner-page](https://github.com/Lo-Deck/Galleria-slideshow-site/blob/main/screenshot/Galleria%20slideshow%20site-desktop-inner-page.png).


### Links


- Solution URL: [Repositories](https://github.com/Lo-Deck/Galleria-slideshow-site).
- Live Site URL: [Website](https://lo-deck.github.io/Galleria-slideshow-site/).


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow



### What I learned

First thing was to make a responsiveness masonry layout in pure HTML, CSS :

```css

.list-image{
   display: grid;
   grid-template-columns: repeat(auto-fill, 324px);
   grid-template-rows: none;
   justify-items: center;
   margin: 0 auto 5rem;
   justify-content: center;
   column-gap: 0.9375rem;
}

.item1 {grid-row: span 25;}
.item2 {grid-row: span 39;}
.item3 {grid-row: span 28;}
...
.item13 {grid-row: span 30;}
.item14 {grid-row: span 45;}
.item15 {grid-row: span 26;}

```

The JS was not that simple too, to make a slideshow and to manage with the next and previous button to have this set working together with any of them who interfer each other. It was worse with the animation. So I set a bunch of `setTimeout` to manage the whole.


```js

setAnim();

setTimeout(() => {

   if(index > 0){
      index--;                    
   }

   setInnerPage(array[index]);
   setBorderSlideWidth(index);
   document.querySelector('.container-image .paint').classList.add('anim-scale-reverse');
   document.querySelector('.text-container .text').classList.add('anim-translate');

}, 700);

```

And finally, I set AI animated picture by adding `<video>` tag and a line in the JSON file, and use `Pixverse` to generate the different images.

```js

document.querySelector('.container-video video').src = `${data.images.video}`;

if(window.innerWidth >= 768){

    clearTime = setTimeout(() => {
       document.querySelector('.container-video video').currentTime = 0;
       document.querySelector('.container-video video').style.display = 'block';
       document.querySelector('.container-video video').play();
   }, 3000);   

}


```


### Continued development

Learning from each challenge, I will continue to make website with JS and learning from different challenge from Front-end Mentor.


### Useful resources

- [Mozilla mdn](https://developer.mozilla.org/) - Very useful.
- [FreeCodeCamp](https://www.freecodecamp.org/) - I've been learning a lot.
- [Utopia](https://utopia.fyi/) - To have a better responsive design.
- [PixVerse](https://app.pixverse.ai/onboard) - AI generated images.


## Author

- Frontend Mentor - [@Lo-deck](https://www.frontendmentor.io/profile/Lo-Deck)


## Acknowledgments

Thanks to Front-end Mentor and its community.
