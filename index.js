/*
* dev: Sazumi Viki
* github: github.com/sazumivicky
* ig: @moe.sazumiviki
* site: www.sazumi.moe
*/

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  const fileInput = document.getElementById('fileInput');
  formData.append('fileInput', fileInput.files[0]);

  const uploadButton = document.getElementById('uploadButton');
  const uploadIcon = uploadButton.querySelector('img');

  uploadButton.disabled = true;
  uploadIcon.classList.add('hidden');
  uploadButton.innerHTML = '<img src="./src/icon/spin.svg" alt="Spin Icon" class="w-4 h-4 mr-2 spin">';

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '';

      const beforeImage = document.getElementById('beforeImage');
      const afterImage = document.getElementById('afterImage');
      const afterImageLoading = document.getElementById('afterImageLoading');

      if (beforeImage && afterImage) {
        beforeImage.src = URL.createObjectURL(fileInput.files[0]);
        beforeImage.onload = () => URL.revokeObjectURL(beforeImage.src);

        afterImageLoading.style.display = 'block';

        afterImage.src = result.url;
        afterImage.onload = () => {
          URL.revokeObjectURL(afterImage.src);
          afterImageLoading.style.display = 'none';
        };

        beforeImage.classList.remove('default-image');
        afterImage.classList.remove('default-image');

        beforeImage.classList.add('preview-image');
        afterImage.classList.add('preview-image');
      }

      const containerResult = document.getElementById('container-result');
      const downloadButton = document.createElement('button');
      downloadButton.className = 'download-button w-full py-2 px-4 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-center inline-block mt-4 flex items-center justify-center';
      downloadButton.innerHTML = '<img src="./src/icon/download.svg" alt="Download Icon" class="w-4 h-4 mr-2"> Download';

      downloadButton.addEventListener('click', async () => {
        const fileId = result.fileId;
        const downloadUrl = `/download/${fileId}`;
        window.location.href = downloadUrl;
      });

      containerResult.appendChild(downloadButton);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Upps something went wrong');
  } finally {
    uploadButton.disabled = false;
    uploadIcon.classList.remove('hidden');
    uploadButton.innerHTML = '<img src="./src/icon/upload.svg" alt="Upload Icon" class="w-4 h-4 mr-2"> Upload';
  }
});

document.getElementById('fileInput').addEventListener('change', function() {
  const fileInput = document.getElementById('fileInput');
  const label = document.querySelector('label[for="fileInput"]');
  const fileName = fileInput.files[0].name;

  const maxLength = 20;
  const displayName = fileName.length > maxLength ? fileName.substring(0, maxLength) + '...' : fileName;

  label.innerHTML = `${displayName}`;

  const beforeImage = document.getElementById('beforeImage');
  beforeImage.src = URL.createObjectURL(fileInput.files[0]);
  beforeImage.onload = () => URL.revokeObjectURL(beforeImage.src);
  beforeImage.classList.remove('default-image');
  beforeImage.classList.add('preview-image');
});
function updateTime() {
  const timeElement = document.getElementById('time');
  const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  timeElement.textContent = `Time (Asia/Jakarta): ${now}`;
}
setInterval(updateTime, 1000);

updateTime();
