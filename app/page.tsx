'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ============ LANGUAGE CONTEXT ============
type Lang = 'es' | 'en';
const LangContext = createContext<Lang>('es');
const SetLangContext = createContext<(l: Lang) => void>(() => {});

function useLang() {
  return useContext(LangContext);
}
function useSetLang() {
  return useContext(SetLangContext);
}

// ============ TRANSLATIONS ============
const t = {
  es: {
    nav: ['Inicio', 'Quiénes Somos', 'Programas', 'Eventos', 'Contacto'],
    heroTag: '⚾ Béisbol Juvenil de Élite · Tampa, FL',
    heroTitle1: 'Entrena.',
    heroTitle2: 'Desarróllate.',
    heroTitle3: 'Compite.',
    heroSub: 'Un programa integral de desarrollo de béisbol creado para preparar a estudiantes-atletas para alcanzar el siguiente nivel.',
    heroCta1: '🏟️ Conoce Nuestros Programas',
    heroCta2: '📞 Contáctanos',
    stat1Num: '200+', stat1Label: '⚾ Atletas Activos',
    stat2Num: 'Tampa', stat2Label: '🌴 Florida',
    stat3Num: 'Elite', stat3Label: '🏆 Training',
    // About
    aboutTag: '⚾ Quiénes Somos',
    aboutTitle: 'Más que béisbol.',
    aboutP1: 'AB4 Academy es un programa de desarrollo creado alrededor del estudiante-atleta.',
    aboutP2: 'Proporcionamos un entorno donde el béisbol, la educación, la estructura y el crecimiento personal trabajan en conjunto para preparar a cada atleta para su próximo paso.',
    // Mission & Vision
    missionTag: '🎯 Nuestra Misión',
    missionTitle: '🎯 Misión',
    missionText: 'Desarrollar atletas con propósito, proporcionando entrenamiento de alto nivel, apoyo académico, orientación y exposición, mientras los preparamos para buscar oportunidades universitarias y alcanzar el éxito más allá del terreno de juego.',
    visionTitle: '👁️ Visión',
    visionText: 'Crear un camino donde el talento encuentre oportunidades, construyendo un programa reconocido por desarrollar atletas, abrir puertas hacia el siguiente nivel y generar oportunidades que trasciendan el béisbol.',
    // Why AB4
    whyTag: '💪 ¿Por Qué AB4?',
    whyTitle: 'Construido desde la experiencia. Enfocado en el futuro.',
    whyCards: [
      { title: '🏆 Coaching de Nivel Profesional', desc: 'Aprende de coaches con experiencia como jugadores profesionales.' },
      { title: '📈 Desarrollo Integral', desc: 'Atleta. Estudiante. Persona.' },
      { title: '🎓 Camino hacia College', desc: 'Preparación. Exposición. Oportunidad.' },
      { title: '🌟 Más Allá del Béisbol', desc: 'Disciplina. Carácter. Futuro.' },
    ],
    // Programs
    progTag: '⚾ Programas',
    progTitle: 'AB4 Homeschool Baseball Program',
    progSub: 'Middle & High School Student-Athletes',
    progPrice: 'Starting at $880/month',
    progScheduleLabel: 'Schedule',
    progSchedule: 'Monday – Friday',
    progScheduleTime: '8:00 AM – 2:00 PM',
    progWhatsIncluded: "⚾ WHAT'S INCLUDED",
    progFeatures: [
      '⚾ Professional Baseball Training',
      '🏏 Batting Development',
      '🧤 Fielding Development',
      '🎯 Position-Specific Training',
      '💪 Strength & Conditioning',
      '🏃 Athletic Performance Development',
      '📊 Athlete Evaluations & Progress Tracking',
      '📚 Structured Academic Time',
      '📖 Academic Support Available',
      '👨‍🏫 Professional Coaching Staff – MLB Experience',
      '🔄 Flexible Program Options',
      '✅ Step Up Provider',
    ],
    progMoreInfo: 'MORE INFORMATION',
    progMoreInfoText: 'Interested in learning more about the program?',
    progMoreInfoSub: 'Complete our Request Information Form or contact us directly for program details, availability, tuition options, and enrollment information.',
    progFormTitle: 'Request Information',
    progFormName: 'Parent / Guardian Name',
    progFormEmail: 'Email',
    progFormPhone: 'Phone',
    progFormStudent: "Student's Name",
    progFormGrade: 'Grade Level',
    progFormInterest: 'Program Interest',
    progFormInterestOptions: ['Full-Time', 'Part-Time', 'Flex Program'],
    progFormMsg: 'Questions or Comments (Optional)',
    progFormSend: 'Request Information',
    progFormSent: 'Information Requested!',
    progCta: 'Solicitar Información del Programa',
    progDisclaimer: 'AB4 Academy es un programa de desarrollo atlético y no es una escuela. Los estudiantes-atletas mantienen su inscripción con el proveedor educativo de su elección.',
    // HS Performance Program
    hsProgTag: '⚾ Programas',
    hsProgTitle: 'High School Performance Program',
    hsProgSub: 'Juniors & Seniors',
    hsProgPrice: 'Starting at $400/month',
    hsProgScheduleLabel: 'Schedule',
    hsProgSchedule: 'Tuesday – Thursday',
    hsProgScheduleTime: '1:00 PM – 3:00 PM',
    hsProgOptionsLabel: 'Training Options',
    hsProgOptions: ['2–3 Days Per Week', '2 Hours of Training Per Session'],
    hsProgWhatsIncluded: "⚾ WHAT'S INCLUDED",
    hsProgFeatures: [
      '🏏 Batting Development',
      '🧤 Fielding Development',
      '🔄 Skill Development & Repetition',
      '🎯 Position-Specific Defensive Work',
      '💪 Athletic Performance Development',
      '👨‍🏫 Professional Coaching Staff – MLB Experience',
      '🏋️ Performance-Focused Training Environment',
    ],
    hsProgMoreInfo: 'MORE INFORMATION',
    hsProgMoreInfoText: 'Interested in learning more about the program?',
    hsProgMoreInfoSub: 'Complete our Request Information Form or contact us directly for program details, availability, training options, and enrollment information.',
    hsProgFormTitle: 'Request Information',
    hsProgFormName: 'Parent / Guardian Name',
    hsProgFormEmail: 'Email',
    hsProgFormPhone: 'Phone',
    hsProgFormStudent: "Student's Name",
    hsProgFormGrade: 'Grade Level',
    hsProgFormMsg: 'Questions or Comments (Optional)',
    hsProgFormSend: 'Request Information',
    hsProgFormSent: 'Information Requested!',
    // Events
    eventTag: '📅 Eventos',
    eventTitle: 'Oportunidades de béisbol durante todo el año.',
    events: [
      { name: '🌸 Spring Break Camp', month: 'Marzo' },
      { name: '☀️ Summer Camp', month: 'Junio – Julio' },
      { name: '⚾ Summer Team', month: 'Solo High School' },
      { name: '🦃 Thanksgiving Camp', month: 'Noviembre' },
      { name: '❄️ Winter Camp', month: 'Diciembre' },
    ],
    eventRegTitle: '📋 Próximos Registros',
    eventReg1: '🦃 Thanksgiving Camp',
    eventReg2: '❄️ Winter Camp',
    eventRegCta: '📝 Regístrate Ahora',
    // CTA
    ctaTitle: '⚾ Da el Primer Paso.',
    ctaSub: 'Únete a AB4 Academy y desarrolla tu máximo potencial en béisbol.',
    ctaCta: '📞 Contáctanos Hoy',
    // Contact
    contactTag: '📞 Contacto',
    contactTitle: 'Hablemos',
    contactName: 'Nombre Completo',
    contactEmail: 'Email',
    contactPhone: 'Teléfono',
    contactInterest: '¿Qué te interesa?',
    interestOptions: ['📋 Evaluación', 'Full-Time', 'Part-Time', 'High School Performance', '🏕️ Campamento', 'Otro'],
    contactMsg: 'Mensaje (Opcional)',
    contactSend: '📤 Enviar Mensaje',
    contactSent: '✅ ¡Mensaje Enviado!',
    contactLocation: '📍 Ubicación',
    contactLocationVal: '5901 W Linebaugh Ave, Tampa, FL 33624',
    contactPhoneLabel: '📞 Teléfono',
    contactPhoneVal: '+1 (813) 555-AB4',
    contactEmailLabel: '✉️ Email',
    contactEmailVal: 'admin@ab4academytampa.com',
    contactEmailFinance: 'finance@ab4academytampa.com',
    contactEmailParents: 'parents@ab4academytampa.com',
    contactHours: '🕐 Horario',
    contactHoursVal: 'Lun - Vie: 8AM - 3PM',
    // Team
    teamTag: '👥 Nuestro Equipo',
    teamTitle: 'Conoce a Nuestro Staff',
    teamSub: 'Profesionales con experiencia en las ligas mayores comprometidos con el desarrollo de tu atleta.',
    teamFounder: '🏆 Fundador & CEO',
    teamFounderDesc: 'Ex-Jugador de Béisbol Profesional MLB',
    teamOps: '📋 Director de Operaciones',
    teamOpsDesc: 'Ex-Jugador de Béisbol Profesional',
    teamGeneral: '🎯 Coordinador General',
    teamCatching: '🧤 Instructor de Catching',
    teamPitching: '⚾ Pitching Coach',
    teamInfield: '🏟️ Infield Coach',
    teamUtility: '🔄 Utility Coach',
    teamEducation: '📚 Tutoría Educativa',
    // Founder Bio
    founderBioTag: 'Trayectoria Profesional',
    founderBioTitle: 'Andrés Eloy Blanco',
    founderBioRole: 'Founder & Director | Former MLB Player',
    founderBioBorn: 'Nacido: 11 de abril de 1984 | Venezuela',
    founderBioParagraphs: [
      'Nativo de Venezuela, Andrés Eloy Blanco construyó una destacada trayectoria en el béisbol profesional, disputando 10 temporadas en Major League Baseball (MLB) con organizaciones como Kansas City Royals, Chicago Cubs, Texas Rangers y Philadelphia Phillies.',
      'Reconocido por su versatilidad como infielder, sólidos fundamentos defensivos y profundo conocimiento del juego, Andrés ha dedicado gran parte de su vida al béisbol y a la formación de nuevas generaciones de atletas.',
      'Su compromiso con el desarrollo de jugadores comenzó en Venezuela, donde fundó y dirigió AB4 Academy durante siete años, formando jóvenes talentos que continuaron avanzando en sus carreras y de los cuales varios se encuentran actualmente dentro del béisbol profesional.',
      'Hoy, como Founder & Director de AB4 Academy en Estados Unidos, continúa compartiendo la experiencia adquirida a lo largo de su carrera, con una visión que trasciende el terreno de juego. Su enfoque está orientado a formar atletas con disciplina, carácter, responsabilidad, respeto y compromiso, entendiendo que el verdadero desarrollo de un jugador también implica prepararlo para asumir con madurez las oportunidades, los retos y las responsabilidades que encontrará dentro y fuera del béisbol.',
    ],
    founderBioTeams: 'Kansas City Royals · Chicago Cubs · Texas Rangers · Philadelphia Phillies',
    founderBioClosing: 'Developing Athletes. Building Character. Pursuing Excellence.',
    // Alejandro Bio
    alejandroBioTag: 'Trayectoria Profesional',
    alejandroBioTitle: 'Alejandro Fernández',
    alejandroBioParagraphs: [
      'Alejandro Fernández es un exjugador profesional de béisbol venezolano, con experiencia dentro de la organización de los New York Yankees y una trayectoria posteriormente dedicada a la formación y desarrollo de jóvenes atletas.',
      'Durante su carrera como jugador se desempeñó principalmente como catcher, una de las posiciones de mayor responsabilidad dentro del terreno de juego. Su desarrollo dentro del béisbol profesional le permitió avanzar dentro del sistema de ligas menores de los Yankees, alcanzando experiencia a nivel Triple-A.',
      'Además de su recorrido dentro del béisbol organizado de los Estados Unidos, Fernández tuvo experiencia en el béisbol profesional venezolano, formando parte de los Tigres de Aragua.',
      'La posición de catcher requiere liderazgo, conocimiento profundo del juego, capacidad para dirigir el cuerpo de lanzadores, lectura de situaciones ofensivas y defensivas, comunicación y disciplina. Esa experiencia se convirtió posteriormente en una de las principales fortalezas de Alejandro como entrenador.',
      'Después de finalizar su etapa como jugador profesional, Fernández continuó vinculado al béisbol como Professional Baseball Coach, enfocándose especialmente en el desarrollo de catchers y hitters, así como en la preparación técnica y mental de jóvenes jugadores.',
      'A lo largo de los años ha trabajado en Tampa desarrollando atletas de diferentes edades y niveles, utilizando la experiencia adquirida dentro del béisbol profesional para enseñar fundamentos, mecánica, disciplina, preparación y comprensión del juego.',
      'Actualmente, Alejandro forma parte de la dirección y estructura deportiva de AB4 Academy, donde su experiencia como catcher profesional y entrenador complementa la filosofía de desarrollo integral del programa.',
      'Su enfoque no se limita únicamente al desarrollo de habilidades físicas. Busca que los jugadores comprendan el juego, desarrollen disciplina, responsabilidad, liderazgo y una mentalidad competitiva que pueda prepararlos para niveles superiores de béisbol.',
      'Dentro de AB4 Academy, su experiencia representa uno de los pilares del área de catching, hitting y player development, contribuyendo a crear un ambiente de entrenamiento estructurado y basado en experiencia real dentro del béisbol profesional.',
    ],
    alejandroBioHighlights: [
      { icon: '⚾', label: 'Catcher Profesional' },
      { icon: '🏟️', label: 'New York Yankees (MiLB)' },
      { icon: '🏆', label: 'Triple-A Experience' },
      { icon: '🇻🇪', label: 'Tigres de Aragua' },
    ],
    alejandroBioClosing: 'Professional Experience. Player Development. Leadership. Discipline.',
    // Footer
    footerDesc: '⚾ Programa de desarrollo de béisbol juvenil de élite en Tampa, Florida. Desarrollando atletas y líderes de carácter.',
    footerPrograms: '⚾ Programas',
    footerCompany: '🏢 Empresa',
    footerLegal: '📜 Legal',
    footerCompanyLinks: ['👥 Quiénes Somos', '📅 Eventos', '⚾ Programas', '📞 Contacto'],
    footerLegalLinks: ['🔒 Política de Privacidad', '📋 Términos y Condiciones'],
    footerCopy: '© 2026 AB4 Academy. Todos los derechos reservados.',
  },
  en: {
    nav: ['Home', 'Who We Are', 'Programs', 'Events', 'Contact'],
    heroTag: '⚾ Elite Youth Baseball · Tampa, FL',
    heroTitle1: 'Train.',
    heroTitle2: 'Develop.',
    heroTitle3: 'Compete.',
    heroSub: 'A complete baseball development program built to prepare student-athletes for the next level.',
    heroCta1: '🏟️ Explore Our Programs',
    heroCta2: '📞 Contact Us',
    stat1Num: '200+', stat1Label: '⚾ Active Athletes',
    stat2Num: 'Tampa', stat2Label: '🌴 Florida',
    stat3Num: 'Elite', stat3Label: '🏆 Training',
    // About
    aboutTag: '⚾ Who We Are',
    aboutTitle: 'More Than Baseball.',
    aboutP1: 'AB4 Academy is a development program built around the student-athlete.',
    aboutP2: 'We provide an environment where baseball, education, structure, and personal growth work together to prepare each athlete for what comes next.',
    // Mission & Vision
    missionTag: '🎯 Our Mission',
    missionTitle: '🎯 Mission',
    missionText: 'To develop athletes with purpose — providing high-level training, academic support, guidance, and exposure while preparing them to pursue college opportunities and succeed beyond the game.',
    visionTitle: '👁️ Vision',
    visionText: 'To create a pathway where talent meets opportunity — building a program recognized for developing athletes, opening doors to the next level, and creating opportunities that extend beyond baseball.',
    // Why AB4
    whyTag: '💪 Why AB4?',
    whyTitle: 'Built by Experience. Focused on the Future.',
    whyCards: [
      { title: '🏆 Professional-Level Coaching', desc: 'Learn from coaches with professional playing experience.' },
      { title: '📈 Complete Development', desc: 'Athlete. Student. Person.' },
      { title: '🎓 College Pathway', desc: 'Preparation. Exposure. Opportunity.' },
      { title: '🌟 Beyond Baseball', desc: 'Discipline. Character. Future.' },
    ],
    // Programs
    progTag: '⚾ Programs',
    progTitle: 'AB4 Homeschool Baseball Program',
    progSub: 'Middle & High School Student-Athletes',
    progPrice: 'Starting at $880/month',
    progScheduleLabel: 'Schedule',
    progSchedule: 'Monday – Friday',
    progScheduleTime: '8:00 AM – 2:00 PM',
    progWhatsIncluded: "⚾ WHAT'S INCLUDED",
    progFeatures: [
      '⚾ Professional Baseball Training',
      '🏏 Batting Development',
      '🧤 Fielding Development',
      '🎯 Position-Specific Training',
      '💪 Strength & Conditioning',
      '🏃 Athletic Performance Development',
      '📊 Athlete Evaluations & Progress Tracking',
      '📚 Structured Academic Time',
      '📖 Academic Support Available',
      '👨‍🏫 Professional Coaching Staff – MLB Experience',
      '🔄 Flexible Program Options',
      '✅ Step Up Provider',
    ],
    progMoreInfo: 'MORE INFORMATION',
    progMoreInfoText: 'Interested in learning more about the program?',
    progMoreInfoSub: 'Complete our Request Information Form or contact us directly for program details, availability, tuition options, and enrollment information.',
    progFormTitle: 'Request Information',
    progFormName: 'Parent / Guardian Name',
    progFormEmail: 'Email',
    progFormPhone: 'Phone',
    progFormStudent: "Student's Name",
    progFormGrade: 'Grade Level',
    progFormInterest: 'Program Interest',
    progFormInterestOptions: ['Full-Time', 'Part-Time', 'Flex Program'],
    progFormMsg: 'Questions or Comments (Optional)',
    progFormSend: 'Request Information',
    progFormSent: 'Information Requested!',
    progCta: 'Request Program Information',
    progDisclaimer: 'AB4 Academy is an athletic development program and is not a school. Student-athletes maintain enrollment with their chosen educational provider.',
    // HS Performance Program
    hsProgTag: '⚾ Programs',
    hsProgTitle: 'High School Performance Program',
    hsProgSub: 'Juniors & Seniors',
    hsProgPrice: 'Starting at $400/month',
    hsProgScheduleLabel: 'Schedule',
    hsProgSchedule: 'Tuesday – Thursday',
    hsProgScheduleTime: '1:00 PM – 3:00 PM',
    hsProgOptionsLabel: 'Training Options',
    hsProgOptions: ['2–3 Days Per Week', '2 Hours of Training Per Session'],
    hsProgWhatsIncluded: "⚾ WHAT'S INCLUDED",
    hsProgFeatures: [
      '🏏 Batting Development',
      '🧤 Fielding Development',
      '🔄 Skill Development & Repetition',
      '🎯 Position-Specific Defensive Work',
      '💪 Athletic Performance Development',
      '👨‍🏫 Professional Coaching Staff – MLB Experience',
      '🏋️ Performance-Focused Training Environment',
    ],
    hsProgMoreInfo: 'MORE INFORMATION',
    hsProgMoreInfoText: 'Interested in learning more about the program?',
    hsProgMoreInfoSub: 'Complete our Request Information Form or contact us directly for program details, availability, training options, and enrollment information.',
    hsProgFormTitle: 'Request Information',
    hsProgFormName: 'Parent / Guardian Name',
    hsProgFormEmail: 'Email',
    hsProgFormPhone: 'Phone',
    hsProgFormStudent: "Student's Name",
    hsProgFormGrade: 'Grade Level',
    hsProgFormMsg: 'Questions or Comments (Optional)',
    hsProgFormSend: 'Request Information',
    hsProgFormSent: 'Information Requested!',
    // Events
    eventTag: '📅 Events',
    eventTitle: 'Baseball Opportunities Throughout the Year.',
    events: [
      { name: '🌸 Spring Break Camp', month: 'March' },
      { name: '☀️ Summer Camp', month: 'June – July' },
      { name: '⚾ Summer Team', month: 'High School Only' },
      { name: '🦃 Thanksgiving Camp', month: 'November' },
      { name: '❄️ Winter Camp', month: 'December' },
    ],
    eventRegTitle: '📋 Upcoming Registrations',
    eventReg1: '🦃 Thanksgiving Camp',
    eventReg2: '❄️ Winter Camp',
    eventRegCta: '📝 Register Now',
    // CTA
    ctaTitle: '⚾ Take the First Step.',
    ctaSub: 'Join AB4 Academy and develop your full potential in baseball.',
    ctaCta: '📞 Contact Us Today',
    // Contact
    contactTag: '📞 Contact',
    contactTitle: 'Let\'s Talk',
    contactName: 'Full Name',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    contactInterest: 'What are you interested in?',
    interestOptions: ['📋 Evaluation', 'Full-Time', 'Part-Time', 'High School Performance', '🏕️ Camp', 'Other'],
    contactMsg: 'Message (Optional)',
    contactSend: '📤 Send Message',
    contactSent: '✅ Message Sent!',
    contactLocation: '📍 Location',
    contactLocationVal: '5901 W Linebaugh Ave, Tampa, FL 33624',
    contactPhoneLabel: '📞 Phone',
    contactPhoneVal: '+1 (813) 555-AB4',
    contactEmailLabel: '✉️ Email',
    contactEmailVal: 'admin@ab4academytampa.com',
    contactEmailFinance: 'finance@ab4academytampa.com',
    contactEmailParents: 'parents@ab4academytampa.com',
    contactHours: '🕐 Hours',
    contactHoursVal: 'Mon - Fri: 8AM - 3PM',
    // Team
    teamTag: '👥 Our Team',
    teamTitle: 'Meet Our Staff',
    teamSub: 'Professionals with major league experience committed to developing your athlete.',
    teamFounder: '🏆 Founder & CEO',
    teamFounderDesc: 'Former MLB Professional Baseball Player',
    teamOps: '📋 Director of Operations',
    teamOpsDesc: 'Former Professional Baseball Player',
    teamGeneral: '🎯 General Coordinator',
    teamCatching: '🧤 Catching Instructor',
    teamPitching: '⚾ Pitching Coach',
    teamInfield: '🏟️ Infield Coach',
    teamUtility: '🔄 Utility Coach',
    teamEducation: '📚 Educational Tutoring',
    // Founder Bio
    founderBioTag: 'Professional Career',
    founderBioTitle: 'Andrés Eloy Blanco',
    founderBioRole: 'Founder & Director | Former MLB Player',
    founderBioBorn: 'Born: April 11, 1984 | Venezuela',
    founderBioParagraphs: [
      'A native of Venezuela, Andrés Eloy Blanco built a distinguished career in professional baseball, playing 10 seasons in Major League Baseball (MLB) with organizations such as the Kansas City Royals, Chicago Cubs, Texas Rangers, and Philadelphia Phillies.',
      'Recognized for his versatility as an infielder, solid defensive fundamentals, and deep knowledge of the game, Andrés has dedicated much of his life to baseball and to developing new generations of athletes.',
      'His commitment to player development began in Venezuela, where he founded and directed AB4 Academy for seven years, training young talents who continued to advance in their careers, with several currently playing professional baseball.',
      'Today, as Founder & Director of AB4 Academy in the United States, he continues to share the experience gained throughout his career, with a vision that transcends the field. His approach is focused on developing athletes with discipline, character, responsibility, respect, and commitment, understanding that true player development also involves preparing them to maturely handle the opportunities, challenges, and responsibilities they will encounter both on and off the field.',
    ],
    founderBioTeams: 'Kansas City Royals · Chicago Cubs · Texas Rangers · Philadelphia Phillies',
    founderBioClosing: 'Developing Athletes. Building Character. Pursuing Excellence.',
    // Alejandro Bio
    alejandroBioTag: 'Professional Career',
    alejandroBioTitle: 'Alejandro Fernández',
    alejandroBioParagraphs: [
      'Alejandro Fernández is a former Venezuelan professional baseball player with experience within the New York Yankees organization and a career subsequently dedicated to training and developing young athletes.',
      'During his playing career, he primarily served as catcher, one of the most responsible positions on the field. His development in professional baseball allowed him to advance within the Yankees\' minor league system, reaching Triple-A experience.',
      'In addition to his journey through organized baseball in the United States, Fernández had experience in Venezuelan professional baseball, playing for the Tigres de Aragua.',
      'The catcher position requires leadership, deep knowledge of the game, ability to direct the pitching staff, reading offensive and defensive situations, communication, and discipline. This experience later became one of Alejandro\'s greatest strengths as a coach.',
      'After finishing his career as a professional player, Fernández continued his involvement in baseball as a Professional Baseball Coach, focusing especially on the development of catchers and hitters, as well as the technical and mental preparation of young players.',
      'Over the years, he has worked in Tampa developing athletes of different ages and levels, using the experience gained in professional baseball to teach fundamentals, mechanics, discipline, preparation, and understanding of the game.',
      'Currently, Alejandro is part of the leadership and sports structure of AB4 Academy, where his experience as a professional catcher and coach complements the program\'s holistic development philosophy.',
      'His approach is not limited solely to the development of physical skills. He seeks for players to understand the game, develop discipline, responsibility, leadership, and a competitive mindset that can prepare them for higher levels of baseball.',
      'Within AB4 Academy, his experience represents one of the pillars in the areas of catching, hitting, and player development, contributing to creating a structured training environment based on real experience in professional baseball.',
    ],
    alejandroBioHighlights: [
      { icon: '⚾', label: 'Professional Catcher' },
      { icon: '🏟️', label: 'New York Yankees (MiLB)' },
      { icon: '🏆', label: 'Triple-A Experience' },
      { icon: '🇻🇪', label: 'Tigres de Aragua' },
    ],
    alejandroBioClosing: 'Professional Experience. Player Development. Leadership. Discipline.',
    // Footer
    footerDesc: '⚾ Elite youth baseball development program in Tampa, Florida. Developing elite athletes and leaders of character.',
    footerPrograms: '⚾ Programs',
    footerCompany: '🏢 Company',
    footerLegal: '📜 Legal',
    footerCompanyLinks: ['👥 Who We Are', '📅 Events', '⚾ Programs', '📞 Contact'],
    footerLegalLinks: ['🔒 Privacy Policy', '📋 Terms & Conditions'],
    footerCopy: '© 2026 AB4 Academy. All rights reserved.',
  },
};

