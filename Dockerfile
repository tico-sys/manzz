FROM node:18-alpine

# Instal dependensi native (untuk canvas, ffmpeg, dll)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    pango-dev \
    cairo-dev \
    jpeg-dev \
    ffmpeg

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
