# Railway Dockerfile - Simplified for deployment
FROM python:3.11-slim

WORKDIR /mat2-web

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libcairo2-dev \
    libgirepository1.0-dev \
    ffmpeg \
    mat2 \
    gir1.2-gdkpixbuf-2.0 \
    gir1.2-poppler-0.18 \
    gir1.2-rsvg-2.0 \
    libimage-exiftool-perl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (Railway will set PORT env var)
EXPOSE 5000

# Set Flask environment variables
ENV FLASK_APP=main.py
ENV FLASK_ENV=production

# Run Flask directly
CMD flask run --host=0.0.0.0 --port=5000

