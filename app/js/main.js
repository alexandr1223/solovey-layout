$(function () {

    $('img.img-svg').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
        }, 'xml');
    }); 

    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if(height > 60){
            document.querySelector('.header').style.padding = "15px 0";
		} else if (height < 60 && document.documentElement.clientWidth > 1710) {
            document.querySelector('.header').style.padding = "44px 0";
        } else if (height < 60 && document.documentElement.clientWidth > 1300) {
            document.querySelector('.header').style.padding = "24px 0";
        }
    });

    function menu(menuBtn, block, close) {
        if (document.querySelector(menuBtn)) {
            document.querySelector(menuBtn).addEventListener('click', () => {
                document.querySelector(menuBtn).style.opacity = "0";
                document.querySelector(block).style.cssText = 'left: 0';
                document.body.style.overflow = "hidden";
                setTimeout(function() {
                    document.querySelector(close).style.cssText = " opacity: 1; visibility: visible"
                }, 500)
            })
            document.querySelector(close).addEventListener('click', () => {
                document.body.style.overflow = "auto"
                document.querySelector(menuBtn).style.opacity = "1";
                document.querySelector(block).style.cssText = 'left: -100%';
                document.querySelector(close).style.cssText = "opacity: 0; visibility: hidden"
            })
        }
    } 
    menu('.header__humburger', '.header__mobile', '.header__close');

    function openModal() {
        let title = document.querySelector('.modal__title'),
        text = document.querySelector('.modal__descr'),
        list = document.querySelector('.modal__list'),
        result = document.querySelector('.modal__result'),
        link = document.querySelector('.modal__link')
        document.querySelectorAll('.projects__item').forEach(item => {
            item.addEventListener('click', function(item) {
                console.log()
                if (this.dataset.title) {
                    title.textContent = this.dataset.title
                } 
                if (this.dataset.text) {
                    text.textContent = this.dataset.text
                } 
                if (this.dataset.result) {
                    result.textContent = this.dataset.result
                } 
                if (this.dataset.link) {
                    link.textContent = this.dataset.link;
                    link.href = this.dataset.link
                } 
                list.innerHTML = ''
                if (this.dataset.list1) {
                    let li = document.createElement('li');
                    li.textContent = this.dataset.list1;
                    list.appendChild(li)
                } 
                if (this.dataset.list2) {
                    let li = document.createElement('li');
                    li.textContent = this.dataset.list2;
                    list.appendChild(li)
                } 
                if (this.dataset.list3) {
                    let li = document.createElement('li');
                    li.textContent = this.dataset.list3;
                    list.appendChild(li)
                } 
                if (this.dataset.list4) {
                    let li = document.createElement('li');
                    li.textContent = this.dataset.list4;
                    list.appendChild(li)
                } 
                if (this.dataset.list5) {
                    let li = document.createElement('li');
                    li.textContent = this.dataset.list5;
                    list.appendChild(li)
                } 
                let img = document.createElement('img');
                img.src = this.dataset.for1;
                if (document.querySelector('.modal__mobile')) {
                    document.querySelector('.modal__mobile img').src=this.dataset.mobile
                }
                document.querySelectorAll('.modal__for img')[0].src=this.dataset.for1
                document.querySelectorAll('.modal__for img')[1].src=this.dataset.for2
                document.querySelectorAll('.modal__for img')[2].src=this.dataset.for3
                document.querySelectorAll('.modal__for img')[3].src=this.dataset.for4                
                document.querySelectorAll('.modal__for img')[4].src=this.dataset.for5
                document.querySelectorAll('.modal__nav img')[0].src=this.dataset.nav1
                document.querySelectorAll('.modal__nav img')[1].src=this.dataset.nav2
                document.querySelectorAll('.modal__nav img')[2].src=this.dataset.nav3
                document.querySelectorAll('.modal__nav img')[3].src=this.dataset.nav4
                document.querySelectorAll('.modal__nav img')[4].src=this.dataset.nav5

                document.querySelector('.modal').style.cssText = 'z-index: 30; opacity: 1; visibility: visible;';
                document.body.style.overflow = "hidden";
            })
        })
        document.querySelector('.modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                document.body.style.overflow = "auto"
                document.querySelector('.modal').style.cssText = 'visibility: hidden; z-index: -10; opacity: 0 left: -100%'
            }
        })
        
        if (document.documentElement.clientWidth > 767) {
            $('.modal__for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.modal__nav'
            });
            $('.modal__nav').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.modal__for',
                dots: false,
                arrows: false,
                centerMode: true,
                focusOnSelect: true,
                infinite: true
            });
        }
        
        if (document.querySelector('.modal__close')) {
            document.querySelector('.modal__close').addEventListener('click', (e) => {
                document.body.style.overflow = "auto"
                document.querySelector('.modal').style.cssText = 'visibility: hidden; z-index: -10; opacity: 0;'
            })
        }
    }
    openModal();

    $(".header__menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        if (!this.classList.contains('header__page')) {
            event.preventDefault();
        }
        if (document.documentElement.clientWidth < 991) {
            document.querySelector('.header__close').style.cssText = 'z-index: -10; opacity: 0';
            document.querySelector('.header__humburger').style.cssText = 'z-index: 25; opacity: 1';
            document.querySelector('.header__mobile').style.cssText = 'visibility: hidden; z-index: -10; opacity: 0';
            document.body.style.overflow = 'auto'
        }
        var id  = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top - 110;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $(document).ready(function(){
        if (document.querySelector('.useful') && document.documentElement.clientWidth < 990) {
            $('.useful__block').slick({
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                variableWidth: true,
                infinite: true,
                responsive:[
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        } 
    });
});