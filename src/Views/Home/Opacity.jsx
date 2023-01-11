/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `Opacity` React component.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT CUSTOM HOOKS
import { useEffect, useRef } from 'react';
import useOpacity from '../../Hooks/useOpacity';

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Opacity` component.
 *
 * @component
 * @returns {JSX.Element} The `Opacity` components.
 */
const Opacity = () => {
  const inputRef = useRef();
  const { opacity, changeOpacity } = useOpacity();
  const percent = opacity * 100;

  useEffect(() => {
    const input = inputRef.current;
    const { value, min, max } = input;
    const percen = parseInt((((value - min) * 100) / (max - min)).toFixed(2), 10);
    const style = `${percen}% 100%`;
    input.style.backgroundSize = style;
  }, []);

  const onChange = e => {
    const input = inputRef.current;
    const { value, min, max } = input;
    const percen = parseInt((((value - min) * 100) / (max - min)).toFixed(2), 10);
    const style = `${percen}% 100%`;
    input.style.backgroundSize = style;
    changeOpacity(parseFloat(e.target.value));
  };

  return (
    <article className="feature">
      <h3 className="feature__title">Change window opacity</h3>
      <div className="feature__detail">
        <p>
          Current <span id="current-opacity">{percent}%</span>
        </p>
        <input
          ref={inputRef}
          type="range"
          id="opacity"
          name="opacity"
          min="0.7"
          max="1"
          value={`${opacity}`}
          step="0.01"
          onChange={onChange}
        />
      </div>
    </article>
  );
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default Opacity;