// ============ ANIMATION WRAPPER ============
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============ NAVBAR ============
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lang = useLang();
  const setLang = useSetLang();
  const content = t[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = content.nav.map((label, i) => ({
    href: ['#inicio', '#sobre-mi', '#programas', '#eventos', '#contacto'][i],
    label,
  }));

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#inicio" className="flex items-center">
              <img
                src="/logo1.png"
                alt="AB4 Academy"
                className={`h-12 w-auto transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`}
              />
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 line-animate ${
                    scrolled ? 'text-brand-black hover:text-brand-red' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className={`text-xs font-bold tracking-widest border px-3 py-1.5 rounded-full transition-all ${
                  scrolled
                    ? 'border-brand-black/20 text-brand-black hover:bg-brand-black hover:text-white'
                    : 'border-white/30 text-white hover:bg-white hover:text-brand-black'
                }`}
              >
                {lang === 'es' ? 'ES' : 'EN'}
              </button>

              <a
                href="#contacto"
                className="bg-brand-red text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-brand-red-dark transition-all duration-300 hover:shadow-lg hover:shadow-brand-red/30 hover:-translate-y-0.5"
              >
                {lang === 'es' ? 'Reservar Clase' : 'Book a Class'}
              </a>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className={`text-xs font-bold tracking-widest border px-2.5 py-1 rounded-full ${
                  scrolled ? 'border-brand-black/20 text-brand-black' : 'border-white/30 text-white'
                }`}
              >
                {lang === 'es' ? 'ES' : 'EN'}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`flex flex-col gap-1.5 p-2 ${scrolled ? 'text-brand-black' : 'text-white'}`}
                aria-label="Menu"
              >
                <motion.span animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-current" />
                <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-current" />
                <motion.span animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-current" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-brand-black flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-3xl font-bold text-white hover:text-brand-red transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 bg-brand-red text-white px-8 py-4 rounded-full text-lg font-semibold"
            >
              {lang === 'es' ? 'Reservar Clase' : 'Book a Class'}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============ HERO ============
function Hero() {
  const lang = useLang();
  const c = t[lang];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-brand-black">
      {/* Background baseball image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1920&q=80" 
          alt="Baseball background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/70" />
      </div>

      {/* Background diagonal shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-br from-brand-red/20 via-brand-red/10 to-transparent transform skew-x-[-12deg] translate-x-[20%]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-gradient-to-tr from-brand-red/10 to-transparent transform skew-x-[12deg] -translate-x-[10%]" />
      </div>

      {/* Floating baseball emojis */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[15%] text-4xl sm:text-6xl opacity-20 hidden lg:block"
      >
        ⚾
      </motion.div>
      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] left-[10%] text-3xl sm:text-5xl opacity-15 hidden lg:block"
      >
        🏟️
      </motion.div>
      <motion.div 
        animate={{ y: [-15, 15, -15], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[5%] text-2xl sm:text-4xl opacity-10 hidden lg:block"
      >
        🧤
      </motion.div>

      {/* Decorative dots pattern */}
      <div className="absolute top-20 left-4 sm:left-10 grid grid-cols-4 gap-2 sm:gap-3 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-red" />
        ))}
      </div>
      <div className="absolute bottom-32 right-4 sm:right-10 grid grid-cols-4 gap-2 sm:gap-3 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
        ))}
      </div>

      {/* Baseball stitching decorative element */}
      <div className="absolute top-1/2 left-5 w-20 h-40 opacity-10 hidden xl:block">
        <svg viewBox="0 0 50 100" className="w-full h-full">
          <path d="M25 5 C35 25, 40 50, 25 95" stroke="#E63B2E" strokeWidth="2" fill="none" strokeDasharray="4,4"/>
          <path d="M25 5 C15 25, 10 50, 25 95" stroke="#E63B2E" strokeWidth="2" fill="none" strokeDasharray="4,4"/>
        </svg>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/3 right-[30%] w-10 h-10 sm:w-16 sm:h-16 border border-brand-red/30 rounded-full hidden sm:block" />
      <div className="absolute top-1/4 right-[25%] w-5 h-5 sm:w-8 sm:h-8 border border-white/20 rounded-full hidden sm:block" />
      <div className="absolute bottom-1/4 left-[15%] w-8 h-8 sm:w-12 sm:h-12 border border-brand-red/20 rounded-full hidden sm:block" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center min-h-screen">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="pt-20 sm:pt-24 lg:pt-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8"
            >
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              <span className="text-white/70 text-xs sm:text-sm font-medium tracking-wide">{c.heroTag}</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black text-white leading-[0.95] mb-6 sm:mb-8 tracking-tight">
              {c.heroTitle1}<br />
              {c.heroTitle2}<br />
              <span className="text-brand-red">{c.heroTitle3}</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/50 max-w-lg mb-8 sm:mb-10 leading-relaxed font-light">
              {c.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16">
              <a
                href="#programas"
                className="group bg-brand-red text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold inline-flex items-center justify-center gap-3 hover:bg-brand-red-dark transition-all duration-300 hover:shadow-2xl hover:shadow-brand-red/30 hover:-translate-y-0.5 text-sm sm:text-base"
              >
                {c.heroCta1}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contacto"
                className="border border-white/20 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-white/5 transition-all duration-300 text-center text-sm sm:text-base"
              >
                {c.heroCta2}
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 sm:gap-8 lg:gap-12">
              <div className="text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">{c.stat1Num}</div>
                <div className="text-xs sm:text-sm text-white/40 mt-1 font-medium">{c.stat1Label}</div>
              </div>
              <div className="w-px h-10 sm:h-14 bg-white/10" />
              <div className="text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">{c.stat2Num}</div>
                <div className="text-xs sm:text-sm text-white/40 mt-1 font-medium">{c.stat2Label}</div>
              </div>
              <div className="w-px h-10 sm:h-14 bg-white/10" />
              <div className="text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">{c.stat3Num}</div>
                <div className="text-xs sm:text-sm text-white/40 mt-1 font-medium">{c.stat3Label}</div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Logo Card */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Background card with skew */}
            <div className="absolute w-[420px] h-[480px] bg-white/5 rounded-[2rem] transform rotate-3" />
            <div className="absolute w-[420px] h-[480px] bg-brand-red/10 rounded-[2rem] transform -rotate-2 translate-x-4 translate-y-4" />

            {/* Main card */}
            <div className="relative w-[400px] h-[460px] bg-gradient-to-br from-brand-red to-brand-red-dark rounded-[2rem] flex items-center justify-center overflow-hidden shadow-2xl shadow-brand-red/20">
              {/* Diagonal stripe */}
              <div className="absolute top-0 right-0 w-full h-full">
                <div className="absolute top-0 right-0 w-[60%] h-full bg-white/5 transform skew-x-[-15deg] translate-x-[30%]" />
              </div>

              {/* Content */}
              <div className="relative text-center text-white z-10">
                <div className="text-[8rem] lg:text-[9rem] font-black leading-none tracking-tighter">
                  AB<span className="text-white/70">4</span>
                </div>
                <div className="text-xl lg:text-2xl font-light tracking-[0.4em] uppercase -mt-2">
                  Academy
                </div>
                <div className="mt-8 flex justify-center gap-3">
                  <div className="w-14 h-1 bg-white/30 rounded-full" />
                  <div className="w-14 h-1 bg-white rounded-full" />
                  <div className="w-14 h-1 bg-white/30 rounded-full" />
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-brand-red rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ BASEBALL GALLERY ============
function BaseballGallery() {
  const lang = useLang();
  
  const galleryTitle = lang === 'es' ? '⚾ Nuestra Pasión por el Béisbol' : '⚾ Our Passion for Baseball';
  const gallerySub = lang === 'es' ? 'Momentos que definen nuestro programa' : 'Moments that define our program';
  
  const baseballImages = [
    {
      src: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80',
      alt: 'Baseball batter hitting',
      caption: lang === 'es' ? 'Entrenamiento de Bateo' : 'Batting Practice'
    },
    {
      src: 'https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=800&q=80',
      alt: 'Baseball pitcher throwing',
      caption: lang === 'es' ? 'Desarrollo de Pitching' : 'Pitching Development'
    },
    {
      src: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800&q=80',
      alt: 'Baseball field aerial view',
      caption: lang === 'es' ? 'Nuestras Instalaciones' : 'Our Facilities'
    },
    {
      src: 'https://images.unsplash.com/photo-1578432155230-6b5e191d4d8c?w=800&q=80',
      alt: 'Baseball glove and ball',
      caption: lang === 'es' ? 'Fundamentos del Juego' : 'Game Fundamentals'
    },
    {
      src: 'https://images.unsplash.com/photo-1565060488-1cfdd0cdcdf1?w=800&q=80',
      alt: 'Baseball team celebrating',
      caption: lang === 'es' ? 'Trabajo en Equipo' : 'Teamwork'
    },
    {
      src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
      alt: 'Baseball player running bases',
      caption: lang === 'es' ? 'Velocidad y Agilidad' : 'Speed & Agility'
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-brand-black to-brand-gray relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
      
      {/* Decorative baseball stitching */}
      <div className="absolute top-10 left-10 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-brand-red">
          <path d="M50 10 C60 30, 70 50, 50 90" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
          <path d="M50 10 C40 30, 30 50, 50 90" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 w-24 h-24 opacity-10 rotate-45">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
          <path d="M50 10 C60 30, 70 50, 50 90" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
          <path d="M50 10 C40 30, 30 50, 50 90" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">{galleryTitle}</h2>
          <p className="text-base sm:text-lg text-white/50">{gallerySub}</p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {baseballImages.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-square">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                  <span className="text-white font-semibold text-sm sm:text-base">{img.caption}</span>
                </div>
                {/* Baseball corner accent */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-brand-red/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs">⚾</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Animated baseball GIF */}
        <AnimatedSection className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 sm:px-8 py-3 sm:py-4">
            <img 
              src="https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif" 
              alt="Baseball animation" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
            />
            <span className="text-white font-medium text-sm sm:text-base">
              {lang === 'es' ? '¡Únete a la familia AB4!' : 'Join the AB4 Family!'}
            </span>
            <img 
              src="https://media.giphy.com/media/l0HlNQ03J5JR3V2sE/giphy.gif" 
              alt="Baseball hit animation" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ ABOUT ============
function About() {
  const lang = useLang();
  const c = t[lang];
  const [selectedCoach, setSelectedCoach] = useState<number>(0);

  const allStaff = [
    {
      name: 'Andrés Eloy Blanco',
      role: c.teamFounder,
      desc: c.teamFounderDesc,
      photo: '/A_Blanco.JPG',
      bioRole: c.founderBioRole,
      bioBorn: c.founderBioBorn,
      bio: c.founderBioParagraphs,
      teams: c.founderBioTeams,
      closing: c.founderBioClosing,
    },
    {
      name: 'Alejandro Fernández',
      role: c.teamOps,
      desc: c.teamOpsDesc,
      photo: '/AleFernandez.webp',
      bio: c.alejandroBioParagraphs,
      highlights: c.alejandroBioHighlights,
      closing: c.alejandroBioClosing,
    },
    {
      name: 'Andrés Blanco',
      role: c.teamGeneral,
      photo: '/staff-andres-b.jpg',
    },
    {
      name: 'Rafael Lazo',
      role: c.teamPitching,
      photo: '/staff-rafael.jpg',
    },
    {
      name: 'Warner Dipre',
      role: c.teamInfield,
      photo: '/staff-warner.jpg',
    },
    {
      name: 'Juan José Muñoz',
      role: c.teamUtility,
      photo: '/staff-juan.jpg',
    },
    {
      name: 'Lic. Lilian Ibáñez Grico',
      role: c.teamEducation,
      photo: '/staff-lilian.jpg',
    },
  ];

  return (
    <section id="sobre-mi" className="bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />

      {/* About Content */}
      <div className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 text-brand-red mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">{c.aboutTag}</span>
              <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-brand-black mb-6 sm:mb-8">{c.aboutTitle}</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">{c.aboutP1}</p>
            <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">{c.aboutP2}</p>
          </AnimatedSection>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
            <AnimatedSection delay={0.1}>
              <div className="group h-full">
                <div className="h-full p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 hover:border-brand-red/30 transition-all duration-500 hover-lift bg-white">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red mb-5 sm:mb-6 lg:mb-8 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-black mb-3 sm:mb-4">{c.missionTitle}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{c.missionText}</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="group h-full">
                <div className="h-full p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 hover:border-brand-red/30 transition-all duration-500 hover-lift bg-white">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red mb-5 sm:mb-6 lg:mb-8 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-black mb-3 sm:mb-4">{c.visionTitle}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{c.visionText}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Team Section - Split Panel Layout */}
      <div className="bg-brand-black py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <AnimatedSection className="mb-12 sm:mb-16 lg:mb-20">
            <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-brand-red uppercase">{c.teamTag}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-2 sm:mb-3">{c.teamTitle}</h2>
            <p className="text-base sm:text-lg text-white/40 text-center max-w-xl mx-auto font-light">{c.teamSub}</p>
          </AnimatedSection>

          {/* Split Panel: List + Profile */}
          <div className="grid lg:grid-cols-[380px_1fr] gap-6 sm:gap-8">
            {/* Left: Staff List */}
            <div className="space-y-2">
              {allStaff.map((coach, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCoach(i)}
                  className={`group w-full text-left rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-500 flex items-center gap-4 ${
                    selectedCoach === i
                      ? 'bg-white shadow-xl shadow-brand-red/10'
                      : 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Photo */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 overflow-hidden ${
                    selectedCoach === i
                      ? 'bg-brand-red/10'
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    {coach.photo ? (
                      <img src={coach.photo} alt={coach.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <svg className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-500 ${
                        selectedCoach === i ? 'text-brand-red' : 'text-white/30 group-hover:text-white/50'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase block mb-0.5 transition-colors duration-300 ${
                      selectedCoach === i ? 'text-brand-red' : 'text-white/30 group-hover:text-white/50'
                    }`}>
                      {coach.role}
                    </span>
                    <h4 className={`text-sm sm:text-base font-bold truncate transition-colors duration-300 ${
                      selectedCoach === i ? 'text-brand-black' : 'text-white group-hover:text-white/90'
                    }`}>
                      {coach.name}
                    </h4>
                  </div>
                  {/* Arrow */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    selectedCoach === i
                      ? 'bg-brand-red text-white'
                      : 'bg-white/5 text-white/30 group-hover:bg-white/10 group-hover:text-white/50'
                  }`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Profile Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCoach}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden min-h-[400px] sm:min-h-[500px]"
              >
                <div className="grid lg:grid-cols-2 h-full">
                  {/* Photo Side */}
                  <div className="relative h-64 sm:h-80 lg:h-full bg-gradient-to-br from-gray-100 to-gray-50 min-h-[250px]">
                    {allStaff[selectedCoach].photo ? (
                      <img 
                        src={allStaff[selectedCoach].photo} 
                        alt={allStaff[selectedCoach].name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-24 h-24 sm:w-32 sm:h-32 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info Side */}
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] text-brand-red uppercase bg-brand-red/10 px-3 py-1 rounded-full mb-4 sm:mb-6 self-start">
                      {allStaff[selectedCoach].role}
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-black mb-4 sm:mb-6 tracking-tight">
                      {allStaff[selectedCoach].name}
                    </h3>

                    {/* Role & Born */}
                    {allStaff[selectedCoach].bioRole && (
                      <div className="mb-4 sm:mb-6">
                        <p className="text-sm sm:text-base font-semibold text-brand-black">{allStaff[selectedCoach].bioRole}</p>
                        {allStaff[selectedCoach].bioBorn && (
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">{allStaff[selectedCoach].bioBorn}</p>
                        )}
                      </div>
                    )}

                    {/* Highlights if available */}
                    {allStaff[selectedCoach].highlights && (
                      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                        {allStaff[selectedCoach].highlights.map((h: { icon: string; label: string }, i: number) => (
                          <span key={i} className="inline-flex items-center gap-1.5 bg-brand-red/5 border border-brand-red/10 text-brand-black px-3 py-1.5 rounded-full text-xs font-medium">
                            <span>{h.icon}</span>
                            {h.label}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bio */}
                    {allStaff[selectedCoach].bio ? (
                      <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-64 overflow-y-auto pr-2">
                        {allStaff[selectedCoach].bio.slice(0, 3).map((p: string, i: number) => (
                          <p key={i} className="text-gray-600 leading-relaxed text-sm">{p}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm italic">
                        {lang === 'es' ? 'Próximamente más información.' : 'More information coming soon.'}
                      </p>
                    )}

                    {/* Teams if available */}
                    {allStaff[selectedCoach].teams && (
                      <p className="text-xs text-gray-400 mt-4 sm:mt-6">{allStaff[selectedCoach].teams}</p>
                    )}

                    {/* Closing */}
                    {allStaff[selectedCoach].closing && (
                      <p className="text-brand-red font-bold text-sm italic mt-4 sm:mt-6">{allStaff[selectedCoach].closing}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ WHY AB4 ============
function WhyAb4() {
  const lang = useLang();
  const c = t[lang];

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-brand-black relative overflow-hidden noise-overlay">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-brand-red/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-brand-red mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">{c.whyTag}</span>
            <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{c.whyTitle}</h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {c.whyCards.map((card, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="group p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-red/50 transition-all duration-500 hover:bg-white/10 h-full text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto rounded-xl sm:rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red mb-4 sm:mb-6 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 text-2xl sm:text-3xl">
                  {['⚾', '🏆', '🎓', '🌟'][i]}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{card.title}</h3>
                <p className="text-white/60 leading-relaxed text-xs sm:text-sm">{card.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PHONE COUNTRY CODES ============
const PHONE_COUNTRIES = [
  { code: 'US', flag: '🇺🇸', dial: '+1', name: 'United States' },
  { code: 'CA', flag: '🇨🇦', dial: '+1', name: 'Canada' },
  { code: 'VE', flag: '🇻🇪', dial: '+58', name: 'Venezuela' },
  { code: 'DO', flag: '🇩🇴', dial: '+1', name: 'Dominican Republic' },
  { code: 'PR', flag: '🇵🇷', dial: '+1', name: 'Puerto Rico' },
  { code: 'CU', flag: '🇨🇺', dial: '+53', name: 'Cuba' },
  { code: 'CO', flag: '🇨🇴', dial: '+57', name: 'Colombia' },
  { code: 'MX', flag: '🇲🇽', dial: '+52', name: 'Mexico' },
  { code: 'JM', flag: '🇯🇲', dial: '+1', name: 'Jamaica' },
  { code: 'HT', flag: '🇭🇹', dial: '+509', name: 'Haiti' },
  { code: 'PA', flag: '🇵🇦', dial: '+507', name: 'Panama' },
  { code: 'NI', flag: '🇳🇮', dial: '+505', name: 'Nicaragua' },
  { code: 'HN', flag: '🇭🇳', dial: '+504', name: 'Honduras' },
  { code: 'GT', flag: '🇬🇹', dial: '+502', name: 'Guatemala' },
  { code: 'CR', flag: '🇨🇷', dial: '+506', name: 'Costa Rica' },
  { code: 'EC', flag: '🇪🇨', dial: '+593', name: 'Ecuador' },
  { code: 'PE', flag: '🇵🇪', dial: '+51', name: 'Peru' },
  { code: 'AR', flag: '🇦🇷', dial: '+54', name: 'Argentina' },
  { code: 'CL', flag: '🇨🇱', dial: '+56', name: 'Chile' },
  { code: 'BR', flag: '🇧🇷', dial: '+55', name: 'Brazil' },
  { code: 'ES', flag: '🇪🇸', dial: '+34', name: 'Spain' },
  { code: 'IT', flag: '🇮🇹', dial: '+39', name: 'Italy' },
];

// ============ PROGRAMS ============
function ProgramCard({ title, subtitle, price, schedule, scheduleTime, optionsLabel, options, featuresLabel, features }: {
  title: string; subtitle: string; price: string; schedule: string; scheduleTime: string;
  optionsLabel?: string; options?: string[]; featuresLabel: string; features: string[];
}) {
  return (
    <div className="bg-brand-black text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 h-full flex flex-col">
      <div className="mb-6 sm:mb-8">
        <span className="inline-block bg-brand-red text-white px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
          {price}
        </span>
        <div className="mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-wider mb-1">{schedule}</p>
          <p className="text-lg sm:text-xl font-black text-brand-red">{scheduleTime}</p>
        </div>
        {optionsLabel && options && (
          <div className="mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">{optionsLabel}</p>
            <div className="flex flex-wrap gap-2">
              {options.map((opt: string, i: number) => (
                <span key={i} className="inline-block bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs sm:text-sm">{opt}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white/50 mb-4 sm:mb-6">{featuresLabel}</h3>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-y-3">
          {features.map((feature: string, i: number) => (
            <div key={i} className="flex items-start gap-2.5">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm text-white/80">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgramForm({ formTitle, moreInfoText, formName, formEmail, formPhone, formStudent, formGrade, formMsg, formSend, formSent, gradeLabel }: {
  formTitle: string; moreInfoText: string; formName: string; formEmail: string; formPhone: string;
  formStudent: string; formGrade: string; formMsg: string; formSend: string; formSent: string;
  gradeLabel: string;
}) {
  const lang = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', phoneCode: 'US', phone: '', student: '', grade: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return lang === 'es' ? 'El nombre es requerido' : 'Name is required';
        if (value.trim().length < 2) return lang === 'es' ? 'Minimo 2 caracteres' : 'Minimum 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return lang === 'es' ? 'El email es requerido' : 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return lang === 'es' ? 'Email invalido' : 'Invalid email';
        return '';
      case 'phone':
        if (!value.trim()) return lang === 'es' ? 'El telefono es requerido' : 'Phone is required';
        if (!/^\d{7,15}$/.test(value.replace(/\D/g, ''))) return lang === 'es' ? 'Telefono invalido (7-15 digitos)' : 'Invalid phone (7-15 digits)';
        return '';
      case 'student':
        if (!value.trim()) return lang === 'es' ? 'El nombre del estudiante es requerido' : "Student's name is required";
        return '';
      case 'grade':
        if (!value) return lang === 'es' ? 'Selecciona un grado' : 'Select a grade';
        return '';
      default:
        return '';
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    let valid = true;
    ['name', 'email', 'phone', 'student', 'grade'].forEach((field) => {
      const err = validate(field, (formData as Record<string, string>)[field]);
      if (err) { newErrors[field] = err; valid = false; }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validate(field, (formData as Record<string, string>)[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validate(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, student: true, grade: true });
    if (!validateAll()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phoneCode: 'US', phone: '', student: '', grade: '', message: '' });
      setErrors({});
      setTouched({});
    }, 3000);
  };

  const inputBase = "w-full px-3 sm:px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all text-sm sm:text-base bg-white";
  const inputNormal = inputBase + " border-gray-200 focus:border-brand-red focus:ring-brand-red/20";
  const inputError = inputBase + " border-red-400 focus:border-red-500 focus:ring-red-200";

  return (
    <div className="bg-brand-gray-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 h-full flex flex-col">
      <h3 className="text-xl sm:text-2xl font-bold text-brand-black mb-2">{formTitle}</h3>
      <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">{moreInfoText}</p>
      <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 flex-grow flex flex-col">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">{formName} *</label>
          <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} onBlur={() => handleBlur('name')} className={errors.name && touched.name ? inputError : inputNormal} />
          {errors.name && touched.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">{formEmail} *</label>
          <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} onBlur={() => handleBlur('email')} placeholder="you@email.com" className={errors.email && touched.email ? inputError : inputNormal} />
          {errors.email && touched.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">{formPhone} *</label>
          <div className="flex gap-2">
            <select value={formData.phoneCode} onChange={(e) => handleChange('phoneCode', e.target.value)} className="w-[130px] sm:w-[150px] flex-shrink-0 px-2 sm:px-3 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all bg-white text-sm sm:text-base cursor-pointer">
              {PHONE_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.dial}</option>
              ))}
            </select>
            <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))} onBlur={() => handleBlur('phone')} placeholder="(XXX) XXX-XXXX" maxLength={15} className={"flex-grow " + (errors.phone && touched.phone ? inputError : inputNormal)} />
          </div>
          {errors.phone && touched.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">{formStudent} *</label>
          <input type="text" value={formData.student} onChange={(e) => handleChange('student', e.target.value)} onBlur={() => handleBlur('student')} className={errors.student && touched.student ? inputError : inputNormal} />
          {errors.student && touched.student && <p className="text-red-500 text-xs mt-1">{errors.student}</p>}
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">{formGrade} *</label>
          <select value={formData.grade} onChange={(e) => handleChange('grade', e.target.value)} onBlur={() => handleBlur('grade')} className={(errors.grade && touched.grade ? inputError : inputNormal) + " appearance-none"}>
            <option value="">{gradeLabel}</option>
            <option value="6">6th Grade</option>
            <option value="7">7th Grade</option>
            <option value="8">8th Grade</option>
            <option value="9">9th Grade</option>
            <option value="10">10th Grade</option>
            <option value="11">11th Grade</option>
            <option value="12">12th Grade</option>
          </select>
          {errors.grade && touched.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
        </div>
        <div className="flex-grow">
          <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">{formMsg}</label>
          <textarea value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} className={inputNormal + " resize-none"} rows={3} />
        </div>
        <button type="submit" className={"w-full py-3 sm:py-3.5 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base " + (submitted ? "bg-green-500 text-white" : "bg-brand-red text-white hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30")}>
          {submitted ? formSent : formSend}
        </button>
      </form>
    </div>
  );
}

function Programs() {
  const lang = useLang();
  const c = t[lang];

  return (
    <section id="programas" className="py-20 sm:py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-brand-red mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">{c.progTag}</span>
            <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-2 sm:mb-4">Our Programs</h2>
          <p className="text-base sm:text-lg text-gray-600">Training pathways designed for every level of the student-athlete.</p>
        </AnimatedSection>

        {/* Program 1: Homeschool */}
        <AnimatedSection className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-black">{c.progTitle}</h3>
            <p className="text-sm sm:text-base text-gray-500 mt-1">{c.progSub}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <ProgramCard
              title={c.progTitle} subtitle={c.progSub} price={c.progPrice}
              schedule={c.progSchedule} scheduleTime={c.progScheduleTime}
              featuresLabel={c.progWhatsIncluded} features={c.progFeatures}
            />
            <ProgramForm
              formTitle={c.progFormTitle} moreInfoText={c.progMoreInfoText}
              formName={c.progFormName} formEmail={c.progFormEmail} formPhone={c.progFormPhone}
              formStudent={c.progFormStudent} formGrade={c.progFormGrade}
              formMsg={c.progFormMsg} formSend={c.progFormSend} formSent={c.progFormSent}
              gradeLabel={lang === 'es' ? 'Selecciona' : 'Select'}
            />
          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12 sm:mb-16 lg:mb-20">
          <div className="flex-grow h-px bg-gray-200" />
          <div className="w-3 h-3 rounded-full bg-brand-red" />
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Program 2: HS Performance */}
        <AnimatedSection className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-black">{c.hsProgTitle}</h3>
            <p className="text-sm sm:text-base text-gray-500 mt-1">{c.hsProgSub}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <ProgramCard
              title={c.hsProgTitle} subtitle={c.hsProgSub} price={c.hsProgPrice}
              schedule={c.hsProgSchedule} scheduleTime={c.hsProgScheduleTime}
              optionsLabel={c.hsProgOptionsLabel} options={c.hsProgOptions}
              featuresLabel={c.hsProgWhatsIncluded} features={c.hsProgFeatures}
            />
            <ProgramForm
              formTitle={c.hsProgFormTitle} moreInfoText={c.hsProgMoreInfoText}
              formName={c.hsProgFormName} formEmail={c.hsProgFormEmail} formPhone={c.hsProgFormPhone}
              formStudent={c.hsProgFormStudent} formGrade={c.hsProgFormGrade}
              formMsg={c.hsProgFormMsg} formSend={c.hsProgFormSend} formSent={c.hsProgFormSent}
              gradeLabel={lang === 'es' ? 'Selecciona' : 'Select'}
            />
          </div>
        </AnimatedSection>

        {/* More Information */}
        <AnimatedSection className="mb-10 sm:mb-12">
          <div className="bg-brand-gray-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-brand-black mb-2 sm:mb-3">{c.progMoreInfo}</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">{c.progMoreInfoSub}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="text-center text-xs sm:text-sm text-gray-400 max-w-3xl mx-auto italic">{c.progDisclaimer}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ BASEBALL STATS ============
function BaseballStats() {
  const lang = useLang();
  
  const statsTitle = lang === 'es' ? '⚾ Números que Hablan' : '⚾ Numbers That Speak';
  const statsSub = lang === 'es' ? 'Nuestro impacto en el desarrollo de atletas' : 'Our impact on athlete development';
  
  const stats = [
    { emoji: '⚾', number: '200+', label: lang === 'es' ? 'Atletas Formados' : 'Athletes Trained', gif: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif' },
    { emoji: '🏆', number: '10+', label: lang === 'es' ? 'Años de Experiencia MLB' : 'Years MLB Experience', gif: 'https://media.giphy.com/media/l0HlNQ03J5JR3V2sE/giphy.gif' },
    { emoji: '🎓', number: '50+', label: lang === 'es' ? 'Becas Universitarias' : 'College Scholarships', gif: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif' },
    { emoji: '🌴', number: 'Tampa', label: lang === 'es' ? 'Florida, USA' : 'Florida, USA', gif: 'https://media.giphy.com/media/l0HlNQ03J5JR3V2sE/giphy.gif' },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-brand-black via-brand-gray to-brand-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
      
      {/* Baseball field background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">{statsTitle}</h2>
          <p className="text-base sm:text-lg text-white/50">{statsSub}</p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="group text-center p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-red/50 transition-all duration-500 hover:bg-white/10">
                <div className="text-4xl sm:text-5xl mb-4">{stat.emoji}</div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-red mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm sm:text-base font-medium">{stat.label}</div>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <img src={stat.gif} alt="Baseball animation" className="w-16 h-16 mx-auto rounded-full" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Animated baseball divider */}
        <AnimatedSection className="mt-12 sm:mt-16">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent to-brand-red/30" />
            <motion.img 
              src="https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif" 
              alt="Baseball" 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="flex-grow h-px bg-gradient-to-l from-transparent to-brand-red/30" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ EVENTS ============
function Events() {
  const lang = useLang();
  const c = t[lang];

  return (
    <section id="eventos" className="py-20 sm:py-24 lg:py-32 bg-brand-gray-light relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-brand-red mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">{c.eventTag}</span>
            <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black">{c.eventTitle}</h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16">
          {c.events.map((event, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover-lift border border-gray-100 hover:border-brand-red/30 transition-all duration-500 h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mx-auto rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-3 sm:mb-4 text-xl sm:text-2xl">
                  {['🌸', '☀️', '⚾', '🦃', '❄️'][i]}
                </div>
                <h4 className="font-bold text-brand-black text-xs sm:text-sm mb-0.5 sm:mb-1">{event.name}</h4>
                <p className="text-[10px] sm:text-xs text-gray-500">{event.month}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-black mb-6 sm:mb-8 text-center">{c.eventRegTitle}</h3>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {[c.eventReg1, c.eventReg2].map((name, i) => (
                <div key={i} className="flex items-center justify-between p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-brand-gray-light hover:bg-brand-red/5 transition-colors gap-4">
                  <div className="min-w-0">
                    <h4 className="font-bold text-brand-black text-sm sm:text-base">{name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">{lang === 'es' ? 'Registros abiertos' : 'Registration open'}</p>
                  </div>
                  <a href="#contacto" className="bg-brand-red text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-brand-red-dark transition-all flex-shrink-0">
                    {c.eventRegCta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ BASEBALL TIPS ============
function BaseballTips() {
  const lang = useLang();
  
  const tipsTitle = lang === 'es' ? '💡 Tips de Béisbol' : '💡 Baseball Tips';
  const tipsSub = lang === 'es' ? 'Consejos de nuestros coaches profesionales' : 'Tips from our professional coaches';
  
  const tips = [
    {
      emoji: '🏏',
      title: lang === 'es' ? 'Técnica de Bateo' : 'Batting Technique',
      description: lang === 'es' ? 'Mantén los ojos en la pelota y sigue el swing con todo el cuerpo.' : 'Keep your eyes on the ball and follow through with your whole body.',
      gif: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif'
    },
    {
      emoji: '🧤',
      title: lang === 'es' ? 'Defensa Perfecta' : 'Perfect Defense',
      description: lang === 'es' ? 'Posicionamiento y anticipación son clave para una buena defensa.' : 'Positioning and anticipation are key to good defense.',
      gif: 'https://media.giphy.com/media/l0HlNQ03J5JR3V2sE/giphy.gif'
    },
    {
      emoji: '⚾',
      title: lang === 'es' ? 'Control de Pitches' : 'Pitch Control',
      description: lang === 'es' ? 'La consistencia viene de la repetición y la mecánica correcta.' : 'Consistency comes from repetition and proper mechanics.',
      gif: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif'
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
      
      {/* Baseball stitching background */}
      <div className="absolute top-20 right-10 w-40 h-40 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-brand-red">
          <path d="M50 10 C60 30, 70 50, 50 90" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="6,6"/>
          <path d="M50 10 C40 30, 30 50, 50 90" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="6,6"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black mb-3 sm:mb-4">{tipsTitle}</h2>
          <p className="text-base sm:text-lg text-gray-500">{tipsSub}</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {tips.map((tip, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="group bg-brand-gray-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-brand-red/5 transition-all duration-500 hover-lift h-full">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl">{tip.emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-brand-black">{tip.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{tip.description}</p>
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src={tip.gif} 
                    alt={tip.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Fun baseball emojis row */}
        <AnimatedSection className="mt-12 sm:mt-16">
          <div className="flex justify-center gap-6 sm:gap-8 text-4xl sm:text-5xl">
            <motion.span 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ⚾
            </motion.span>
            <motion.span 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              🏏
            </motion.span>
            <motion.span 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🧤
            </motion.span>
            <motion.span 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              🏆
            </motion.span>
            <motion.span 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              🏟️
            </motion.span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ CTA BANNER ============
function CtaBanner() {
  const lang = useLang();
  const c = t[lang];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-brand-black via-brand-gray to-brand-black relative overflow-hidden noise-overlay">
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-brand-red/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-brand-red/10 rounded-full blur-3xl" />
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">{c.ctaTitle}</h2>
          <p className="text-base sm:text-lg text-white/60 mb-8 sm:mb-10 max-w-2xl mx-auto">{c.ctaSub}</p>
          <a href="#contacto" className="inline-flex items-center gap-3 bg-brand-red text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold hover:bg-brand-red-dark transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/30 hover:-translate-y-1">
            {c.ctaCta}
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ SOCIAL MEDIA ============
function SocialMedia() {
  const lang = useLang();
  const instagramUsername = 'ab4academy';

  const socialTitle = lang === 'es' ? '📱 Síguenos en Redes' : '📱 Follow Us on Social';
  const socialSub = lang === 'es' ? '⚾ Mantente conectado con nuestra comunidad de béisbol' : '⚾ Stay connected with our baseball community';

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-brand-red/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">{socialTitle}</h2>
          <p className="text-base sm:text-lg text-white/40 mb-10 sm:mb-12 max-w-xl mx-auto">{socialSub}</p>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={`https://instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3.5 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:border-transparent transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-white font-medium text-sm">@{instagramUsername}</span>
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3.5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 004.77 1.53V11.3a4.85 4.85 0 01-.19-.61z"/></svg>
              <span className="text-white font-medium text-sm">TikTok</span>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3.5 hover:bg-red-600 hover:border-transparent transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span className="text-white font-medium text-sm">YouTube</span>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ CONTACT ============
function Contact() {
  const lang = useLang();
  const c = t[lang];
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', interest: '', message: '' }); }, 3000);
  };

  const contactInfo = [
    { icon: <span className="text-2xl">📍</span>, title: c.contactLocation, value: c.contactLocationVal },
    { icon: <span className="text-2xl">📞</span>, title: c.contactPhoneLabel, value: c.contactPhoneVal },
    { icon: <span className="text-2xl">✉️</span>, title: c.contactEmailLabel, value: c.contactEmailVal, extra: [c.contactEmailFinance, c.contactEmailParents] },
    { icon: <span className="text-2xl">🕐</span>, title: c.contactHours, value: c.contactHoursVal },
  ];

  return (
    <section id="contacto" className="py-20 sm:py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-brand-red mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">{c.contactTag}</span>
            <div className="w-8 sm:w-12 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-black">{c.contactTitle}</h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          <AnimatedSection className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5 sm:mb-2">{c.contactName}</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all text-sm sm:text-base" placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'} required />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5 sm:mb-2">{c.contactEmail}</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all text-sm sm:text-base" placeholder="you@email.com" required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5 sm:mb-2">{c.contactPhone}</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all text-sm sm:text-base" placeholder="+1 (XXX) XXX-XXXX" required />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5 sm:mb-2">{c.contactInterest}</label>
                  <select value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all bg-white text-sm sm:text-base" required>
                    <option value="">{lang === 'es' ? 'Selecciona una opción' : 'Select an option'}</option>
                    {c.interestOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5 sm:mb-2">{c.contactMsg}</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all resize-none text-sm sm:text-base" rows={4} placeholder={lang === 'es' ? '¿Tienes alguna pregunta?' : 'Any questions?'} />
              </div>
              <button type="submit" className={`w-full py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${submitted ? 'bg-green-500 text-white' : 'bg-brand-red text-white hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30'}`}>
                {submitted ? c.contactSent : c.contactSend}
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection className="lg:col-span-2" delay={0.2}>
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-brand-gray-light hover:bg-brand-red/5 transition-colors group cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">{info.title}</div>
                    <div className="font-semibold text-brand-black text-sm sm:text-base">{info.value}</div>
                    {info.extra && info.extra.map((email: string, j: number) => (
                      <div key={j} className="text-xs sm:text-sm text-gray-600 mt-0.5">{email}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Map */}
        <AnimatedSection delay={0.3} className="mt-12 sm:mt-16">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-black/5">
            <iframe
              src="https://www.google.com/maps?q=5901+W+Linebaugh+Ave,+Tampa,+FL+33624&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AB4 Academy Location"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  const lang = useLang();
  const c = t[lang];

  const socials = [
    { name: 'Instagram', icon: '/Ig.webp', href: '#' },
    { name: 'Facebook', icon: '/Facebook.png', href: '#' },
    { name: 'YouTube', icon: '/Youtube.webp', href: '#' },
    { name: 'TikTok', icon: '/tt.webp', href: '#' },
  ];

  return (
    <footer className="bg-brand-black pt-16 sm:pt-20 pb-6 sm:pb-8 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <img src="/logo1.png" alt="AB4 Academy" className="h-14 sm:h-16 lg:h-20 w-auto" style={{ filter: 'brightness(0) invert(1) contrast(1.2)' }} />
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{c.footerDesc}</p>
            <div className="flex items-start gap-2 text-white/40 text-xs sm:text-sm mb-4 sm:mb-6">
              <span className="text-lg mt-0.5">📍</span>
              <span>5901 W Linebaugh Ave<br />Tampa, FL 33624</span>
            </div>
            <div className="flex gap-3 sm:gap-4">
              {socials.map((s) => (
                <a key={s.name} href={s.href} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-all overflow-hidden p-1.5 sm:p-2" aria-label={s.name}>
                  <img src={s.icon} alt={s.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">{c.footerPrograms}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['🏏 Hitting Instruction', '⚾ Pitching Development', '🧤 Fielding & Defense', '🏆 Showcase Teams'].map((item) => (
                <li key={item}><a href="#programas" className="text-white/50 text-xs sm:text-sm hover:text-brand-red transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">{c.footerCompany}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {c.footerCompanyLinks.map((item, i) => (
                <li key={item}><a href={['#sobre-mi', '#eventos', '#programas', '#contacto'][i]} className="text-white/50 text-xs sm:text-sm hover:text-brand-red transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">{c.footerLegal}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {c.footerLegalLinks.map((item) => (
                <li key={item}><a href="#" className="text-white/50 text-xs sm:text-sm hover:text-brand-red transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center">
          <p className="text-white/40 text-xs sm:text-sm">{c.footerCopy}</p>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN PAGE ============
export default function Home() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('ab4-lang') as Lang | null;
    if (saved === 'es' || saved === 'en') setLang(saved);
  }, []);

  const handleSetLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('ab4-lang', l);
  };

  return (
    <LangContext.Provider value={lang}>
      <SetLangContext.Provider value={handleSetLang}>
        <main className="overflow-hidden">
          <Navbar />
          <Hero />
          <BaseballGallery />
          <About />
          <WhyAb4 />
          <Programs />
          <BaseballStats />
          <Events />
          <BaseballTips />
          <CtaBanner />
          <SocialMedia />
          <Contact />
          <Footer />
        </main>
      </SetLangContext.Provider>
    </LangContext.Provider>
  );
}