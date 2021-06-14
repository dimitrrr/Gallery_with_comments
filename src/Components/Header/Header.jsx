import React from 'react';
import c from "./Header.module.css";

export const Header = () => {
    return (
      <header>
        <div className={c.title}>
          <h1>Gallery</h1>
        </div>
      </header>
    );
}
