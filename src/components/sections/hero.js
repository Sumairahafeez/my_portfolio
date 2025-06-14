import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0 20px;
  position: relative;
  background: url('/images/stars-bg.jpg') no-repeat center center/cover;
  color: var(--lightest-slate);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
  }

  h2,
  h3 {
    margin: 0;
    color: var(--lightest-slate);
  }

  h3 {
    margin-top: 10px;
    font-size: var(--fz-xl);
    font-weight: 400;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    font-size: var(--fz-lg);
  }

  .cta-buttons {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
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
    if (prefersReducedMotion) {return;}
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Sumaira Hafeez.</h2>;
  const three = <h3 className="big-heading">Frontend Developer & UI/UX Explorer</h3>;
  const subtitle = <p>Turning imagination into interactive web experiences ✨</p>;
  const ctas = (
    <div className="cta-buttons">
      <a href="#projects">🔭 View Projects</a>
      <a href="/resume.pdf" target="_blank" rel="noreferrer">
        📄 Download Resume
      </a>
      <a href="#contact">💬 Let's Talk</a>
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
