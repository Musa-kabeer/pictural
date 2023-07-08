'use strict';
const imageContainer = document.getElementById('imageContainer');
const formContainer = document.querySelector('#videoForm');
const input = document.querySelector('#input');
const preText = document.querySelector('#pre-text');

const API_KEY = '23568302-cc874332c91abffa006b919eb';

async function renderVideos(video) {
  const videos = await video;

  videos
    .map((video) => {
      const html = ` <figure
            class="bg-yellow-200 rounded-sm shadow-lg shadow-yellow-400/50"
          >
          <div class="w-full">
             <video
            controls
            src=${video.videos.large.url}
            poster=${video.userImageURL}
            class="w-full min-w-full min-h-full"
          >
            <p>Your browser does not support this content</p>
          </video>
          </div>
         
            <div class="px-3 flex flex-col py-3 gap-3">
              <h3 class="font-bold text-xl">
                Photo by ${video.user}
              </h3>

              <div class="flex flex-col">
                <span><b>Views:</b> ${video.views}</span>
                <span><b>Downloads:</b> ${video.downloads}</span>
                <span><b>Likes:</b> ${video.likes}</span>
              </div>

              <div class="w-full">
                <ul class="flex gap-2 w-full">
                  <li
                    class="px-3 py-0.5 bg-gray-50 rounded-md w-1/3 text-xs text-center"
                  >
                    ${video.tags.split(',')[0]}
                  </li>
                  <li
                    class="px-3 py-0.5 bg-gray-50 rounded-md w-1/3 text-xs text-center"
                  >
                    ${video.tags.split(',')[1]}
                  </li>
                  <li
                    class="px-3 py-0.5 bg-gray-50 rounded-md w-1/3 text-xs text-center"
                  >
                    ${video.tags.split(',')[2]}
                  </li>
                </ul>
              </div>
            </div>
          </figure>`;

      imageContainer.insertAdjacentHTML('beforeend', html);
    })
    .join('');
}

// On search query
async function fetchVideoQuery() {
  const query = input.value;

  const res = await fetch(
    `https://pixabay.com/api/videos/?key=${API_KEY}&q=${query}`
  );

  const data = await res.json();

  return await data.hits;
}

formContainer.addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = await fetchVideoQuery();

  if (data) {
    preText.textContent = '';
    input.value = '';
    renderVideos(data);
  }
});
