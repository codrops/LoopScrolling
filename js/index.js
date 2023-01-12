gsap.registerPlugin(ScrollTrigger);

// repeat first three items by cloning them and appending them to the .grid
const repeatItems = (parentEl, total = 0) => {
    const items = [...parentEl.children];
    for (let i = 0; i <= total-1; ++i) {
        var cln = items[i].cloneNode(true);
        parentEl.appendChild(cln);
    }
};

const lenis = new Lenis({
    smooth: true,
    infinite: true
});

lenis.on('scroll',()=>{
  ScrollTrigger.update()
})

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

imagesLoaded( document.querySelectorAll('.grid__item'), { background: true }, () => {

    document.body.classList.remove('loading');

    repeatItems(document.querySelector('.grid'), 1);

    const items = [...document.querySelectorAll('.grid__item')];

    // first item
    const firtsItem = items[0];
    gsap.set(firtsItem, {transformOrigin: '50% 100%'})
    gsap.to(firtsItem, {
        ease: 'none',
        startAt: {scaleY: 1},
        scaleY: 0,
        scrollTrigger: {
            trigger: firtsItem,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
            fastScrollEnd: true,
            onLeave: () => {
                gsap.set(firtsItem, {scaleY: 1,})
            },
        }
    });

    // last item  
    const lastItem = items[2];
    gsap.set(lastItem, {transformOrigin: '50% 0%', scaleY: 0})
    gsap.to(lastItem, {
        ease: 'none',
        startAt: {scaleY: 0},
        scaleY: 1,
        scrollTrigger: {
            trigger: lastItem,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            fastScrollEnd: true,
            onLeaveBack: () => {
                gsap.set(lastItem, {scaleY: 1})
            }
        }
    });
    
    // in between
    let ft;
    let st;
    const middleItem = items[1];
        
    ft = gsap.timeline()
    .to(middleItem, {
        ease: 'none',
        onStart: () => {
            if (st) st.kill()
        },
        startAt: {scale: 0},
        scale: 1,
        scrollTrigger: {
            trigger: middleItem,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
            onEnter: () => gsap.set(middleItem, {transformOrigin: '50% 0%'}),
            onEnterBack: () => gsap.set(middleItem, {transformOrigin: '50% 0%'}),
            onLeave: () => gsap.set(middleItem, {transformOrigin: '50% 100%'}),
            onLeaveBack: () => gsap.set(middleItem, {transformOrigin: '50% 100%'}),
        },
    });

    st = gsap.timeline()
    .to(middleItem, {
        ease: 'none',
        onStart: () => {
            if (ft) ft.kill()
        },
        startAt: {scale: 1},
        scale: 0,
        scrollTrigger: {
            trigger: middleItem,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
            onEnter: () => gsap.set(middleItem, {transformOrigin: '50% 100%'}),
            onEnterBack: () => gsap.set(middleItem, {transformOrigin: '50% 100%'}),
            onLeave: () => gsap.set(middleItem, {transformOrigin: '50% 0%'}),
            onLeaveBack: () => gsap.set(middleItem, {transformOrigin: '50% 0%'}),
        },
    });
    
    requestAnimationFrame(raf);
    
    const refresh = () => {
        ScrollTrigger.clearScrollMemory();
        window.history.scrollRestoration = 'manual';
        ScrollTrigger.refresh(true);
    }

    refresh();
    window.addEventListener('resize', refresh);

});