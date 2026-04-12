"use client";
import React from 'react';

const C = {
    bg: "#0a1a0f",
    surface: "#0f2216",
    surfaceAlt: "#132a1a",
    border: "#1a4a2a",
    text: "#F0F4F0",
    muted: "#8aaa8e",
    accent: "#50C878",
    gold: "#D4AF37",
    goldMuted: "#9a7c24",
};

const IMG_WEB = "/photos/school.png";
const IMG_CLINC = "/photos/clinic.png";
const IMG_MKT = "/photos/marketing.png";
const IMG_CODE = "/photos/portfolio.png";

const projects = [
    {
        title: "School — Academic Institution Website",
        desc: "A clean, performant website built for a school. Covers academics, admissions, events, and institutional info with a polished modern design.",
        stack: ["Next.js", "TypeScript", "Vercel", "Tailwind CSS", "PostgreSQL", "Prisma", "Admin Panel", "Automation", "Email Automation"],
        year: "2025",
        img: IMG_WEB,
        live: "https://school-omega-one.vercel.app/",
        github: "https://school-omega-one.vercel.app/",
    },
    {
        title: "Kalyan — Brand Identity & Web",
        desc: "End-to-end brand refresh: logo system, color language, typography, and a new marketing website for a dental clinic.",
        stack: ["Figma", "Framer", "Brand Design", "Copywriting", "MongoDB", "Automation", "Admin Panel"],
        year: "2025",
        img: IMG_CLINC,
        live: "https://kalyan-v2.vercel.app/",
        github: "https://kalyan-v2.vercel.app/",
    },
    {
        title: "Suppermart — E-Commerce Website",
        desc: "A clean, performant website built for a suppermart. Covers products, cart, checkout, and customer information with a polished modern design.",
        stack: ["React", "Recharts", "Node.js", "Meta API", "My SQL"],
        year: "2025",
        img: IMG_MKT,
        live: "https://suppermart.vercel.app/",
        github: "https://suppermart.vercel.app/",
    },
    {
        title: "My Portfolio",
        desc: "A clean, performant website built for a portfolio. Covers projects, services, and contact information with a polished modern design.",
        stack: ["Next.js", "Prisma", "TypeScript", "Resend"],
        year: "2026",
        img: IMG_CODE,
        live: "https://my-portfolio-ten-jet-51.vercel.app/",
        github: "https://my-portfolio-ten-jet-51.vercel.app/",
    },
];

const team = [
    { name: "Asmit Singh", role: "Web Development", desc: "Architects and builds every digital product. From landing pages to full-stack platforms — if it runs in a browser, this is his domain.", initials: "AS", color: "#50C878" },
    { name: "Aanand Mehta", role: "Design & Creative", desc: "The visual mind of Glaze. Brand identity, UI systems, motion, and the visual language that makes clients' work impossible to ignore.", initials: "AM", color: "#D4AF37" },
    { name: "Santanu Deo", role: "Marketing & Growth", desc: "Puts the right work in front of the right people. SEO, content strategy, paid campaigns — growth is the north star.", initials: "SD", color: "#6ba8d4" },
    { name: "Kishan Sha", role: "Business & Deals", desc: "The closer. Client relationships, proposals, partnerships — turning conversations into contracts and contracts into long-term trust.", initials: "KS", color: "#d4a050" },
];

const services = [
    { label: "Web Development", tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"] },
    { label: "Design & Creative", tags: ["Figma", "UI/UX", "Brand Identity", "Motion Design", "Visual Systems", "Prototyping"] },
    { label: "Marketing & Growth", tags: ["SEO", "Social Media", "Content Strategy", "Paid Ads", "Email Marketing", "Analytics"] },
    { label: "Business & Deals", tags: ["Client Relations", "Proposals", "Partnerships", "Strategy", "Negotiation", "Growth Planning"] },
];

const navLinks = [
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Work", id: "showcase" },
    { label: "Team", id: "team" },
    { label: "Contact", id: "contact" },
];


export function SupremeLayout() {
    return (
        // <div className='text-center text-2xl font-bold'><h1>MAT KAR LALA MAT KARRRR ABHI AAKAR KOI FAIDA NHII HAIIIIIII, SAMJHAAAAAA</h1></div>
        <section id='home'>
            <div>

            </div>
        </section>
    );
}
