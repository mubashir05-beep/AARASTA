import Link from 'next/link';
import React from 'react';

const Landing_Offer = () => {
  return (
    <div className="flex max-[860px]:flex-col max-[860px]:gap-4 justify-between items-center mx-[3rem] max-[500px]:mx-[1.5rem] my-[3rem] bg-gradient-to-r from-purple-300 p-[2rem] rounded-lg">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4  max-[860px]:text-center">
          About Us
        </h2>
        <div className="text-sm pt-1 text-white">
                  Welcome to AARASTA! We are a brand built on the passion and
                  dedication of two brothers who share a common vision - to
                  create exceptional &ldquo;Kameez Shalwar&rdquo; and suits for
                  men. Our story began with a deep-rooted love for traditional
                  craftsmanship and a desire to bring the essence of our
                  heritage to the modern world. Want to{" "}
                  <span className="underline underline-offset-4 cursor-pointer">
                    <Link href="/aboutus">learn more?</Link>
                  </span>
                </div>
    
    </div>
    </div>
  );
};

export default Landing_Offer;
