import React from 'react'
import './Home.css'
import Header from './Header.jsx'
import Valefire from './Valefire.jsx'
import Playground from './Playground.jsx'
import Footer from './Footer.jsx';
import {Link} from 'react-router-dom';
import domino from '../images/Domino.png';

const ns = (classes) => "c-home " + (classes || "");

class Home extends React.Component {
  render() {
    return (
      <div className={ns("root")}>
        <div className={ns("headercontainer")}>
          <Header easterEgg={true}/>
        </div>

        <div className={ns("page")}>

          {/*<div className={ns("description")}>
            Valence is a new general purpose programming language with a focus on <i>the bigger picture</i>. Read on to find out how!
          </div>*/}

          <div className={ns("columns")}>

            <div className={ns("left")}>

              <div className={ns("intro")}>
                Vale is a fast, safe, and easy programming language. It uses single ownership and constraint references for memory safety without garbage collection, and an emphasis on modern, readable syntax.
              </div>

              <div className={ns("featuring")}>
                <div className={ns("featuring-title")}>Featuring:</div>
                <ul>
                  <li><Link to="/ref/intro" className={ns("feature-title")}>Statically Typed</Link> with type inference.</li>
                  <li><Link to="/ref/references" className={ns("feature-title")}>References</Link>: Move semantics, and deterministic destruction.</li>
                  <li><Link to="/ref/memory" className={ns("feature-title")}>Memory Safe</Link>, using constraint references, with multiple simultaneous mutable references.</li>
                  <li><Link to="/ref/generics" className={ns("feature-title")}>Generics</Link>, including virtual generics.</li>
                  <li><Link to="/ref/interfaces" className={ns("feature-title")}>Interface Constructors</Link></li>
                  <li><Link to="/ref/intro#ufcs" className={ns("feature-title")}>UFCS</Link></li>
                  <li><Link to="/ref/lambdas" className={ns("feature-title")}>Polymorphic Lambdas</Link></li>
                  <li><Link to="/ref/operators#infix" className={ns("feature-title")}>Infix calling</Link></li>
                  <li><Link to="/ref/structs#mutability" className={ns("feature-title")}>Mutable and Immutable Objects</Link></li>
                  <li><Link to="/ref/patterns" className={ns("feature-title")}>Pattern Matching, Destructuring, Parameter Patterns, Pattern Calling</Link></li>
                </ul>
              </div>

              <div className={ns("wip")}>
                Vale is currently version 0.1, see the <Link to="/roadmap">Roadmap</Link> for what's next!
              </div>

              <div className={ns("upcoming-title")}>Upcoming Features:</div>
              <ul>
                <li><Link to="/ref/interfaces#structural" className={ns("feature-title")}>Structural Interfaces</Link>, using interface constructors.</li>
                <li><Link to="/ref/operators#shortcalling" className={ns("feature-title")}>Shortcalling Syntax</Link></li>
                <li><Link to="/ref/references#weak" className={ns("feature-title")}>Weak References</Link></li>
                <li><Link to="/ref/memory#inline" className={ns("feature-title")}>Inline References</Link> for optimization.</li>
                <li><Link to="/ref/references#borrow" className={ns("feature-title")}>Borrow References</Link> for optimization.</li>
                <li><Link to="/ref/regions" className={ns("feature-title")}>Regions</Link> for optimization.</li>
                <li><Link to="/ref/cross-compilation" className={ns("feature-title")}>Cross Compilation</Link> to JVM and JS.</li>
                <li><Link to="/ref/operators#map" className={ns("feature-title")}>Map & FlatMap Operators</Link></li>
                <li><Link to="/ref/errors" className={ns("feature-title")}>Errors</Link></li>
                <li><Link to="/ref/variants" className={ns("feature-title")}>Variants</Link></li>
                <li><Link to="/ref/variants#anonymous" className={ns("feature-title")}>Anonymous Variants</Link></li>
                <li><Link to="/ref/variantindexing" className={ns("feature-title")}>Unified Array/Tuple</Link></li>
              </ul>

            </div>

            <div className={ns("right")}>

              {/*<div className={ns("github")}>
                <a className={ns("external-link")} href="https://github.com/Verdagon/Valestrom">Github Repository</a>
              </div>*/}

          <div className={ns("posts")}>
            <div className={ns("recent-posts")}>
              <div className={ns("recent-posts-title")}>Recent posts:</div>
              <ul>
                <li><Link to="/blog/verdagon/2020-no-garbage-collection">Safety without Garbage Collection</Link></li>
                <li><Link to="/blog/verdagon/2020-borrow-references">Constraint and Borrow References</Link></li>
                <li><Link to="/blog/verdagon/2020-single-ownership-patterns">Patterns with Single Ownership</Link></li>
                {/*<li><Link to="/blog/verdagon/2020-binary-operators-generic-syntax">Binary Operators and Generic Syntax</Link></li>
                <li><Link to="/blog/verdagon/2020-ufcs">Making UFCS Work</Link></li>
                <li><Link to="/blog/verdagon/2020-shortcalling">Shortcalling Syntax</Link></li>
                <li><Link to="/blog/verdagon/2020-improved-destructors">Destructors with Parameters and Returns</Link></li>
                <li><Link to="/blog/verdagon/2020-error-handling">Better Error Handling</Link></li>
                <li><Link to="/blog/verdagon/2020-auto-inlining">Auto-inlining</Link></li>
                <li><Link to="/blog/verdagon/2020-cross-compilation-optimization">Cross Compilation and Optimization</Link></li>*/}
              </ul>
            </div>
          </div>




<div className={ns("example")}>
<div className={ns("code")}>
{`fn main() {
  println("Hello world!");
}`}
</div>
</div>
<div className={ns("output")}>
{`Hello world!`}
</div>

<div className={ns("example")}>
<div className={ns("code")}>
{`fn planets() {
  ["Venus", "Earth", "Mars"]
}
fn main() {
  each planets() (planet){
    println("Hello " + planet + "!");
  }
}`}
</div>
<div className={ns("equivalent")}>
<a href="#">See equivalent C++, JS, Rust, Scala, Python</a>
</div>
</div>
<div className={ns("output")}>
{`Hello Venus!
Hello Earth!
Hello Mars!`}
</div>


            
            <div className={ns("possibilities")}>
              <div className={ns("possibilities-header")}>
                <div className={ns("possibilities-header-text")}>Vale Projects</div>
                <div className={ns("possibilities-header-page-number")}>
                  <div className={ns("possibilities-left")}></div>
                  <div className={ns("possibilities-page possibilities-page-current")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-page")}></div>
                  <div className={ns("possibilities-right")}></div>
                </div>
              </div>

              <div className={ns("possibilities-contents")}>
                <div className={ns("description")}>
                  Polytiles is a polygonal terrain generator, shown here with the Domino rendering layer.
                </div>

                <img style={{width: "100%"}} src={domino}/>
              </div>
            </div>

              {/*<p>(video of using valence to implement google docs here)</p>*/}


            </div>
          </div>

          <Footer/>
        </div>
      </div>
    );
  }
}

export default Home;
