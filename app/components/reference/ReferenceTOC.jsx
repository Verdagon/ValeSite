import React from 'react';
import './ReferenceTOC.css';
import {Link} from 'react-router-dom';

const cssns = (classes) => "c-referencetoc " + (classes || "");

class ReferenceTOC extends React.Component {
  render() {

    let sectionsByPage = {
      "intro": <Link to="/ref/intro">Intro</Link>,
      "structs": <Link to="/ref/structs">Structs</Link>,
      "references": <Link to="/ref/references">References</Link>,
      "interfaces": <Link to="/ref/interfaces">Interfaces</Link>,
      "generics": <Link to="/ref/generics">Generics</Link>,
      "patterns": <Link to="/ref/patterns">Patterns</Link>,
      "operators": <Link to="/ref/operators">Operators</Link>,
      "errors": <Link to="/ref/errors">Errors</Link>,
      "regions": <Link to="/ref/regions">Regions</Link>,
      "cross-compilation": <Link to="/ref/cross-compilation">Cross Compilation</Link>,
    };

    let page = this.props.page;
    if (page == "intro") {
      sectionsByPage["intro"] = (
        <div>
          <strong>Introduction *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Hello world!</li>
            <li className={cssns()}>Locals</li>
            <li className={cssns()}>Static Typing & Inference</li>
            <li className={cssns()}>Functions</li>
            <li className={cssns()}>Tuples</li>
            <li className={cssns()}>Arrays</li>
            <li className={cssns()}>Lists</li>
            <li className={cssns()}>Loops</li>
          </ul>
        </div>
      );
    }
    if (page == "structs") {
      sectionsByPage["structs"] = (
        <div>
          <strong>Structs *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Structs</li>
            <li className={cssns()}>Constructors</li>
            <li className={cssns()}>Ownership</li>
            <li className={cssns()}>Destructors</li>
            <li className={cssns()}>Mutability</li>
          </ul>
        </div>
      );
    }
    if (page == "references") {
      sectionsByPage["references"] = (
        <div>
          <strong>References *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Owning References</li>
            <li className={cssns()}>Constraint References</li>
            <li className={cssns()}>Weak References</li>
            <li className={cssns()}>Inline References</li>
            <li className={cssns()}>Borrow References</li>
          </ul>
        </div>
      );
    }
    if (page == "interfaces") {
      sectionsByPage["interfaces"] = (
        <div>
          <strong>Interfaces *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Interfaces</li>
            <li className={cssns()}>Interface Constructors</li>
            <li className={cssns()}>Structural Interfaces</li>
          </ul>
        </div>
      );
    }
    if (page == "generics") {
      sectionsByPage["generics"] = (
        <div>
          <strong>Generics *</strong>
          <ul className={cssns()}>
          </ul>
        </div>
      );
    }
    if (page == "patterns") {
      sectionsByPage["patterns"] = (
        <div>
          <strong>Patterns *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Patterns</li>
            <li className={cssns()}>Destructuring</li>
            <li className={cssns()}>Parameters</li>
            <li className={cssns()}>Pattern Calling</li>
          </ul>
        </div>
      );
    }
    if (page == "operators") {
      sectionsByPage["operators"] = (
        <div>
          <strong>Operators *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Map Operator</li>
            <li className={cssns()}>FlatMap Operator</li>
          </ul>
        </div>
      );
    }
    if (page == "errors") {
      sectionsByPage["errors"] = (
        <div>
          <strong>Errors *</strong>
          <ul className={cssns()}>
          </ul>
        </div>
      );
    }
    if (page == "regions") {
      sectionsByPage["regions"] = (
        <div>
          <strong>Regions *</strong>
          <ul className={cssns()}>
          </ul>
        </div>
      );
    }
    if (page == "cross-compilation") {
      sectionsByPage["cross-compilation"] = (
        <div>
          <strong>Cross Compilation *</strong>
          <ul className={cssns()}>
          </ul>
        </div>
      );
    }

    return (
      <div className={cssns("root")}>
        Reference
        <ul className={cssns()}>
          <li className={cssns()}>{sectionsByPage["intro"]}</li>
          <li className={cssns()}>{sectionsByPage["structs"]}</li>
          <li className={cssns()}>{sectionsByPage["references"]}</li>
          <li className={cssns()}>{sectionsByPage["interfaces"]}</li>
          <li className={cssns()}>{sectionsByPage["generics"]}</li>
          <li className={cssns()}>{sectionsByPage["patterns"]}</li>
          <li className={cssns()}>{sectionsByPage["operators"]}</li>
          <li className={cssns()}>{sectionsByPage["errors"]}</li>
          <li className={cssns()}>{sectionsByPage["regions"]}</li>
          <li className={cssns()}>{sectionsByPage["cross-compilation"]}</li>
        </ul>
      </div>

    );
    // <li className={cssns()}>{sectionsByPage["forking"]}</li>
  }
}

export default ReferenceTOC;
