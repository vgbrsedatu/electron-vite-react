/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Manage `About` React component view.
 */

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `About` component react component view.
 *
 * @component
 * @returns {JSX.Element} The `About` components.
 */
const About = () => (
  <section className="surface">
    <h1 className="surface__title">About</h1>
    <div className="surface__body">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros purus, semper quis
        ipsum vitae, porta porta justo. Integer turpis elit, mollis eget erat ut, iaculis malesuada
        velit. Vivamus semper, sem sed gravida posuere, sem eros cursus turpis, at varius eros
        libero sit amet sem. Phasellus tincidunt luctus semper. Suspendisse potenti. Donec
        scelerisque sagittis blandit. Sed tincidunt lorem mauris, et tempor libero cursus sit amet.
      </p>
    </div>
  </section>
);

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default About;
