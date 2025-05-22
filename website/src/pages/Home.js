import React, { useState } from 'react';
import './Home.css';

export default function Home() {

    const timelineItems = [
        {
            title: "1G (1980)",
            cardTitle: "Primera Generación",
            cardSubtitle: "Analógica",
            cardDetailedText: "Solo voz, sin encriptación. Velocidad: 2.4 Kbps."
        },
        {
            title: "2G (1991)",
            cardTitle: "GSM",
            cardSubtitle: "Digital",
            cardDetailedText: "Introdujo SMS. Velocidad: 50 Kbps."
        },
        {
            title: "3G (2001)",
            cardTitle: "Internet Móvil",
            cardSubtitle: "Banda ancha básica",
            cardDetailedText: "Habilitó videollamadas. Velocidad: 2 Mbps."
        },
        {
            title: "4G (2009)",
            cardTitle: "LTE",
            cardSubtitle: "Banda ancha real",
            cardDetailedText: "Streaming HD. Velocidad: 100 Mbps - 1 Gbps."
        },
        {
            title: "5G (2020)",
            cardTitle: "Revolución IoT",
            cardSubtitle: "Baja latencia",
            cardDetailedText: "Soporte para IoT masivo. Velocidad: 10 Gbps. Latencia: ~1ms.",
            cardBg: "#64ffda20" // Fondo destacado para 5G
        },
        {
            title: "6G (2030)",
            cardTitle: "Era THz",
            cardSubtitle: "Comunicaciones cuánticas",
            cardDetailedText: "Velocidades de terabit. Integración con IA avanzada.",
            cardBg: "#64ffda40" // Fondo más destacado
        },
        {
            title: "7G (2040?)",
            cardTitle: "Redes cuánticas",
            cardSubtitle: "Frontera teórica",
            cardDetailedText: "Posible teleportación de datos. Interconexión cerebral.",
            cardBg: "#64ffda60" // Fondo más destacado
        }
    ];
    const [selected, setSelected] = useState(4); // Por defecto 5G

    return (
        <div className="home-container">
            {/* Espacio para el video de S3 */}

            <h1 className="main-title">5ta, 6ta & 7ma Generación de Tecnología Móvil</h1>

            <div className="hero-video">
                <video controls autoPlay muted>
                    <source src="https://tu-bucket-s3.s3.amazonaws.com/video-redes-moviles.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                </video>
            </div>

            <section className="intro-section">
                <h2>Evolución de las Redes Móviles</h2>
                <p>
                    Las redes móviles han experimentado una transformación radical desde los primeros días de la 1G analógica
                    hasta las futuras redes 6G y 7G. Cada generación ha marcado un hito tecnológico, mejorando no solo la
                    velocidad y conectividad, sino también habilitando aplicaciones revolucionarias que están transformando
                    industrias completas como la salud, el transporte, las telecomunicaciones y la inteligencia artificial.
                </p>
            </section>

            <section className="timeline-section">
                <h2>Evolución Cronológica de las Redes Móviles</h2>
                <div className="custom-timeline">
                    {timelineItems.map((item, idx) => (
                        <button
                            key={item.title}
                            className={`timeline-dot-btn${selected === idx ? ' active' : ''}`}
                            onClick={() => setSelected(idx)}
                        >
                            <span className="timeline-dot" />
                            <span className="timeline-label">{item.title}</span>
                        </button>
                    ))}
                </div>
                <div className="custom-timeline-card">
                    <h3>{timelineItems[selected].cardTitle}</h3>
                    <h4>{timelineItems[selected].cardSubtitle}</h4>
                    <p>{timelineItems[selected].cardDetailedText}</p>
                </div>
            </section>

            <section className="tech-section">
                <h2>¿Por qué necesitamos nuevas tecnologías?</h2>
                <p>
                    La explosión en la demanda de datos, el crecimiento exponencial de dispositivos IoT,
                    y las aplicaciones en tiempo real como realidad aumentada, cirugía remota y vehículos
                    autónomos requieren redes más robustas, rápidas y confiables. Las futuras generaciones
                    de redes móviles no son un lujo, sino una necesidad para sostener nuestra creciente
                    dependencia digital.
                </p>
            </section>

            <section className="generation-section">
                <div className="generation-card">
                    <h3>RED 5G: La Revolución Actual</h3>
                    <ul>
                        <li>Velocidades hasta 10 Gbps (100x más rápido que 4G)</li>
                        <li>Latencia ultra baja (~1ms)</li>
                        <li>Tecnologías mmWave y Massive MIMO</li>
                        <li>Soporte para 1 millón de dispositivos/km²</li>
                        <li>Aplicaciones: IoT masivo, realidad aumentada, vehículos autónomos</li>
                    </ul>
                </div>

                <div className="generation-card">
                    <h3>RED 6G: El Futuro (2030)</h3>
                    <ul>
                        <li>Velocidades de terabit (1 Tbps)</li>
                        <li>Comunicaciones en frecuencias de terahercios (THz)</li>
                        <li>Integración profunda con IA</li>
                        <li>Comunicaciones holográficas</li>
                        <li>Posibles aplicaciones cuánticas</li>
                    </ul>
                </div>

                <div className="generation-card">
                    <h3>RED 7G: La Frontera Teórica</h3>
                    <ul>
                        <li>Redes cuánticas seguras</li>
                        <li>Inteligencia Artificial global integrada</li>
                        <li>Velocidades cercanas a la luz</li>
                        <li>Posible teleportación de datos</li>
                        <li>Interconexión cerebral directa</li>
                    </ul>
                </div>
            </section>

            <section className="conclusion-section">
                <h2>Conclusión y Desafíos</h2>
                <p>
                    Mientras el 5G está transformando industrias hoy, el 6G promete una integración sin
                    precedentes entre el mundo físico y digital mediante IA y comunicaciones THz. El 7G,
                    aunque aún teórico, podría representar la fusión definitiva entre redes cuánticas y
                    computación avanzada.
                </p>
                <div className="challenges">
                    <h4>Principales Desafíos:</h4>
                    <ul>
                        <li>Despliegue de infraestructura global</li>
                        <li>Seguridad en redes cuánticas</li>
                        <li>Cobertura en áreas remotas</li>
                        <li>Estandarización internacional</li>
                        <li>Sostenibilidad energética</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}