import React from "react";
import backgroundImage from "../Images/background.jpg";

const Home = () => {
  return (
    <main>
      <section
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column", // Stacks elements vertically
          justifyContent: "flex-start", // Aligns content at the top
          alignItems: "center", // Centers the content horizontally
          textAlign: "center",
          color: "white",
		
        }}
      >
        <div
          style={{
            // backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for contrast
            padding: "40px",
            borderRadius: "12px", // Rounded corners for a softer look
            // boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)", // Adds depth
            marginTop: "50px", // Adds space from the top
            width: "100%", // Controls width of the content box
            maxWidth: "1200px", // Prevents content from being too wide
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "3.5rem",
              letterSpacing: "2px",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
              color: "white", // Heading color
              marginBottom: "20px", // Adds spacing below the heading
            }}
          >
            Welcome to Online Quiz for Everyone
          </h2>
          <p
            style={{
              fontSize: "1.5rem",
              fontStyle: "italic",
              fontWeight: "light",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            Test your knowledge and challenge your friends!
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
