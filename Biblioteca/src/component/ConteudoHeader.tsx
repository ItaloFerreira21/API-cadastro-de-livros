import React from 'react';
import './ConteudoHeader.css'; // Arquivo CSS para estilização

export const ConteudoHeader: React.FC = () => {
  return (
    <main>
      <section className="welcome-section">
        <h2>Bem-vindo ao Meu Site!</h2>
        <p>
          Este é o lugar onde você encontra informações sobre nossos serviços,
          últimas novidades e como entrar em contato conosco.
        </p>
      </section>

      <section className="features-section">
        <h2>Nossos Serviços</h2>
        <div className="features">
          <div className="feature-item">
            <h3>Serviço 1</h3>
            <p>
              Descrição do serviço 1. Explica os principais benefícios e
              funcionalidades.
            </p>
          </div>
          <div className="feature-item">
            <h3>Serviço 2</h3>
            <p>
              Descrição do serviço 2. Explica os principais benefícios e
              funcionalidades.
            </p>
          </div>
          <div className="feature-item">
            <h3>Serviço 3</h3>
            <p>
              Descrição do serviço 3. Explica os principais benefícios e
              funcionalidades.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Entre em Contato</h2>
        <p>
          Se tiver alguma dúvida ou precisar de mais informações, entre em
          contato conosco pelo email: contato@meusite.com
        </p>
      </section>
    </main>
  );
};


