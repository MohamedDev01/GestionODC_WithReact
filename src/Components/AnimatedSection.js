import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../Styles/AnimatedSection.css';

const AnimatedSection = ({ 
  children, 
  animation = 'fadeIn', 
  delay = 0, 
  duration = 600,
  className = '',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={sectionRef} 
      className={`animated-section ${className}`}
      {...props}
    >
      <CSSTransition
        in={isVisible}
        timeout={duration}
        classNames={animation}
        unmountOnExit={false}
      >
        <div className={`animated-content ${animation}`}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default AnimatedSection;
