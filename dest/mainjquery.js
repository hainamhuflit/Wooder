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
    langItemOptions = $('.lang__options a');

const optionsMenu = $('.header .menu li a'),
    optionsNav = $('.nav .menu li a');

const backToTop = $('.footer .right div')

const popUpBtn = $('.video__item .img'),
    popUpVid = $('.popup__video'),
    popUpItem = $('.popup__video-item iframe'),
    exitPopUp = $('.exit__popup'),
    videoList = $('.video__item .img');

const sliderList = $('.slider__list-item'),
    prevBtn = $('.-prev'),
    nextBtn = $('.-next'),
    dot = $('.dots li'),
    sliderNumber = $('.slider__bottom .left span');


const tagNews = $('.news__tag .tag'),
    listNews = $('.news__list');

const accor = $('.accor_item .accor-btn');

let heightHeader = header.innerHeight(),
    heightSlider = slider.innerHeight(),
    heightFeature = feature.innerHeight(),
    heightFeature1 = feature1.innerHeight(),
    heightFeature2 = feature2.innerHeight(),
    heightQuality = quality.innerHeight(),
    wWidth = window.innerWidth;

let sections = [];


$(document).ready(function () {

    //Open Nav
    mobBtn.on('click', function (e) {
        e.stopPropagation()

        $(this).toggleClass('active')
        nav.toggleClass('active')
    })

    $(document).on('click', function () {
        mobBtn.removeClass('active')
        nav.removeClass('active')
    })

    //Resize Nav 
    $(window).on('resize', function () {
        if (window.innerWidth >= 992) {
            mobBtn.removeClass('active')
            nav.removeClass('active')
        }
    })

    //Back to top
    const backToTop = $('.footer .right div')

    backToTop.on('click', function () {
        window.scrollTo({
            top: 0
        })
    })

    //Language Button
    langBtn.on('click', function (e) {
        e.stopPropagation()
        $(this).toggleClass('active')
    })

    $(document).on('click', function () {
        langBtn.removeClass('active')
    })

    langItemOptions.on('click', function (e) {
        e.stopPropagation()
        let text = $(this).text()
        let saveText = langCurrent.text()

        langCurrent.text(text)
        $(this).text(saveText)
    })

    //Pop-up Video
    videoList.on('click', function () {
        let itemVid = $(this).attr('vid_data_src')
        popUpItem.attr('src', 'https://www.youtube.com/embed/' + itemVid + '?autoplay=0&mute=1')

        $(this).on('click', function (e) {
            e.stopPropagation()
            popUpVid.addClass('active')
        })

        exitPopUp.on('click', function (e) {
            e.stopPropagation()
            popUpVid.removeClass('active')
            popUpItem.attr('src', '')
        })

        $(document).on('click', function () {
            popUpVid.removeClass('active')
            popUpItem.attr('src', '')
        })
    })

    //section scroll + click active
    function removeActive() {
        optionsMenu.each(function () {
            $(this).removeClass('active')
        })
    }


    $.each(optionsMenu, function () {
        let href = $(this).attr('href')
        let className = href.replace('#', '')
        let section = $('.' + className)
        sections.push(section)

        $(this).on('click', function (e) {
            e.preventDefault();

            let positionSec = section.offset().top - heightHeader + 20 + 1;
            window.scrollTo({
                top: positionSec
            });

            removeActive()
            $(this).addClass('active')
        })
    })

    //Nav mobile
    $.each(optionsNav, function () {
        let href = $(this).attr('href')
        let className = href.replace('#', '')
        let section = $('.' + className)

        $(this).on('click', function (e) {
            e.preventDefault();

            let positionSec = section.offset().top - heightHeader
            // let positionSec = section.offset().top - heightHeader -60 + 1

            window.scrollTo({
                top: positionSec
            });

            mobBtn.removeClass('active')
            nav.removeClass('active')
        })
    })

    //scroll Event + Animation
    $(window).on('scroll', function () {
        const scrollY = window.pageYOffset;

        //Header Background
        if (scrollY > heightSlider - heightHeader && wWidth > 992) {
            header.addClass('active')
        } else {
            header.removeClass('active')
        }

        //Remove then add active when scroll to section
        $.each(sections, function (index) {
            let sectionHeight = $(this).offset().top - heightHeader + 20

            if (scrollY > sectionHeight) {
                removeActive();
                optionsMenu.eq(index).addClass('active')
            }
        })

        //Feature + Video Fade-in
        this.setTimeout(function () {
            feature1.addClass('fade-in')
            feature2.addClass('fade-in')
        }, 250)

        //Quality + Video
        if (scrollY > heightSlider + heightFeature1) {
            this.setTimeout(function () {
                const video = $('.video__list')
                quality.addClass('fade')
                video.addClass('fade')
            }, 250)
        }

        // About
        if (scrollY > heightSlider + heightFeature + heightQuality) {
            this.setTimeout(function () {
                about.addClass('fade-in')
            }, 100)
        }
    })

    //Slider
    // let currentSlider = 0

    // $.each(sliderList, function () {
    //     if ($(this).hasClass('active')) {
    //         currentSlider = $(this).index()
    //     }
    // })


    // function showNumber(i) {
    //     sliderNumber.text((i).toString().padStart(2, '0'))
    // }

    // nextBtn.on('click', function (e) {
    //     e.preventDefault()

    //     if (currentSlider < sliderList.length - 1) {
    //         toDo(currentSlider + 1);
    //     } else {
    //         toDo(0);
    //     }
    // })
    // prevBtn.on('click', function (e) {
    //     e.preventDefault()

    //     if (currentSlider > 0) {
    //         toDo(currentSlider - 1);
    //     } else {
    //         toDo(sliderList.length - 1);
    //     }
    // })
    // dot.on('click', function (index) {
    //     toDo(index)
    // })

    // function toDo(index) {
    //     $(sliderList[currentSlider]).removeClass('active')
    //     $(sliderList[index]).addClass('active')

    //     $(dot[currentSlider]).removeClass('active')
    //     $(dot[index]).addClass('active')
    //     currentSlider = index;

    //     showNumber(currentSlider + 1)
    // }

    let $carousel = $('.slider__list');
    $carousel.flickity({
        cellAlign: 'left',
        contain: true,
        // wrapAround: true,
        prevNextButtons: false,
        on: {
            ready: function () {
                let dots = $('.flickity-page-dots')
                paging = $('.slider__bottom .dots')
                dots.appendTo(paging)
            },
            change: function (index) {
                let indexPage = index + 1
                sliderNumber.text(indexPage.toString().padStart(2, '0'))
            }
        }

    })

    $('.slider__bottom .-prev').on('click', function (e) {
        e.preventDefault()
        $carousel.flickity('previous')
    })
    $('.slider__bottom .-next').on('click', function (e) {
        e.preventDefault()
        $carousel.flickity('next')
    })

    //Tag News
    tagNews.on('click', function (index) {
        let tagID = $(this).index() + 1;

        $.each(tagNews, function () {
            $(this).removeClass('active')
        })
        $.each(listNews, function () {
            $(this).removeClass('active')
        })

        $(this).addClass('active')
        $('.nl_' + tagID).addClass('active')
    })

    //Accordian
    accor.on('click', function () {
        $(this).toggleClass('active')
        const panel = $(this).parent().prop('scrollHeight');
        console.log(panel)
        if ($(this).hasClass('active')) {
            $(this).parent().css('max-height', panel)
        } else {
            $(this).parent().css('max-height', '')
        }
    })
})


//Flickity img bottom
$('.main-carousel').flickity({
    // options
    cellAlign: 'left',
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    groupCells: '50%'

});


//PhotoSwipe Func
// $(window).load(function () {
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};
    initPhotoSwipeFromDOM('.gallery__list');
// });  
