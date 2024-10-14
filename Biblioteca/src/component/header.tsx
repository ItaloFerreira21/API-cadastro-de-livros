import React from 'react';
import './header.css'; // Adicione um arquivo CSS para estilizar o header

interface HeaderProps {
  title: string;
  links: { name: string; url: string }[];
}

export const Header: React.FC<HeaderProps> = ({ title, links }) => {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};


