import React from 'react'
import './Valefire.css'
import '../common.css'

const Valefire = () => (
<div className="valefire">

<p><a className="external-link incomplete" href="/valefire"><b>Valefire</b></a> compiles your Valence superstructure into a full Firebase database, server, and client bridge, so you never have to think about backends ever again. With Valefire, an app can effortlessly:</p>

<ul>
<li>Synchronize devices over the network in real-time.</li>
<li>Run functions locally or in the cloud or both.</li>
{/*<li><span className="valefire notyet">See changes immediately with client-side prediction.</span></li>
<li><span className="valefire notyet">Enable offline editing.</span></li>*/}
<li>Store a history of all changes, for reverting and comparing.</li>
</ul>

<p>It's simple: <span className="valefire inline-code">valefire mysuperstructure.v</span> generates cloud functions, then your regular <span className="valefire inline-code">firebase deploy</span> command uploads them to Firestore.</p>

<p>Valefire combines the unique properties of Valence and Firestore. It:</p>

<ul>
<li>Brings Valence's move semantics and consistency to Firestore.</li>
<li>Uses Firestore's real-time synchronization to forward requests to the Google Cloud Functions, and to broadcast effects to every connected superstructure.</li>
<li>Implements Valence's time-travel using copy-on-write and versioning techniques inside Firestore transactions.</li>
<li>Uses Firestore's schema-less nature to handle inheritance, templates, and forward-compatibility in a way relational databases cannot.</li>
<li>Uses Valence's ownership model and deterministic destruction to avoid costly database garbage collection.</li>
</ul>

<p><a href="/valefire" className="incomplete">Learn more about Valefire!</a></p>

</div>
);

export default Valefire;
