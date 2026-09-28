from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import shutil
import os
import cv2

app = FastAPI()


# -----------------------------------
# CORS
# -----------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------
# DIRECTORIES
# -----------------------------------

UPLOAD_DIR = "uploads"
PROCESSED_DIR = "processed"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)


# -----------------------------------
# HOME
# -----------------------------------

@app.get("/")
def home():
    return {
        "message": "TerraVision AI Backend is running!"
    }


# -----------------------------------
# UPLOAD + BASIC IMAGE ANALYSIS
# -----------------------------------

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    image = cv2.imread(file_path)

    if image is None:
        return {
            "message": "Invalid image"
        }

    height, width, channels = (
        image.shape
    )

    return {
        "message": "Image processed successfully",
        "filename": file.filename,
        "width": width,
        "height": height,
        "channels": channels
    }


# -----------------------------------
# AI ANALYSIS FOUNDATION
# -----------------------------------

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    image = cv2.imread(file_path)

    if image is None:
        return {
            "status": "error",
            "message": "Unable to read image"
        }

    # Image dimensions
    height, width, channels = image.shape

    # Convert image to grayscale
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # Basic preprocessing
    blurred = cv2.GaussianBlur(
        gray,
        (5, 5),
        0
    )

    # Edge extraction
    edges = cv2.Canny(
        blurred,
        50,
        150
    )

    # Save processed edge image
    processed_path = os.path.join(
        PROCESSED_DIR,
        "edges_" + file.filename
    )

    cv2.imwrite(
        processed_path,
        edges
    )

    return {
        "status": "success",
        "message": "AI preprocessing completed",
        "image": {
            "filename": file.filename,
            "width": width,
            "height": height,
            "channels": channels
        },
        "analysis": {
            "preprocessing": "completed",
            "edge_detection": "completed",
            "building_detection": "pending",
            "road_detection": "pending",
            "parcel_extraction": "pending"
        }
    }