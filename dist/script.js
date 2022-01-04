'use strict';

//Element selection
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtns = document.querySelectorAll('.btn--show-modal');
const closeModalBtn = document.querySelector('.btn--close-modal');
const nav = document.querySelector('.nav');
const navLinksContainer = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
const navLogo = document.querySelector('.nav__logo');
const burger = document.querySelector('.nav__burger');
const headerId = document.querySelector('#header');
const header = document.querySelector('.header');
const scrollToBtn = document.querySelector('.btn--scroll-to');
const sectionAbout = document.querySelector('#section--about');
const skills = document.querySelectorAll('.skills__skill');
const tabsContainer = document.querySelector('.experience__tab-container');
const tabs = document.querySelectorAll('.experience__tab');
const tabsContent = document.querySelectorAll('.experience__content');

////////////////////////////////////
//Modal Contact Window

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

    //if modal is opened from mobile nav, close it
    navLinksContainer.classList.remove('nav__links--active');
    burger.classList.remove('nav__toggle');
}

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

//Open contact form
openModalBtns.forEach(btn => btn.addEventListener('click', openModal));

//Close contact form 
//by clicking X button
closeModalBtn.addEventListener('click', closeModal);

//by clicking off the modal window
overlay.addEventListener('click', closeModal);

//by hitting the escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

////////////////////////////////////
//Sticky Nav

//get the height of the nav class
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: '-90px' //header has a padding now of 90px
});
headerObserver.observe(header);

////////////////////////////////////
//Button/Navigation Scrolling

//down arrow
scrollToBtn.addEventListener('click', function () {
    sectionAbout.scrollIntoView({ behavior: 'smooth' });
});

//nav logo
navLogo.addEventListener('click', function () {
    headerId.scrollIntoView({ behavior: 'smooth' });
});

//event deligation for the nav items
document.querySelector('.nav__links').addEventListener('click', function (e) {

    //Matching strategy - only select the nav link elements when this event occurs
    if (e.target.classList.contains('nav__link') && !e.target.classList.contains('nav__resume')) {
        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

////////////////////////////////////////////////////
//Nav Fade Animation

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');

        siblings.forEach(el => {
            if (el != link) el.style.opacity = this;
        });
    }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////////////////////////
//Reveal Skills

const revealSkill = function (skills, observer) {
    const [skill] = skills;

    if (!skill.isIntersecting) return;

    skill.target.classList.remove('skill--hidden');
    observer.unobserve(skill.target);
}

const skillObserver = new IntersectionObserver(revealSkill, {
    root: null,
    threshold: 0.01
});

skills.forEach(function (skill) {
    skillObserver.observe(skill);
    skill.classList.add('skill--hidden');
});

////////////////////////////////////////////////////
//Experience Tabbed Component

tabsContainer.addEventListener('click', function (e) {
    //get the tab element that is clicked
    const clicked = e.target.closest('.experience__tab');
    //if no tab was clicked, return
    if (!clicked) return;

    tabs.forEach(t => t.classList.remove('experience__tab--active'));
    clicked.classList.add('experience__tab--active');

    tabsContent.forEach(c => c.classList.remove('experience__content--active'));
    document.querySelector(`.experience__content--${clicked.dataset.tab}`).classList.add('experience__content--active');
});

////////////////////////////////////////////////////
//Mobile Nav

burger.addEventListener('click', function () {

    if (overlay.classList.contains('hidden')) {
        navLinksContainer.classList.add('nav__links--active');
        burger.classList.add('nav__toggle');
        overlay.classList.remove('hidden');
    } else {
        navLinksContainer.classList.remove('nav__links--active');
        burger.classList.remove('nav__toggle');
        overlay.classList.add('hidden');
    }
});

//close mobile nav when clicked off
overlay.addEventListener('click', function () {
    navLinksContainer.classList.remove('nav__links--active');
    burger.classList.remove('nav__toggle');
});

//close mobile nav when a link is clicked
navLinks.forEach(n => {
    if (n.classList.contains('nav__btn')) return;

    n.addEventListener('click', function () {
        navLinksContainer.classList.remove('nav__links--active');
        burger.classList.remove('nav__toggle');
        overlay.classList.add('hidden');
    });
});

navLogo.addEventListener('click', function () {
    navLinksContainer.classList.remove('nav__links--active');
    burger.classList.remove('nav__toggle');
    overlay.classList.add('hidden');
});
