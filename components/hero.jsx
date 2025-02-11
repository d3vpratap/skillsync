import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full  pt-36 md:pt-40 pb-10">
      <div className="space-y-2 text-center">
        <div className="space-y-2 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
            Welcome to Your Personalized
            <span className="block mt-2">AI Path Pilot</span>
          </h1>

          <br />
          <p className="text-muted-foreground w-auto py-3 mb-2">
            Implement AI carrer guidance to imporve your skills , interview
            Preparation and AI-powered Tools
          </p>
        </div>
        <div>
          <Link href={"/dashboard"}>
            <Button size="lg" className="p-6" variant="outline">
              <span> Start here</span>
            </Button>
          </Link>
          <Image
            src={"/main.png"}
            alt="main"
            width={250}
            height={100}
            className="rounded-lg shadow-2xl mx-auto"
            priority
          />
        </div>
        <div>
          <div className="">
            {/* <Image
              src={"/Untitled.png"}
              alt="desktop"
              width={350}
              height={200}
              className="rounded-md shadow-2xl border mx-auto"
              priority
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
