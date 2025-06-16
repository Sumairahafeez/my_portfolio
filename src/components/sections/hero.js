import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  0%, 100% { border-color: transparent }
  50% { border-color: var(--green) }
`;

const StyledHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  padding: 0 20px;
  position: relative;
  background: url('/images/stars-bg.jpg') no-repeat center center/cover;
  color: var(--lightest-slate);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-family: 'Poppins', sans-serif;
  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .typewriter {
    margin-top: 20px;
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: 500;
    color: var(--lightest-slate);
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid var(--green);
    width: 0;
    animation: ${typewriter} 3s steps(40, end) forwards, ${blink} 0.75s step-end infinite;
  }

  p {
    margin: 25px 0 0;
    max-width: 600px;
    font-size: var(--fz-lg);
  }

  .cta-buttons {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 40px;

    a {
      ${({ theme }) => theme.mixins.smallButton};
      text-decoration: none;
      font-weight: 600;
      border: 1px solid var(--green);
      padding: 0.75rem 1.5rem;
      color: var(--green);
      transition: background 0.3s ease;

      &:hover {
        background-color: var(--green-tint);
        color: var(--dark-navy);
      }
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2>Sumaira Hafeez.</h2>;
  const three = <div className="typewriter">Frontend Developer & UI/UX Designer</div>;
  const subtitle = <p>Turning imagination into interactive web experiences.</p>;
  const ctas = (
    <div className="cta-buttons">
      <a href="#projects">View Projects</a>
      <a href="/resume.pdf" target="_blank" rel="noreferrer">
        Download Resume
      </a>
      <a href="#contact">Let's Talk</a>
    </div>
  );

  const items = [one, two, three, subtitle, ctas];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
