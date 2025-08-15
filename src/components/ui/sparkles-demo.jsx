"use client";
import React from "react";
import { SparklesCore } from "./sparkles";

export default function SparklesPreview() {
  return (
    <div className="sparkles-preview">
      <h1 className="sparkles-title">Aceternity</h1>
      <div className="sparkles-container">
        {/* Gradients */}
        <div className="gradient-bar gradient-bar-1" />
        <div className="gradient-bar gradient-bar-2" />
        <div className="gradient-bar gradient-bar-3" />
        <div className="gradient-bar gradient-bar-4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="sparkles-core"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="radial-gradient"></div>
      </div>
    </div>
  );
}