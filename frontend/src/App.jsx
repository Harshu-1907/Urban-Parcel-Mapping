import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // -----------------------------
  // FILE SELECTION
  // -----------------------------

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile) => {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setMessage("Please upload a JPG, JPEG or PNG image.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setMessage("File size must be below 20 MB.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setMessage("Image ready for analysis.");
  };

  // -----------------------------
  // DRAG & DROP
  // -----------------------------

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  // -----------------------------
  // UPLOAD TO BACKEND
  // -----------------------------

  const uploadImage = async () => {
    if (!file) {
      setMessage("Please select a drone image first.");
      return;
    }

    setIsProcessing(true);
    setMessage("Processing drone imagery...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setMessage("Image processed successfully.");
      } else {
        setMessage(data.message || "Image processing failed.");
      }
    } catch (error) {
      setMessage(
        "Backend connection failed. Please check the server."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // -----------------------------
  // SCROLL TO UPLOAD
  // -----------------------------

  const startSurvey = () => {
    document
      .querySelector(".workspace")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="app">

      {/* =====================================
          NAVBAR
      ====================================== */}

      <nav className="navbar">

        <div className="brand">

          <div className="brand-mark">
            <span>⌖</span>
          </div>

          <div className="brand-text">
            <div className="brand-name">
              TerraVision <span>AI</span>
            </div>

            <div className="brand-subtitle">
              Intelligent Urban Mapping
            </div>
          </div>

        </div>


        <div className="nav-links">

          <div className="nav-link active">
            Dashboard
          </div>

          <div className="nav-link">
            Projects
          </div>

          <div className="nav-link">
            GIS Workspace
          </div>

        </div>


        <div className="nav-right">

          <div className="system-status">

            <span className="live-dot"></span>

            <div>
              <strong>System Online</strong>
              <small>AI Engine Ready</small>
            </div>

          </div>

          <div className="divider"></div>

          <button
            className="icon-btn"
            title="Settings"
          >
            ⚙
          </button>

          <div className="profile">

            <div className="profile-avatar">
              U
            </div>

            <div className="profile-info">
              <strong>Urban Survey</strong>
              <span>Workspace</span>
            </div>

          </div>

        </div>

      </nav>


      {/* =====================================
          MAIN
      ====================================== */}

      <main className="main">

        {/* =====================================
            HERO
        ====================================== */}

        <div className="dashboard-hero">

          <div className="hero-content">

            <div className="hero-tag">

              <span className="hero-pulse"></span>

              AI-POWERED GEOSPATIAL INTELLIGENCE

            </div>


            <h1>
              Transform Drone Imagery
              <br />
              into <span>Intelligent Maps.</span>
            </h1>


            <p>
              Automatically detect buildings, roads and land
              parcels from high-resolution aerial imagery.
            </p>


            <div className="hero-actions">

              <button
                className="hero-primary"
                onClick={startSurvey}
              >
                Start New Survey
                <span>→</span>
              </button>


              <button className="hero-secondary">
                View Platform
              </button>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="grid-lines"></div>

            <div className="map-orbit orbit-one"></div>

            <div className="map-orbit orbit-two"></div>


            <div className="hero-center">

              <div className="radar-ring">
                <span>⌖</span>
              </div>

              <strong>AI</strong>

              <small>
                GIS ENGINE
              </small>

            </div>


            <div className="floating-stat stat-one">

              <strong>AI</strong>

              <span>
                Detection
              </span>

            </div>


            <div className="floating-stat stat-two">

              <strong>GIS</strong>

              <span>
                Mapping
              </span>

            </div>

          </div>

        </div>


        {/* =====================================
            CAPABILITY CARDS
        ====================================== */}

        <div className="overview-grid">

          <div className="overview-card">

            <div className="overview-icon blue">
              ⌂
            </div>

            <div>
              <span>BUILDING DETECTION</span>

              <strong>
                AI Powered
              </strong>

              <small>
                Automated extraction
              </small>
            </div>

          </div>


          <div className="overview-card">

            <div className="overview-icon purple">
              ◇
            </div>

            <div>
              <span>PARCEL EXTRACTION</span>

              <strong>
                Smart Boundaries
              </strong>

              <small>
                AI-assisted segmentation
              </small>
            </div>

          </div>


          <div className="overview-card">

            <div className="overview-icon green">
              ◎
            </div>

            <div>
              <span>GIS VISUALIZATION</span>

              <strong>
                Interactive Maps
              </strong>

              <small>
                Spatial data layers
              </small>
            </div>

          </div>


          <div className="overview-card">

            <div className="overview-icon orange">
              ↗
            </div>

            <div>
              <span>DATA EXPORT</span>

              <strong>
                GIS Ready
              </strong>

              <small>
                GeoJSON & reports
              </small>
            </div>

          </div>

        </div>


        {/* =====================================
            WORKSPACE
        ====================================== */}

        <div className="workspace">


          {/* ===================================
              LEFT - UPLOAD PANEL
          =================================== */}

          <section className="control-panel">

            <div className="section-title">

              <span>01</span>

              <div>

                <h3>
                  Upload Imagery
                </h3>

                <p>
                  Select your drone image
                </p>

              </div>

            </div>


            {/* DRAG DROP */}

            <label
              className={`upload-box ${
                dragActive ? "drag-active" : ""
              }`}

              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >

              <div className="upload-icon">
                ↑
              </div>


              <h3>
                Drop your drone image here
              </h3>


              <p>
                or click to browse from your computer
              </p>


              <input
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onChange={handleFileChange}
              />


              <span className="choose-btn">
                Browse Images
              </span>


              <small className="upload-hint">
                JPG / JPEG / PNG · Maximum 20 MB
              </small>

            </label>


            {/* FILE INFORMATION */}

            {file && (

              <div className="file-info">

                <div className="file-icon">
                  IMG
                </div>


                <div>

                  <strong>
                    {file.name}
                  </strong>

                  <p>
                    {(file.size / 1024 / 1024).toFixed(2)}
                    {" "}MB
                  </p>

                </div>

              </div>

            )}


            {/* PROCESS BUTTON */}

            <button
              className="process-btn"
              onClick={uploadImage}
              disabled={!file || isProcessing}
            >

              <span>
                {isProcessing ? "◌" : "✦"}
              </span>

              {isProcessing
                ? "Processing..."
                : "Analyze Image"}

            </button>


            {/* STATUS MESSAGE */}

            {message && (

              <div className="message">

                <span className="status-dot"></span>

                {message}

              </div>

            )}


            {/* WORKFLOW */}

            <div className="workflow">

              <h4>
                Analysis Pipeline
              </h4>


              <div className="workflow-item active">

                <span>
                  ✓
                </span>

                Image Upload

              </div>


              <div className="workflow-item">

                <span>
                  2
                </span>

                AI Feature Detection

              </div>


              <div className="workflow-item">

                <span>
                  3
                </span>

                Parcel Extraction

              </div>


              <div className="workflow-item">

                <span>
                  4
                </span>

                GIS Mapping

              </div>

            </div>

          </section>


          {/* ===================================
              CENTER - IMAGE PANEL
          =================================== */}

          <section className="image-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Drone Imagery
                </h3>

                <p>
                  Input image visualization
                </p>

              </div>


              <span className="badge">
                {file ? "READY" : "INPUT"}
              </span>

            </div>


            <div className="image-container">

              {preview ? (

                <img
                  src={preview}
                  alt="Uploaded drone imagery"
                />

              ) : (

                <div className="empty-state">

                  <div className="empty-icon">
                    ⌁
                  </div>

                  <h3>
                    No imagery selected
                  </h3>

                  <p>
                    Upload a drone image to begin analysis
                  </p>

                </div>

              )}

            </div>


            {/* IMAGE INFORMATION */}

            {result && (

              <div className="image-stats">

                <div>

                  <span>
                    WIDTH
                  </span>

                  <strong>
                    {result.width}px
                  </strong>

                </div>


                <div>

                  <span>
                    HEIGHT
                  </span>

                  <strong>
                    {result.height}px
                  </strong>

                </div>


                <div>

                  <span>
                    CHANNELS
                  </span>

                  <strong>
                    {result.channels}
                  </strong>

                </div>

              </div>

            )}

          </section>


          {/* ===================================
              RIGHT - RESULTS
          =================================== */}

          <section className="results-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Analysis Results
                </h3>

                <p>
                  AI-generated mapping features
                </p>

              </div>


              <span
                className={`badge ${
                  result ? "" : "muted"
                }`}
              >
                {result ? "PROCESSED" : "WAITING"}
              </span>

            </div>


            {/* BUILDINGS */}

            <div className="result-card">

              <div className="result-icon">
                ⌂
              </div>

              <div>

                <span>
                  BUILDINGS
                </span>

                <strong>
                  —
                </strong>

              </div>

            </div>


            {/* ROADS */}

            <div className="result-card">

              <div className="result-icon">
                ⌁
              </div>

              <div>

                <span>
                  ROADS
                </span>

                <strong>
                  —
                </strong>

              </div>

            </div>


            {/* PARCELS */}

            <div className="result-card">

              <div className="result-icon">
                ◇
              </div>

              <div>

                <span>
                  PARCELS
                </span>

                <strong>
                  —
                </strong>

              </div>

            </div>


            {/* GIS MAP */}

            <div className="map-placeholder">

              <div>
                ◎
              </div>

              <strong>
                GIS Map
              </strong>

              <span>
                Available after AI extraction
              </span>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default App;