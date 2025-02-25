let array;
let index;
let interval = false;
let numInterval;

let clearTime;


async function fetchData () {

    try{

        response = await fetch('./data.json', {
            method: 'GET',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            throw(`Error loading data : ${response.status}`);
        }

        const data = await response.json();

        array = data;

        return data;

    }
    catch(error){
        console.error('Error: ', error);
    }

}


const setInnerPage = (data) => {

    //video

    document.querySelector('.container-video video').src = `${data.images.video}`;

    //section

    document.querySelector('.container-image .paint').src = `${window.innerWidth < 768 ? data.images.hero.small : data.images.hero.large}`;
    document.querySelector('.container-image .paint').alt = `painting ${data.name}`;
    document.querySelector('.container-text-image .title').innerHTML = `${data.name}<span class="author text-regular"></span>`;
    document.querySelector('.container-text-image .title span.author').textContent = `${data.artist.name}`;
    document.querySelector('.container-text-image .image-artiste').src = `${data.artist.image}`;
    document.querySelector('.container-text-image .image-artiste').alt = `${data.artist.name}`;  
    document.querySelector('.text-container .date').textContent = `${data.year}`;
    document.querySelector('.text-container .text').textContent = `${data.description}`;
    document.querySelector('.button-source').href = `${data.source}`;

    //aside

    document.querySelector('.bottom .text-bold').innerHTML = `${data.name}<span class="author text-regular"></span>`;
    document.querySelector('.bottom .author').textContent = `${data.artist.name}`;

}


const setBorderSlideWidth = (index) => {          
    const widthElement = Number(window.getComputedStyle(document.querySelector('.slide .outer-line'), null).getPropertyValue("width").split('p')[0]);    
    document.querySelector('.slide .line2').style.width = `${ ((index+1) * ( widthElement / 15 ))/16  }rem`;
}

const closeGallery = () => {
    document.querySelector('.container-gallery').remove();
    document.querySelector('.background-gallery').style.display = "none";
}

const setAnim = () => {
    document.querySelector('.container-text-image .title').classList.add('anim-opacity');
    document.querySelector('.text-container .text').classList.add('anim-opacity');
    document.querySelector('.text-container .date').classList.add('anim-shadow');
    document.querySelector('.container-image .paint').classList.add('anim-scale');
    document.querySelector('.container-image .paint').classList.remove('anim-scale-reverse');
    document.querySelector('.container-image .image-artiste').classList.add('anim-turn'); 
}



if(!document.querySelector('.slide')){ 
   
    fetchData().then( data => {

        array = data;

        let i = 1;

        for(item of data){

            const li = document.createElement('li');

            li.classList.add(`li-image`);
            li.classList.add(`item${i}`);

            li.innerHTML = `
                <a class="link-paint" href="./slide.html?paint=value${ i-1 < 10 ? `0${i-1}` : `${i-1}` }" data-paint=${ i-1 < 10 ? `0${i-1}` : `${i-1}` } >
                    <img class="paint" src="${item.images.thumbnail}" alt="">
                    <h2 class="text-bold">${item.name}<span class="author text-regular">${item.artist.name}</span></h2>
                </a>
            `;

            document.querySelector('.list-image').insertAdjacentElement('beforeend', li);
            i++;

        }

    });

}

else{

    const urlParams = new URLSearchParams(window.location.search);
    let param1 = urlParams.get('paint');
    index = Number(param1.slice(-2));   //extract index to set the page

    fetchData().then( data => {

        setInnerPage(data[index]);
        setBorderSlideWidth(index);

        document.querySelector('.button-gallery').addEventListener('click', () => {

            window.scrollTo(0, 0);

            const containerImgGallery = document.createElement('div');
            containerImgGallery.classList.add('container-gallery');

            containerImgGallery.innerHTML = `
                <button class="button button-close text-bold" onclick="close()" >close</button>
                <img class="image-gallery" src="${data[index].images.gallery}" alt="${data[index].name}"> 
            `

            document.querySelector('.bottom').insertAdjacentElement('afterend', containerImgGallery);
            document.querySelector('.background-gallery').style.display = "block";

            document.querySelector('.button-close').addEventListener('click', () => {

                closeGallery();

            });


        });

    });

}

let animImage = false;

document.querySelectorAll('.button-slide').forEach( (item, i) => {

    item.addEventListener('click', () => {

        // console.log('apres : ' + clearTime);

        // clearTimeout(clearTime);

        document.querySelector('.container-video video').currentTime = 0;
        document.querySelector('.container-video video').style.display = 'none';

        if(!interval){        
                        
            if(i === 0 && index > 0){

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


                //launch video

                clearTime = setTimeout(() => {
                    document.querySelector('.container-video video').currentTime = 0;
                    document.querySelector('.container-video video').style.display = 'block';
                    document.querySelector('.container-video video').play();
                }, 3000);

        
            }
            else if(i === 1 && index < 14){

                setAnim();

                setTimeout(() => {

                    if(index < 14){
                        index++;                    
                    }

                    setInnerPage(array[index]);
                    setBorderSlideWidth(index);  
                    document.querySelector('.container-image .paint').classList.add('anim-scale-reverse');
                    document.querySelector('.text-container .text').classList.add('anim-translate');

                }, 700);


                //launch video
                setTimeout(() => { 
                    document.querySelector('.container-video video').currentTime = 0;
                    document.querySelector('.container-video video').style.display = 'block';
                    document.querySelector('.container-video video').play();
                }, 3000); 

            }

            setTimeout( () => {
                document.querySelector('.container-image .paint').classList.remove('anim-scale');
                document.querySelector('.container-image .image-artiste').classList.remove('anim-turn');
            }, 750);


            setTimeout( () => {
                document.querySelector('.container-image .paint').classList.add('anim-scale-reverse');
                document.querySelector('.container-text-image .title').classList.remove('anim-opacity');
                document.querySelector('.text-container .text').classList.remove('anim-opacity');
            }, 800);

            setTimeout( () => {
                document.querySelector('.text-container .date').classList.remove('anim-shadow');
                document.querySelector('.text-container .text').classList.remove('anim-translate');
            }, 1500);
  
            setTimeout(() => {  
                document.querySelector('.container-video video').style.display = 'none';
            }, 8000);


        }



    });

});

if(animImage){

    console.log(animImage);

    document.querySelector('.container-video video').currentTime = 0;
    document.querySelector('.container-video video').style.display = 'block';
    document.querySelector('.container-video video').play();

}


window.onload = ( () => {

    const urlParams = new URLSearchParams(window.location.search);
    let param2 = urlParams.get('slide');

    if(document.querySelector('.slide')  && !param2 ){

        if(!interval && window.innerWidth > 768){

            setTimeout(() => {
                document.querySelector('.container-video video').currentTime = 0;
                document.querySelector('.container-video video').style.display = 'block';
                document.querySelector('.container-video video').play();
            }, 2000); 

        }
        else{

            document.querySelector('.container-video video').style.display = 'none';
            document.querySelector('.container-video video').pause();

        }

        setTimeout(() => {  

            document.querySelector('.container-video video').style.display = 'none';

        }, 10000);

    }

    else if(document.querySelector('.slide') && param2){

        document.querySelector('.container-video video').style.display = 'none';
        document.querySelector('.container-video video').pause();

        interval = !interval;

        document.querySelector('.button-slideshow').textContent = 'stop slideshow';


        numInterval = setInterval( () => {
               
            if(index === 14){
                clearInterval(numInterval);
                document.querySelector('.button-slideshow').textContent = 'start slideshow';
                interval = false;
            }

            else{

                setAnim();
    
                setTimeout(() => {
                    index++;
                    setInnerPage(array[index]);
                    setBorderSlideWidth(index);
                    document.querySelector('.container-image .paint').classList.add('anim-scale-reverse');
                    document.querySelector('.text-container .text').classList.add('anim-translate');
                }, 700);

                setTimeout( () => {
                    document.querySelector('.container-image .paint').classList.remove('anim-scale');
                    document.querySelector('.container-image .image-artiste').classList.remove('anim-turn');
                }, 750);
        
        
                setTimeout( () => {
                    document.querySelector('.container-image .paint').classList.add('anim-scale-reverse');
                    document.querySelector('.container-text-image .title').classList.remove('anim-opacity');
                    document.querySelector('.text-container .text').classList.remove('anim-opacity');
                }, 800);
        
                setTimeout( () => {
                    document.querySelector('.text-container .date').classList.remove('anim-shadow');
                    document.querySelector('.text-container .text').classList.remove('anim-translate');
                }, 1500);


            }
            
        }, 5000);

    }

});



document.querySelector('.button-slideshow').addEventListener('click', () => {

    console.log('Button slideshow');

    interval = !interval;

    if(!document.querySelector('.slide')){
        window.location.href = `./slide.html?paint=value00&slide=true`;
        index = 0;
    }
    else{
        document.querySelector('.container-video video').style.display = 'none';
        document.querySelector('.container-video video').pause();
    }

    if(interval){

        document.querySelector('.button-slideshow').textContent = 'stop slideshow';

        numInterval = setInterval(() => {
            
            if(index === 14){
                clearInterval(numInterval);
                document.querySelector('.button-slideshow').textContent = 'start slideshow';
                interval = false;
            }

            else{

                setAnim();

                setTimeout(() => {
                    index++;
                    setInnerPage(array[index]);
                    setBorderSlideWidth(index);
                    document.querySelector('.container-image .paint').classList.add('anim-scale-reverse');
                    document.querySelector('.text-container .text').classList.add('anim-translate');
                }, 700);

                setTimeout( () => {
                    document.querySelector('.container-image .paint').classList.remove('anim-scale');
                    document.querySelector('.container-image .image-artiste').classList.remove('anim-turn');
                }, 750);
        
                setTimeout( () => {
                    document.querySelector('.container-image .paint').classList.add('anim-scale-reverse');
                    document.querySelector('.container-text-image .title').classList.remove('anim-opacity');
                    document.querySelector('.text-container .text').classList.remove('anim-opacity');
                }, 800);
        
                setTimeout( () => {
                    document.querySelector('.text-container .date').classList.remove('anim-shadow');
                    document.querySelector('.text-container .text').classList.remove('anim-translate');
                }, 1500);


            }
            
        }, 5000);

    }

    else{
        document.querySelector('.button-slideshow').textContent = 'start slideshow';
        clearInterval(numInterval);
    }

});

