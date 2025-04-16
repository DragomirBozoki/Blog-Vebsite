// api/upload.js
import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export const config = {
  api: {
    bodyParser: false,
  },
};

import multiparty from 'multiparty';

const POSTS_FILE = 'posts.json';

function loadPosts() {
  try {
    const data = fs.readFileSync(POSTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function savePosts(posts) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500
