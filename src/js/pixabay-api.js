export const apiKey = '42175181-9f2e4ea0c75ffabf50c3ef9f9';
let currentPage = 1;
let currentQuery = '';
let currentImagesCount = 0;

if (!apiKey) {
  console.error(
    'API key is missing. Please provide the API key in the .env file.'
  );
}
