import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

// const StyledSection = styled.section`
//   max-width: 900px;
//   margin: 0 auto 100px;
//   text-align: center;

//   @media (max-width: 768px) {
//     margin: 0 auto 60px;
//   }

//   h2 {
//     font-size: clamp(30px, 5vw, 50px);
//     font-weight: 600;
//     margin-bottom: 30px;
//     color: var(--lightest-slate);
//   }

//   .subheading {
//     margin-bottom: 40px;
//     color: var(--light-slate);
//     font-size: var(--fz-lg);
//   }

//   .cards {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//     gap: 30px;

//     .card {
//       background-color: var(--light-navy);
//       padding: 25px 20px;
//       border-radius: var(--border-radius);
//       box-shadow: var(--box-shadow);
//       text-align: left;
//       transition: var(--transition);

//       &:hover {
//         transform: translateY(-5px);
//       }

//       h3 {
//         margin-bottom: 10px;
//         color: var(--green);
//         font-size: var(--fz-lg);
//         font-family: var(--font-sans);
//       }

//       p {
//         color: var(--light-slate);
//         font-size: var(--fz-md);
//         line-height: 1.4;
//       }
//     }
//   }
// `;

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  const contactRef = useRef(null);
  const certTestRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {return;}

    sr.reveal(certTestRef.current, srConfig());
    sr.reveal(contactRef.current, srConfig(200));
  }, []);

  return (
    <>
      {/* --- Certificates & Testimonials ---
      <StyledSection ref={certTestRef}>
        <h2>Certificates & Testimonials</h2>
        <p className="subheading">Here are a few things I’ve accomplished and what others say about me:</p>

        <div className="cards">
          <div className="card">
            <h3>Frontend Certification – Meta</h3>
            <p>
              Completed a professional certificate in Frontend Development, mastering React, accessibility, testing, and deployment best practices.
            </p>
          </div>
          <div className="card">
            <h3>Testimonial – Internship Supervisor</h3>
            <p>
              "Sumaira brings creativity and dedication to every project. Her ability to adapt and deliver under deadlines impressed the entire team."
            </p>
          </div>
          <div className="card">
            <h3>AI Workshop – GDSC</h3>
            <p>
              Attended and contributed to workshops on AI and ML fundamentals hosted by Google Developer Student Clubs, enhancing applied ML skills.
            </p>
          </div>
        </div>
      </StyledSection> */}

      {/* --- Contact Section --- */}
      <StyledContactSection id="contact" ref={contactRef}>
        <h2 className="numbered-heading overline">What’s Next?</h2>
        <h2 className="title">Get In Touch</h2>
        <p>
          I am actively seeking new opportunities to grow and advance my career. Whether you have a
          project, collaboration, or just want to connect, feel free to reach out to me.
        </p>
        <a className="email-link" href={`mailto:${email}`}>
          Say Hello
        </a>
      </StyledContactSection>
    </>
  );
};

export default Contact;
