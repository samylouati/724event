import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // Ajout condition pour appel de la fonction
    if (byDateDesc) {
      setTimeout(
        () => setIndex(index < byDateDesc.length ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  },

  [index]); // J'ajoute un index comme dependance pour eviter les problemes de rendu
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((focus, idx) => (
        <>
          <div
            key={focus.id}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={focus.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{focus.title}</h3>
                <p>{focus.description}</p>
                <div>{getMonth(new Date(focus.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={focus.id}
                  type="radio"
                  name="radio-button"
                  defaultChecked={idx === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
