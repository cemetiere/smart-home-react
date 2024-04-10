import React from 'react';

function WelcomePage() {
    return (
        <div style={{display: "flex", justifyContent: "center", margin: `100px`, height:`60vh`}}>
            <iframe width="60%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=WPoRLtWwYoHOpMfn" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
        </div>
    );
}

export default WelcomePage;