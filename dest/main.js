const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = $('.header'),
    slider = $('.slider'),
    feature = $('.feature'),
    feature1 = $('#feature-1'),
    feature2 = $('#feature-2'),
    quality = $('.quality'),
    about = $('.about'),
    gallery = $('.gallery');

const mobBtn = $('.mobile-btn'),
    nav = $('.nav');

const langBtn = $('.lang'),
    langCurrent = $('.lang__btn span '),
    langOptions = $('.lang__options'),
    langItemOptions = $$('.lang__options a');

const optionsMenu = $$('.header .menu li a'),
    optionsNav = $$('.nav .menu li a');

const backToTop = $('.footer .right div')

const popUpBtn = $$('.video__item .img'),
    popUpVid = $('.popup__video'),
    popUpItem = $('.popup__video-item iframe'),
    exitPopUp = $('.exit__popup'),
    videoList = $$('.video__item .img');

const sliderList = $$('.slider__list-item'),
    prevBtn = $('.-prev'),
    nextBtn = $('.-next'),
    dot = $$('.dots li'),
    sliderNumber = $('.slider__bottom .left span');




const accor = $$('.accor_item .accor-btn');


let heightHeader = header.clientHeight,
    heightSlider = slider.clientHeight,
    heightFeature = feature.clientHeight,
    heightFeature1 = feature1.clientHeight,
    heightFeature2 = feature2.clientHeight,
    heightQuality = quality.clientHeight,
    wWidth = window.innerWidth;


//Open Nav Mob
let openNav = mobBtn.addEventListener('click', function () {

    mobBtn.classList.toggle('active');
    nav.classList.toggle('active');
});


//Resize Nav
window.addEventListener('resize', function () {
    if (window.innerWidth >= 992) {
        mobBtn.classList.remove('active');
        nav.classList.remove('active');
    }
})


//Back to top
backToTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0
    });
})


//Language button
langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    langBtn.classList.toggle('active')
})

document.addEventListener('click', function () {
    langBtn.classList.remove('active')
})

langItemOptions.forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        var text = this.textContent;
        var saveText = langCurrent.textContent;
        langCurrent.innerHTML = text;
        this.textContent = saveText;
    })
})


//Pop-up Video
videoList.forEach(function (item) {
    item.addEventListener('click', function () {
        //get vid data
        let itemVid = this.getAttribute("vid_data_src");
        //set vid data into link
        popUpItem.setAttribute('src', 'https://www.youtube.com/embed/' + itemVid + '?autoplay=0&mute=1');

        //open pop-up
        this.addEventListener('click', function (e) {
            e.stopPropagation();
            popUpVid.classList.add('active');
        })

        exitPopUp.addEventListener('click', function (e) {
            e.stopPropagation();
            popUpVid.classList.remove('active');
            popUpItem.setAttribute('src', '');
        })

        document.addEventListener('click', function () {
            popUpVid.classList.remove('active');
            popUpItem.setAttribute('src', '');
        })
    })
})


//section scroll + click active
let sections = [];

function removeActive() {
    optionsMenu.forEach(function (optionItem) {
        optionItem.classList.remove('active')
    })
}

optionsMenu.forEach(function (itemMenu) {
    //get href
    let href = itemMenu.getAttribute('href');
    //remove #
    let className = href.replace('#', '');
    //select section + class
    let section = $('.' + className);
    sections.push(section);

    itemMenu.addEventListener('click', function (e) {
        e.preventDefault();

        //position section from top of section 
        let positionSec = section.offsetTop - heightHeader + 20 + 1;
        window.scrollTo({
            top: positionSec
        });

        removeActive();
        this.classList.add('active');
    })
})

//Nav mobile
optionsNav.forEach(function (itemNav) {
    //get href
    let href = itemNav.getAttribute('href');
    //remove #
    let className = href.replace('#', '');
    //select section + class
    let section = $('.' + className);
    itemNav.addEventListener('click', function (e) {
        e.preventDefault();

        let positionSec = section.offsetTop - 60 + 1;
        window.scrollTo({
            top: positionSec
        });

        mobBtn.classList.remove('active');
        nav.classList.remove('active');
    })
})


//scroll Event + Animation
window.addEventListener('load', function () {
    window.addEventListener('scroll', function () {
        const scrollY = window.pageYOffset;

        //Header Background
        if (scrollY > heightSlider - heightHeader && wWidth > 992) {
            //Device width > 990px (fix mobile prob)  
            header.classList.add('active')
        } else {
            header.classList.remove('active')
        }

        //Remove then add active when scroll to section
        sections.forEach(function (itemSection, index) {
            let sectionHeight = itemSection.offsetTop - heightHeader + 20;
            if (scrollY > sectionHeight) {
                removeActive();
                optionsMenu[index].classList.add('active')
            }
        })

        //Feature + Video Fade-in
        this.setTimeout(function () {
            feature1.classList.add('fade-in')
            feature2.classList.add('fade-in')
        }, 500)

        //Quality + Video
        if (scrollY > heightSlider + heightFeature1) {
            this.setTimeout(function () {
                const video = $('.video__list');
                quality.classList.add('fade');
                video.classList.add('fade');
            }, 200)
        }

        // About
        if (scrollY > heightSlider + heightFeature + heightQuality) {
            this.setTimeout(function () {
                about.classList.add('fade-in')
            }, 100)
        }
    })
})



//Slider
let currentSlider = 0;

sliderList.forEach(function (sliderItem, index) {
    if (sliderItem.classList.contains('active')) {
        currentSlider = index
    }
})

function showNumber(i) {
    sliderNumber.innerHTML = (i).toString().padStart(2, '0');
}

nextBtn.addEventListener('click', function (e) {
    e.preventDefault()

    if (currentSlider < sliderList.length - 1) {
        toDo(currentSlider + 1);
    } else {
        toDo(0);
    }
})

prevBtn.addEventListener('click', function (e) {
    e.preventDefault()

    if (currentSlider > 0) {
        toDo(currentSlider - 1);
    } else {
        toDo(sliderList.length - 1);
    }
})

function toDo(index) {
    sliderList[currentSlider].classList.remove('active')
    sliderList[index].classList.add('active')
    //active dot
    dot[currentSlider].classList.remove('active')
    dot[index].classList.add('active')
    currentSlider = index;

    showNumber(currentSlider + 1)
}

dot.forEach(function (item, index) {
    item.addEventListener('click', function () {
        toDo(index)
    })
})


//News

const tagNews = $$('.news__tag .tag'),
    listNews = $$('.news__list');

tagNews.forEach(function (item, index) {
    item.addEventListener('click', function () {
        let tagID = index + 1;
        tagNews.forEach(function (tag) {
            tag.classList.remove('active')
        })
        listNews.forEach(function (itemNews) {
            itemNews.classList.remove('active')
        })
        item.classList.add('active')
        document.querySelector('.nl_' + tagID).classList.add('active')
    })
})


//Accordian
accor.forEach(function (accBtn) {
    accBtn.addEventListener('click', function () {
        this.classList.toggle('active')
        const panel = this.parentElement.scrollHeight;
        if (this.classList.contains('active')) {
            this.parentElement.style.maxHeight = panel + 'px';
        } else {
            this.parentElement.style.maxHeight = '';
        }
    })
})