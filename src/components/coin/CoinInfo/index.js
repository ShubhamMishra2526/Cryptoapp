import React, { useState } from "react";
import "./styles.css";
function CoinInfo({ heading, description }) {
  const shortDesc =
    description.slice(0, 300) +
    "<p style = 'color:var(--grey)'> Read More...</p>";
  const longDesc =
    description + "<p style = 'color:var(--grey)'> Read Less...</p>";

  const [flag, setFlag] = useState(false);
  return (
    <div className="grey-wrapper">
      <h2 className="coin-info-heading">{heading}</h2>
      {description.length > 200 ? (
        /* using dangerouslysetinnerhtml because the anchor tags in desc is stored as a string which makes our description bit odd so to convert those anchor tags into a proper element we use this*/
        <p
          onClick={() => setFlag(!flag)}
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
        />
      ) : (
        <p
          onClick={() => setFlag(!flag)}
          className="coin-info-desc"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}

export default CoinInfo;
