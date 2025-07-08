import Accordion from "react-bootstrap/Accordion";
import { useRef, useEffect, useState } from "react";

const AccordionComponent = ({ faqs = [] }) => {
  const [activeKey, setActiveKey] = useState(null);
  const itemRefs = useRef([]);

  const handleToggle = (key) => {
    setActiveKey(key === activeKey ? null : key);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (activeKey !== null && itemRefs.current[activeKey]) {
        // Scroll with some offset (e.g., -50px for spacing above)
        const yOffset = -150;
        const y =
          itemRefs.current[activeKey].getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [activeKey]);

  return (
    <Accordion activeKey={activeKey} onSelect={handleToggle}>
      {faqs.map((fa, index) => (
        <div key={index} ref={(el) => (itemRefs.current[index] = el)}>
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>{fa.question}</Accordion.Header>
            <Accordion.Body>
              {fa.answer
                .split(".")
                .filter((s) => s.trim() !== "")
                .map((sentence, i) => (
                  <p key={i}>{sentence.trim()}.</p>
                ))}
            </Accordion.Body>
          </Accordion.Item>
        </div>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
